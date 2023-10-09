import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string
}