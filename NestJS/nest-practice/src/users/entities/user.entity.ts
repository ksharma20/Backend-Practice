import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  isActive: boolean;
}
