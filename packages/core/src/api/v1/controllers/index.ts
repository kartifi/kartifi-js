import { ProductsRouter } from "../routes/products";
import { ProductsController } from "../controllers/products";
import { ProductsService } from "../services/products";
import { CustomersService } from "../services/customers";
import { CustomersController } from "./customers";
import { CustomersRouter } from "../routes/customers";
import { UsersRouter } from "../routes/users";
import { UsersService } from "../services/users";
import { UsersController } from "./users";
import { ProductOptionRouter } from "../routes/product-options";
import { ProductOptionService } from "../services/product-options";
import { ProductOptionController } from "./product-options";
import { ImagesService } from "../services/images";
import { ImagesController } from "./images";
import { ImagesRouter } from "../routes/images";
import { VariantsService } from "../services/variants";
import { VariantsController } from "./variants";
import { VariantsRouter } from "../routes/variants";
import { ProductVariantOptionRouter } from "../routes/product-variant-options";
import { ProductVariantOptionService } from "../services/product-variant-options";
import { ProductVariantOptionController } from "./product-variant-options";
import { LineItemService } from "../services/line-items";
import { LineItemsController } from "./line-items";
import { LineItemsRouter } from "../routes/line-items";
import { CartRouter } from "../routes/cart";
import { CartService } from "../services/cart";
import { CartController } from "./cart";
import { AddressesRouter } from "../routes/addresses";
import { AddressesService } from "../services/addresses";
import { AddressesController } from "./addresses";
import { TaxesService } from "../services/tax";
import { TaxesController } from "./tax";
import { TaxesRouter } from "../routes/taxes";
import { OrdersRouter } from "../routes/orders";
import { OrdersService } from "../services/orders";
import { OrdersController } from "./orders";

export default function (appContainer) {
    const productsService = new ProductsService();
    const productsController = new ProductsController(productsService);
    new ProductsRouter(appContainer, productsController);

    const customersService = new CustomersService();
    const customersController = new CustomersController(customersService);
    new CustomersRouter(appContainer, customersController);

    const usersService = new UsersService();
    const usersController = new UsersController(usersService);
    new UsersRouter(appContainer, usersController);

    const productOptionService = new ProductOptionService();
    const productOptionController = new ProductOptionController(productOptionService);
    new ProductOptionRouter(appContainer, productOptionController);

    const imagesService = new ImagesService();
    const imagesController = new ImagesController(imagesService);
    new ImagesRouter(appContainer, imagesController);

    const variantsService = new VariantsService();
    const variantsController = new VariantsController(variantsService);
    new VariantsRouter(appContainer, variantsController);

    const productVariantOptionService = new ProductVariantOptionService();
    const productVariantOptionController = new ProductVariantOptionController(productVariantOptionService);
    new ProductVariantOptionRouter(appContainer, productVariantOptionController);

    const lineItemsService = new LineItemService();
    const lineItemsController = new LineItemsController(lineItemsService);
    new LineItemsRouter(appContainer, lineItemsController);

    const cartService = new CartService();
    const cartController = new CartController(cartService);
    new CartRouter(appContainer, cartController);

    const addressesService = new AddressesService();
    const addressesController = new AddressesController(addressesService);
    new AddressesRouter(appContainer, addressesController);

    const taxesService = new TaxesService();
    const taxesController = new TaxesController(taxesService);
    new TaxesRouter(appContainer, taxesController);

    const ordersService = new OrdersService();
    const ordersController = new OrdersController(ordersService);
    new OrdersRouter(appContainer, ordersController);

}