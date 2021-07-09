import { Controller } from '@nestjs/common';
import { TableService } from 'src/order-handling/application/TableService';

@Controller('tables')
export class TableOrderController {
  constructor(private tableService: TableService) {}
}
