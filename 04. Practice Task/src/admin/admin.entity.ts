import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminEntity { 
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: 'varchar' })
    fullname: string;

    @Column({ type: 'int', unsigned: true })
    age: number;

    @Column({ default: 'active', type: 'varchar' })
    status: string;
}
