//TODO

import { Injectable } from '@nestjs/common';
import { TableOrder } from '../domain/Table';
import { TableRepository } from '../infraestructure/repository/TableRepository';

@Injectable()
export class TableService {
  constructor(private tableRepository: TableRepository) {}
  async create(table: TableOrder) {
    await this.tableRepository.created(table);
  }
  async remove(tableId: string) {
    await this.tableRepository.removed(tableId);
  }
  async list() {
    return await this.tableRepository.list();
  }
  async update(table: TableOrder) {
    return await this.tableRepository.updated(table);
  }
  async updateStateNotBusy(table: TableOrder) {
    table.vacate();
    await this.tableRepository.updatedState(table);
  }
  async updateStateBusy(table: TableOrder) {
    table.occupy();
    await this.tableRepository.updatedState(table);
  }
}
