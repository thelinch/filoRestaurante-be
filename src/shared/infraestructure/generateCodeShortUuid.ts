import * as shortUuid from 'short-uuid';
import GenerateCodeI from './generateCodeI';
abstract class algo{
    nuevo(){
   
    }
}
export class GenerateUuidShortUuid extends algo {
    constructor(){
        super()
    }
  nuevo(): void {
      throw new Error('Method not implemented.');
  }
  generateCode(): string {
    const translator = shortUuid();
    return translator.new();
  }
}
