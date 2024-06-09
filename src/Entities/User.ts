import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, name: 'first_name' })
  firstName: string;

  @Column({ length: 120, name: 'last_name' })
  lastName: string;

  @Column({ length: 120 })
  company: string;

  @Column({ length: 120, name: 'job_title', nullable: true })
  jobTitle: string;

  @Column({ length: 200, name: 'work_email', unique: true })
  workEmail: string;

  @Column()
  password: string;
}
