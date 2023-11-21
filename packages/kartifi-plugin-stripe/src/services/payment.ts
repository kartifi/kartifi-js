import { BaseService, Cart, Payment, PriceCalculator, Order, TaxesService, Shipment } from "@kartifi/core";
import { ShippoService } from "@kartifi/plugin-shippo";
import { Stripe } from "stripe";
import { Request } from "express";

export class StripeService extends BaseService {
    private stripe: Stripe;
    private cartRepo;
    private orderRepo;
    private paymentRepo;
    private shippoService: ShippoService;
    private taxesService: TaxesService;

    constructor() {
        super();
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2023-10-16',
        });
        this.cartRepo = this.db.getRepository(Cart);
        this.orderRepo = this.db.getRepository(Order);
        this.paymentRepo = this.db.getRepository(Payment);
        this.shippoService = new ShippoService();
        this.taxesService = new TaxesService();
    }

    public async createOrder(req: Request) {
        let paymentIntent = await this.stripe.paymentIntents.retrieve(req.body.intent);

        this.updatePayment(req.body.secret, paymentIntent);
        if (paymentIntent.status === 'succeeded') {

            let cart = await this.cartRepo.findOne({
                where: {
                    sessionId: req.sessionID
                }
            });
            let order = await this.orderRepo.save({
                intent: paymentIntent.id,
                cart,
                customer: req.session.customer
            });

            let tmpSession = req.session;
            req.session.regenerate((err) => {
                Object.assign(req.session, tmpSession);
            });
            return order;
        }
    }

    private async updatePayment(secret: string, intent) {
        let payment = await this.paymentRepo.findOne({
            where: {
                transactionId: secret
            }
        });
        if (payment) {
            payment.status = intent.status;
            await this.paymentRepo.save(payment);
        }
    }

    public async createClientSecret(req) {
        let cart = await this.cartRepo.findOne({
            where: {
                sessionId: req.sessionID
            },
            relations: {
                payment: true,
                lineItems: {
                    variant: true

                }
            }
        });

        let amount = PriceCalculator.calculateLineItemsTotal(cart.lineItems);
        let shippingInfo = await this.shippoService.getRate(req.body.shippingId);
        let taxInfo = await this.taxesService.calculate(req.body.shippingAddress);

        let rate = taxInfo.length > 0 ? taxInfo[0].rate : 0;
        let tax = amount * rate;
        amount = Math.ceil(amount + tax + parseFloat(shippingInfo.amount));

        // Get currency from Settings or Frontend
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true
            }


        });

        await this.setCartPaymentAndAddress(paymentIntent.client_secret!, cart, req, amount)

        return paymentIntent.client_secret;
    }

    private async setCartPaymentAndAddress(clientSecret: string, cart, req, amount) {
        if (!cart.payment) {
            cart.payment = new Payment();
        }

        if (!cart.shipment) {
            cart.shipment = new Shipment();
        }


        cart.shipment.addresses = [req.body.shippingAddress, req.body.billingAddress]
        cart.shipment.provider = 'shippo';
        cart.shipment.rateId = req.body.shippingId;

        cart.payment.amount = amount
        cart.payment.transactionId = clientSecret;
        cart.payment.processor = 'stripe';

        await this.cartRepo.save(cart);
    }
}