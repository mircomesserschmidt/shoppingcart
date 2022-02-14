import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from '../entities/Contents';
import { ShoppingCart } from '../entities/ShoppingCart';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartRepo: Repository<ShoppingCart>,

    @InjectRepository(Contents)
    private contentsRepo: Repository<Contents>,
  ) {}

  async createShoppingCart(userId: number): Promise<number> {
    const shoppingcart = new ShoppingCart(userId);
    const result = await this.shoppingCartRepo.find({
      where: { user: userId },
    });

    if (result && result.length > 0) {
      throw { error: `Shoppingcart with user id <${userId}> already exists.` };
    } else {
      await this.shoppingCartRepo.insert(shoppingcart);
      return shoppingcart.id;
    }
  }

  async insertIntoCart(cartId: number, productId: number, amount: number) {
    if (await this.doesCartExists(cartId)) {
      const content = new Contents(cartId, productId, amount);
      return await this.contentsRepo.insert(content);
    } else {
      throw {
        error: `Shopping cart with id  <${cartId}> not found.`,
      };
    }
  }

  async removeFromCart(cartId: number, productId: number) {
    if (
      (await this.doesCartExists(cartId)) &&
      (await this.isProductInCart(cartId, productId))
    ) {
      const res = await this.contentsRepo.findOne({
        where: { shoppingCartId: cartId, productid: productId },
      });
      if (res) {
        this.contentsRepo.remove(res);
        return res;
      } else {
        throw {
          error: `Product with id <${productId}> could not be removed form cart with id <${cartId}>.`,
        };
      }
    } else {
      throw {
        error: `Product with id <${productId}> could not be removed form cart with id <${cartId}>.`,
      };
    }
  }

  async getContentsOfCart(cartId: number) {
    return await this.contentsRepo.find({
      select: ['productid', 'quantity'],
      where: { shoppingCartId: cartId },
    });
  }

  async changeAmountOfProduct(
    cartId: number,
    productId: number,
    amount: number,
  ): Promise<Boolean> {
    const res = await this.contentsRepo.findOne({
      where: {
        shoppingCartId: cartId,
        productid: productId,
      },
    });

    if (res) {
      res.quantity = amount;
      this.contentsRepo.save(res);
      return true;
    } else {
      console.log('Error changing amount of product');
      return false;
    }
  }

  private async doesCartExists(cartId: number): Promise<boolean> {
    const res = await this.shoppingCartRepo.findOne(cartId);
    return res !== null && res !== undefined;
  }

  private async isProductInCart(
    cartId: number,
    productId: number,
  ): Promise<boolean> {
    const res = await this.contentsRepo.findOne({
      where: {
        shoppingCartId: cartId,
        productid: productId,
      },
    });
    return res !== null && res !== undefined;
  }
}
