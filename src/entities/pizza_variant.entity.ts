import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pizza } from "./pizza.entity";

@Entity()
export class PizzaVariant {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    price: number

    @Column()
    size: number
    
    @Column()
    weight: number

    @ManyToOne(() => Pizza, (pizza) => pizza.variant, {onDelete: 'CASCADE'})
    pizza: Pizza
}