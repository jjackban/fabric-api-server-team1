import { Injectable } from '@nestjs/common';
import { send } from './util/connectFabric';

@Injectable()
export class AppService {
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
    return await send(false, 'invokePoint', args);
  }

  async query(name: string): Promise<any> {
    const args = [name];
    console.log(`Query Args: ${args}`);
    const result = await send(true, 'query', args);
    console.log(`Query Result: ${result}`);
    return result;
  }

  async queryPoint(name: string): Promise<any> {
    const args = [name + '_point'];
    console.log(`Query Point Args: ${args}`);
    const result = await send(true, 'query', args);
    console.log(`Query Point Result: ${result}`);
    return result;
  }

  async queryAll(name: string): Promise<any> {
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
