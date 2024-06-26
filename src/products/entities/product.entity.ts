import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

//agregar primero un decorador para que detecte que sera utilizado para la base de datos//
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_name: string;

    @Column(
        {
            type:'float',
            precision: 10,
            scale: 2,
        }
    )
    price: number;

    @Column()
    description: string;

    @Column()
    stock: number;

    @Column({
        default: true
    })
    is_active: boolean;
    
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date;


    //en ambos entities, colocamos la relacion, aqui va
    //el decorador de muchos a uno//
    @ManyToOne(()=>Category,
    cat=>cat.products)
    category: Category
}
