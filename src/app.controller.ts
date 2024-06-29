import { Controller, Get, Query, Render, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Extable } from './entity';
import { Response, Request } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('home')
  root(@Req() req: Request) {
    const userid = req.session.userid;
    return { userid };
  }

  @Get('/init')
  async init(
    @Query('user') user: string,
    @Query('userVal') userVal: string,
    @Query('userPoint') userPoint: string,
  ): Promise<string> {
    return this.appService.init(user, userVal, userPoint);
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

@Get('/chargeMoney')
async chargeMoney(
  @Query('userID') userID: string,
  @Query('amount') amount: string,
): Promise<string> {
  return this.appService.chargeMoney(userID, amount);
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
  async login(@Body() data: Partial<Extable>, @Res() res: Response, @Req() req: Request): Promise<void> {
    try {
      const result = await this.appService.login(data.userid, data.password);
      if (result) {
        req.session.userid = data.userid;
        res.status(HttpStatus.OK).send({ message: 'Login successful' })
        // res.redirect('/');
      } else {
        res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Login failed' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Failed to login' });
    }
  }
}
