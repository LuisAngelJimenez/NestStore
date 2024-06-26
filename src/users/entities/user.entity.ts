import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
//importamos el bcrypt, el bcrypt sirve para encriptar contraseñas

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column('text',
        { select: false,}
    )
    password: string;

    @Column(
        { default: true, }
    )
    is_active: boolean;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date;

    @BeforeInsert()
    checkPassword(){
    this.password= bcrypt.hashSync(this.password,10);
    }

    @BeforeInsert()
    checkEmail() {
        this.email=this.email.toLowerCase().trim()
    }

}
