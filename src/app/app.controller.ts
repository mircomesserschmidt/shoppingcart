import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import CreateShoppingCartDto from '../dtos/CreateShoppingCartDto';
import InsertProductDto from '../dtos/InsertProductDto';
import { AppService } from './app.service';

@Controller('cart')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put()
  @HttpCode(200)
  async createShoppingCart(@Body() body: CreateShoppingCartDto) {
    try {
      const result = await this.appService.createShoppingCart(body.userId);
      return {
        cartId: result,
      };
    } catch (error) {
      return error;
    }
  }

  @Put(':cartId')
  async insertIntoShoppinCart(
    @Param('cartId') cartId: number,
    @Body() body: InsertProductDto,
    @Res() response: Response,
  ) {
    try {
      await this.appService.insertIntoCart(cartId, body.productId, body.amount);
      const contents = await this.appService.getContentsOfCart(cartId);
      response.status(200).send({
        cart: contents,
      });
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND).send(error);
    }
  }

  @Put(':cartid/product/:productid/amount')
  async changeAmountInShoppingCart(
    @Param('cartId') cartId: number,
    @Param('productid') productId: number,
    @Body() amount: number,
  ) {
    return await this.appService.changeAmountOfProduct(
      cartId,
      productId,
      amount,
    )
  }

  @Delete(':cartid/product/:productid')
  @HttpCode(200)
  async deleteFromShoppinCart(
    @Param('cartid') cartId: number,
    @Param('productid') productId: number,
  ) {
    return await this.appService.removeFromCart(cartId, productId);
  }

  @Get(':cartid/submit')
  async checkoutShoppingCart(@Param('cartid') cartId: number) {
    return await this.appService.getContentsOfCart(cartId);
  }
}
