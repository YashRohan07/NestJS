import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Event } from '../events/event.entity'; // Import Event entity

@Entity()
export class Volunteer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToMany(() => Event, event => event.volunteers)
  events: Event[];
}
