import { Injectable } from '@nestjs/common';
import { send } from './util/connectFabric';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Extable } from './entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Extable)
    private ExtableRepository: Repository<Extable>,
  ) { }

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

  
  async init(user: string, userVal: string, userPoint: string) {
      const args = [user, userVal, userPoint];
      console.log(`Init Args: ${args}`);
      return await send(false, 'init', args);
    }

  async invoke(sender: string, receiver: string, amount: string) {
        const args = [sender, receiver, amount];
        console.log(`Invoke Args: ${args}`);
        return await send(false, 'invoke', args);
      }

  async invokePoint(sender: string, receiver: string, amount: string) {
        const args = [sender, receiver, amount];
        console.log(`invokePoint Args: ${args}`);
        console.log(`invokePoint Args: ${args}`);
        return await send(false, 'invokePoint', args);
      }

  async query(name: string): Promise < any > {
        const args = [name];
        console.log(`Query Args: ${args}`);
        const result = await send(true, 'query', args);
        console.log(`Query Result: ${result}`);
        return result;
      }

  async queryPoint(name: string): Promise < any > {
        const args = [name + '_point'];
        console.log(`Query Point Args: ${args}`);
        const result = await send(true, 'query', args);
        console.log(`Query Point Result: ${result}`);
        return result;
      }

  async queryAll(name: string): Promise < any > {
        const args = [name];
        console.log(`Query All Args: ${args}`);
        const result = await send(true, 'queryAll', args);
        console.log(`Query All Result: ${result}`);
        const parsedResult = JSON.parse(result);
        return {
          이름: parsedResult.name,
          캐시: parsedResult.amount,
          포인트: parsedResult.points
        };
      }

  async purchaseBook(userID: string, bookID: string) {
        const args = [userID, bookID];
        console.log(`purchaseBook Args: ${args}`);
        return await send(false, 'purchaseBook', args);
      }

  async chargeMoney(userID: string, amount: string) {
        const args = [userID, amount];
        console.log(`chargeMoney Args: ${args}`);
        return await send(false, 'chargeMoney', args);
      }
    }

