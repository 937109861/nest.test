import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "../entity/flavor.entity/flavor.entity";

@Entity()//sql table ==='coffee'
export class Coffee{
    @PrimaryGeneratedColumn()//主键
    id:number;

    @Column()
    name:string;

    @Column()
    brand:string;

    @JoinTable()
    @ManyToMany(
        type => Flavor,
        flavor => flavor.coffees,
        {
            cascade:true,
        }
        )
    flavors:Flavor[];
}
