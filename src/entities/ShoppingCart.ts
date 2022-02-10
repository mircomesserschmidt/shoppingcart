import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShoppingCart extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true}) 
  user!: string;

}