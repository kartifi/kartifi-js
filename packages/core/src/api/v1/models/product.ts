import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { ProductOption } from "./product-option";
import { ProductVariant } from "./product-variant";

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: 'draft' })
    status: string;

    @OneToMany(() => ProductOption, option => option.product, { cascade: true })
    options: Relation<ProductOption[]>;

    @OneToMany(() => ProductVariant, variant => variant.product, { cascade: true })
    variants: Relation<ProductVariant[]>;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}