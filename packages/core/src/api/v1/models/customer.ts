import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Address } from "./address";
import { Order } from "./order";

@Entity({ name: "customers" })
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    verified: boolean;

    @Column()
    @Generated("uuid")
    verificationCode: string;

    @Column({ nullable: true })
    resetCode: string;

    @OneToMany(() => Address, (address) => address.customer, { cascade: true })
    addresses: Relation<Address[]>;

    @OneToMany(() => Order, (orders) => orders.customer)
    orders: Relation<Order[]>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}