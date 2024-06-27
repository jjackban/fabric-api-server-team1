import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'extable' })
export class Extable {
  @PrimaryGeneratedColumn()
  userid: string;

  @Column()
  password: string;
}
