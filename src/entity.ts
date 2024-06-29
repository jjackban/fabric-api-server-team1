import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'extable' })
export class Extable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: string;

  @Column()
  password: string;
}
