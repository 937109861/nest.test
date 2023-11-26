import { cp } from "fs";
import { Coffee } from "src/tks/entities/tks.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flavor{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToMany(
        type => Coffee,
        coffee => coffee.flavors
        )
    coffees:Coffee[];
}
