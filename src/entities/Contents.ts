import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class Contents extends BaseEntity {

  @PrimaryColumn() 
  shoppingCartId!: number;

  @PrimaryColumn()
  productid!: number;

  @Column()
  quantity!: number;

}