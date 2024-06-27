import { Controller, Get, Query, Render, Post, Body, Redirect, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Extable } from './entity';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('home')
  root() {
    return ;
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
  @Get('join')
  @Render('join') // 'join' 템플릿 파일을 렌더링
  getJoinPage() {
    return {};
  }

  @Get('log')
  @Render('login') // 'login' 템플릿 파일을 렌더링
  getLoginPage() {
    return {};
  }


  @Post('/signup')
  create(@Body() data: Partial<Extable>): Promise<Extable> {
    return this.appService.create(data);
  }
  @Post('/login')
  async login(@Body() data: Partial<Extable>, @Res() res: Response): Promise<void> {
    try {
      const result = await this.appService.login(data.userid, data.password);
      if (result) {
        res.status(HttpStatus.OK).send({ message: 'Login successful' })
        res.redirect('/');
      } else {
        res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Login failed' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Failed to login' });
    }
  }
}
