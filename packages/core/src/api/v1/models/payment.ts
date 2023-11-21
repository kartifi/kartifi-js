import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart";

@Entity({ name: "payments" })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    processor: string;

    @Column()
    transactionId: string;

    @Column({ default: 'pending' })
    status: string;

    @OneToOne(() => Cart, (cart) => cart.payment)
    cart: Relation<Cart>

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;


}