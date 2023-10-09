import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PizzaVariant } from "./pizza_variant.entity";
import { Ingridient } from "./ingridient.entity";

@Entity()
export class Pizza {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    label: string

    @Column()
    name: string

    @Column({default: ''})
    imgUrl: string

    @OneToMany(() => PizzaVariant, (variant)=>variant.pizza, {eager: true})
    variant: PizzaVariant[]

    @ManyToMany(()=> Ingridient, (ingridient) => ingridient.pizza, {eager: true})
    ingridients: Ingridient[]
}
