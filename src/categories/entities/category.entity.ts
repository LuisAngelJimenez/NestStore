import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column()
    description:string;

    @Column(
        {default:true}
    )
    is_active:boolean;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date;

     //en ambos entities, colocamos la relacion, aqui va
    //el decorador de muchos a uno//

    @OneToMany(()=>Product,
    prod=>prod.category)
    products:Product[];
}
