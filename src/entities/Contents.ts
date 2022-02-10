import { Entity, Column, PrimaryColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import { ShoppingCart } from './ShoppingCart';

@Entity()
export class Contents extends BaseEntity {

  constructor(shoppingCartId: number, productId: number, amount: number) {
    super()
    this.shoppingCartId = shoppingCartId
    this.productid = productId
    this.quantity = amount
  }

  @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.id)
  @JoinColumn({ name: "shoppingCartId" })
  @PrimaryColumn()
  shoppingCartId!: number;

  @PrimaryColumn()
  productid!: number;

  @Column()
  quantity!: number;

}


