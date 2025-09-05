// notebook.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notebook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marca: string;

  @Column({ nullable: true })
  problema: string;
}