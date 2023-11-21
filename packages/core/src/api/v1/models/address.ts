import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer";
import { StoreSettings } from "./store-settings";
import { Cart } from "./cart";
import { Shipment } from "./shipment";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    streetAddress1: string

    @Column({ default: "" })
    streetAddress2: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    country: string

    @Column()
    zipCode: string

    @Column({ default: "" })
    phoneNumber: string

    @Column({ default: false })
    sticky: boolean

    @Column()
    type: string

    @ManyToOne(() => Customer, (customer) => customer.addresses)
    customer: Relation<Customer>

    @ManyToOne(() => Shipment, (shipment) => shipment.addresses)
    shipment: Relation<Shipment>

    @OneToOne(() => StoreSettings, (store) => store.address)
    store: Relation<StoreSettings>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date
}