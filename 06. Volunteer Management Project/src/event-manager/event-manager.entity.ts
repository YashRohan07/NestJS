import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Admin } from '../admin/admin.entity'; // Import Admin entity
import { Event } from '../events/event.entity'; // Import Event entity

@Entity()
export class EventManager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @ManyToOne(() => Admin, admin => admin.eventManagers)
  admin: Admin;

  @OneToMany(() => Event, event => event.eventManager)
  events: Event[];
}
