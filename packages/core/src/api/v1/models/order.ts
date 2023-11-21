import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Relation, ManyToOne } from "typeorm";
import { Cart } from "./cart";
import { Customer } from "./customer";

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    intent: string;

    @Column({ default: 'pending' })
    status: string;

    @Column({ default: 'pending' })
    fullfillmentStatus: string;

    @OneToOne(() => Cart, (cart) => cart.order)
    cart: Relation<Cart>

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Relation<Customer>

}