import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pizza } from "./pizza.entity";


@Entity()
export class Ingridient{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    name: string

    @Column()
    portionPrice: number
    
    @Column()
    portionWeight: number
    
    @Column({default: false})
    isOption: boolean

    @ManyToMany(()=>Pizza, (pizza)=> pizza.ingridients, {cascade: true, onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinTable()
    pizza: Pizza[]
}