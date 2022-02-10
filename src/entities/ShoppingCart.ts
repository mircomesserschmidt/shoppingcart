import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShoppingCart extends BaseEntity {

  constructor(userId: number) {
    super()
    this.user = userId
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  user!: number;

}