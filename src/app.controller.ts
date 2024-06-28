import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return this.appService.getHello();
  }

  @Get('/init')
  async init(
    @Query('user') user: string,
    @Query('userVal') userVal: string,
    @Query('userPoint') userPoint: string,
  ): Promise<string> {
    return this.appService.init(user, userVal, userPoint);
  }

  @Get('/invoke')
async invoke(
  @Query('sender') sender: string,
  @Query('receiver') receiver: string,
  @Query('amount') amount: string,
): Promise<string> {
  return this.appService.invoke(sender, receiver, amount);
}

@Get('/invokePoint')
async invokePoint(
  @Query('sender') sender: string,
  @Query('receiver') receiver: string,
  @Query('amount') amount: string,
): Promise<string> {
  return this.appService.invokePoint(sender, receiver, amount);
}

  @Get('/query')
  async query(
    @Query('name') name: string,
  ): Promise<any> {
    return this.appService.query(name);
  }

  @Get('/queryPoint')
  async queryPoint(@Query('name') name: string): Promise<any> {
    return this.appService.queryPoint(name);
  }

  @Get('/queryAll')
  async queryAll(@Query('name') name: string): Promise<any> {
    return this.appService.queryAll(name);
  }

  @Get('/purchaseBook')
async purchaseBook(
  @Query('userID') userID: string,
  @Query('bookID') bookID: string,
): Promise<string> {
  return this.appService.purchaseBook(userID, bookID);
}

}
