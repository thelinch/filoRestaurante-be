import { IEvent } from '@nestjs/cqrs';

export class ItemLastStateEvent implements IEvent {
  productName: string;
  tableName: string;
  /* constructor(id: string, resume: string, observation: string) {
    this.id = id;
    this.resume = resume;
    this.observation = observation;
  } */
}
