import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { ProductVariant } from "./product-variant";
import { Cart } from "./cart";

@Entity()
export class LineItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @ManyToOne(() => ProductVariant, (variant) => variant.lineItems)
    variant: Relation<ProductVariant>

    @ManyToOne(() => Cart, (cart) => cart.lineItems)
    cart: Relation<Cart>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date

}