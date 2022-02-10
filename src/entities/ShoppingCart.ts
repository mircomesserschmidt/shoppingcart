import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class ShoppingCart extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column() 
  shoppingCartId!: number;

  @Column()
  productid!: number;

  @Column()
  quantity!: number;

}