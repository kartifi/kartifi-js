import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Relation, ManyToOne, DeleteDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Image } from "./image"
import { Product } from "./product"
import { ProductVariantOption } from "./product-variant-option"
import { LineItem } from "./line-item"

@Entity({ name: "variants" })
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    price: string

    @Column({ default: '0' })
    salePrice: string

    @OneToMany(() => ProductVariantOption, (options) => options.variant, { cascade: true })
    options: Relation<ProductVariantOption[]>

    @OneToOne(() => Image, (image) => image.variant, { cascade: true })
    @JoinColumn()
    image: Relation<Image>

    // @OneToMany(() => LineItem, (lineItems) => lineItems.variant)
    // lineItems: Relation<LineItem[]>

    @ManyToOne(() => Product, (product) => product.variants)
    product: Relation<Product>

    @OneToMany(() => LineItem, (lineItems) => lineItems.variant)
    lineItems: Relation<LineItem[]>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date
}
