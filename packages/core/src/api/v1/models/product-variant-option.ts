import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ProductVariant } from "./product-variant";

@Entity()
export class ProductVariantOption {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    value: string

    @ManyToOne(() => ProductVariant, (variant) => variant.options)
    variant: Relation<ProductVariant>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}