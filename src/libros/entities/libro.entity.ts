import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Libro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    number_pages:number;

    @Column()
    genre:string;
}
