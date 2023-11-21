import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Address } from "./address";
import { Cart } from "./cart";

@Entity({ name: 'shipments' })
export class Shipment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, nullable: true })
    shipmentId: string

    @Column({ unique: true })
    rateId: string

    @Column()
    provider: string

    @Column({ nullable: true })
    trackingNumber: string

    @Column({ default: 'pending' })
    status: string

    @OneToOne(() => Cart, (cart) => cart.shipment)
    cart: Relation<Cart>

    @OneToMany(() => Address, (addresses) => addresses.shipment, { cascade: true })
    addresses: Relation<Address[]>

}