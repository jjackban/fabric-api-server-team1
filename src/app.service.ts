import { Injectable } from '@nestjs/common';
import { send } from './util/connectFabic';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Extable } from './entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Extable)
    private ExtableRepository: Repository<Extable>,
  ) {}

  findAll(): Promise<Extable[]> {
    return this.ExtableRepository.find();
  }

  async create(data: Partial<Extable>): Promise<Extable> {
    const entity = this.ExtableRepository.create(data);
    return this.ExtableRepository.save(entity);
  }
  async login(userid: string, password: string): Promise<boolean> {
    const user = await this.ExtableRepository.findOne({ where: { userid, password } });
    return !!user; // 유저가 존재하면 true, 아니면 false 반환
  }
  getHello() {
    return { message: 'Hello World!' };
  }

  async init(user: string, userVal: string) {
    const args = [user, userVal];
    console.log(`Init Args: ${args}`);
    return await send(false, 'init', args);
  }

  async changeMoney(userinfo: string, amount: string) {
    const args = [userinfo, amount];
    console.log(`ChangeMoney Args: ${args}`);
    return await send(false, 'changeMoney', args);
  }

  async invokePoint(sender: string, receiver: string, amount: string) {
    const args = [sender, receiver, amount];
    return await send(false, 'invokePoint', args);
  }

  async invokeCash(sender: string, receiver: string, amount: string) {
    const args = [sender, receiver, amount];
    return await send(false, 'invokeCash', args);
  }

  async query(name: string): Promise<any> {
    const args = [name];
    console.log(`Query Args: ${args}`);
    const result = await send(true, 'query', args);
    console.log(`Query Result: ${result}`);
    return result;
  }
}
