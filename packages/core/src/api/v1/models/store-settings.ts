import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Address } from "./address";

@Entity()
export class StoreSettings {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    currecy: string

    @OneToOne(() => Address, (address) => address.store, { cascade: true })
    @JoinColumn()
    address: Relation<Address>
}