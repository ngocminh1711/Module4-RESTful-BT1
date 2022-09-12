import { Column, PrimaryGeneratedColumn, Entity} from "typeorm";


@Entity()
export class BLog {
   @PrimaryGeneratedColumn()
    public readonly id: number;

   @Column()
    content: string;

   @Column()
    title: string;

}