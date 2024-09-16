import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { EventManager } from '../event-manager/event-manager.entity'; // Import EventManager entity
import { Sponsor } from '../sponsors/sponsor.entity'; // Import Sponsor entity
import { Volunteer } from '../volunteers/volunteer.entity'; // Import Volunteer entity

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => EventManager, eventManager => eventManager.events)
  eventManager: EventManager;

  @ManyToMany(() => Sponsor, sponsor => sponsor.events)
  @JoinTable()
  sponsors: Sponsor[];

  @ManyToMany(() => Volunteer, volunteer => volunteer.events)
  @JoinTable()
  volunteers: Volunteer[];
}
