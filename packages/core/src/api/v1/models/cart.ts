import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { LineItem } from "./line-item";
import { Address } from "./address";
import { Payment } from "./payment";
import { Order } from "./order";
import { Shipment } from "./shipment";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    sessionId: string

    @OneToMany(() => LineItem, (lineItems) => lineItems.cart, { cascade: true })
    lineItems: Relation<LineItem[]>

    @OneToOne(() => Payment, (payment) => payment.cart, { cascade: true })
    @JoinColumn()
    payment: Relation<Payment>

    @OneToOne(() => Order, (order) => order.cart, { cascade: true })
    @JoinColumn()
    order: Relation<Order>

    @OneToOne(() => Shipment, (shipment) => shipment.cart, { cascade: true })
    @JoinColumn()
    shipment: Relation<Shipment>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date

}