import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Relation, OneToOne } from "typeorm"
import { ProductVariant } from "./product-variant"


@Entity({ name: "images" })
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    src: string

    @Column()
    mimeType: string

    @Column({ default: false })
    featured: boolean

    @OneToOne(() => ProductVariant, (variant) => variant.image)
    variant: Relation<ProductVariant>

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date
}
