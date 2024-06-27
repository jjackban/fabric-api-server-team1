import { Controller, Get, Query, Render, Post, Body, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { Extable } from './entity';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('home')
  root() {
    return this.appService.getHello();
  }

  @Get('/init')
  async init(
    @Query('user') user: string,
    @Query('userVal') userVal: string,
  ): Promise<string> {
    return this.appService.init(user, userVal);
  }

  @Get('/chargeMoney')
  async chargeMoney(
    @Query('userinfo') userinfo: string,
    @Query('amount') amount: string,
  ): Promise<string> {
    return this.appService.changeMoney(userinfo, amount);
  }
  
  @Get('/invokePoint')
  async invokePoint(
    @Query('sender') sender: string,
    @Query('receiver') receiver: string,
    @Query('amount') amount: string,
  ): Promise<any> {
    return this.appService.invokePoint(sender, receiver, amount);
  }

  @Get('/invokeCash')
  async invokeCash(
    @Query('sender') sender: string,
    @Query('receiver') receiver: string,
    @Query('amount') amount: string,
  ): Promise<any> {
    return this.appService.invokeCash(sender, receiver, amount);
  }

  @Get('/query')
  async query(
    @Query('name') name: string,
  ): Promise<any> {
    return this.appService.query(name);
  }
  @Get()
  getAll(): Promise<Extable[]> {
    return this.appService.findAll();
  }
  // @Get()
  // getAll(): Promise<Extable[]> {
  //   return this.appService.findAll();
  // }


  @Post('/signup')
  create(@Body() data: Partial<Extable>): Promise<Extable> {
    return this.appService.create(data);
  }
  @Post('/login')
  async login(@Body() userData: Partial<Extable>): Promise<void> {
    const result = await this.appService.login(userData.userid, userData.password);
    if (result) {
      // 로그인 성공 시, '/' 경로로 리다이렉트
      Redirect('/home');
    } else {
      throw new Error('Login failed');
    }
  }
}
