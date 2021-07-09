//TODO

import { Injectable } from '@nestjs/common';
import { TableOrder } from '../domain/Table';

@Injectable()
export class TableService {
  create(table: TableOrder) {}
}
