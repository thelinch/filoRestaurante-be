import { Order } from 'src/order-handling/domain/Order';
import { TableIRepository } from 'src/order-handling/domain/repository/TableIRepository';
import { TableOrder } from 'src/order-handling/domain/Table';
import { EntityRepository, Not, Repository } from 'typeorm';
import { TableEntity, TableState } from '../entity/TableEntity';
import util from '../util/util';
@EntityRepository(TableEntity)
export class TableRepository
  extends Repository<TableEntity>
  implements TableIRepository
{
  async findById(tableId: string): Promise<TableOrder> {
    const tableOrderEntity = await this.findOne({ id: tableId });
    return util.entityTableToTableDomain(tableOrderEntity);
  }
  async created(table: TableOrder): Promise<void> {
    const tableInstance = util.tableDomainToTableEntity(table);
    await this.save(tableInstance);
  }
  async list(): Promise<TableOrder[]> {
    const tableOrderEntities = await this.find({
      state: Not(TableState.ELIMINADO),
    });
    return tableOrderEntities.map((t) => util.entityTableToTableDomain(t));
  }

  async removed(tableId: string): Promise<void> {
    this.save({ id: tableId, state: TableState.ELIMINADO });
  }
  async updatedState(table: Pick<TableOrder, 'State' | 'Id'>): Promise<void> {
    const tableEntity = await this.findOne({ id: table.Id });
    tableEntity.state = table.State;
    await this.save(tableEntity);
  }

  async updated(table: Omit<TableOrder, 'state'>): Promise<void> {
    await this.save(util.tableDomainToTableEntity(table));
  }
  listOrderOfTable: (tableId: string) => Promise<Order[]>;
}
