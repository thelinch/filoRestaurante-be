import { UnprocessableEntityException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import GenerateCodeI from '../../shared/infraestructure/generateCodeI';
import { GenerateUuidShortUuid } from '../../shared/infraestructure/generateCodeShortUuid';
import { OrderState } from '../infraestructure/entity/OrderEntity';
import { OrderBodyRequestDto } from '../interface/dto/OrderBodyRequestDto';
import { OrderAttendedEvent } from './events/OrderAttended.event';
import { OrderCreatedEvent } from './events/OrderCreated.event';
import { OrderPaymentEvent } from './events/OrderPayment.event';
import { OrderRejectEvent } from './events/OrderReject.event';
import { OrderRemovedEvent } from './events/OrderRemove.event';
import { OrderDetail } from './OrderDetail';
import { Product } from './Product';
import { Status } from './Status';

import { TableOrder } from './Table';
export interface OrderProperties {
  id: string;
  resume: string;
  observation: string;
  code: string;
  total: number;
  table: TableOrder;
  fechaCreacion: undefined | string;
  orderDetails: OrderDetail[];
  state: string;
  user: any;
}
export class Order extends AggregateRoot {
  private id: string;
  private resume: string;
  private observation: string;
  private total: number;
  private table: TableOrder;
  private fechaCreacion: undefined | string;
  private state: string;
  private orderDetails: OrderDetail[];
  private status: Status;
  private type: {
    color: string;
    id: string;
    name: string;
    price: number;
    localAttention: boolean;
  };
  private code: string;
  user: any;

  constructor(
    id: string,
    resume: string,
    observation: string,
    total: number,
    table: TableOrder,
    code: string,
    status: Status,
    type: {
      color: string;
      id: string;
      name: string;
      price: number;
      localAttention: boolean;
    },
    orderDetails: OrderDetail[] = [],
    fechaCreacion = undefined,
  ) {
    super();
    this.status = status;
    this.code = code;
    this.id = id;
    this.resume = resume;
    this.observation = observation;
    this.total = total;
    this.state = status.Name;
    this.orderDetails = orderDetails;
    this.table = table;
    this.type = type;
    this.fechaCreacion = fechaCreacion;
  }

  properties() {
    return {
      id: this.id,
      resume: this.resume,
      observation: this.observation,
      total: this.total,
      table: { id: this.table?.Id, name: this.table?.Name },
      state: this.state,
      orderDetails: this.orderDetails?.map((o) => ({
        id: o.Id,
        product: o.Product.properties(),
        orderedQuantity: o.OrderedQuantity,
        observation: o.Observation,
        status: o.Status.properties(),
      })),
      code: this.code,
      type: this.type,
      user: this.user,
      status: this.status.properties(),
    };
  }

  get Id() {
    return this.id;
  }
  get State() {
    return this.state;
  }
  get Code() {
    return this.code;
  }
  get OrderDetails() {
    return this.orderDetails;
  }
  get Table() {
    return this.table;
  }
  payment() {
    this.state = OrderState.PAGADO;
    this.apply(Object.assign(new OrderPaymentEvent(), this));
  }

  static create(props: OrderBodyRequestDto, status?: Status): Order {
    const orderNew = this.dtoToDomain(props, status);
    return orderNew;
  }
  createdEvent() {
    this.apply(Object.assign(new OrderCreatedEvent(), this));
  }

  reject() {
    if (this.state == OrderState.CREADO) {
      this.state = OrderState.RECHAZADO;
      this.apply(Object.assign(new OrderRejectEvent(), this));
      return;
    }
    throw new UnprocessableEntityException('No se puede eliminar la orden');
  }
  validateProductStock(productsBd: Product[]) {
    let errors = [];
    const productsOrder = this.OrderDetails.reduce(
      (prev, curr, index, array) => {
        if (!prev.find((p) => p.id == curr.Product.Id)) {
          const quantityTotal = array
            .filter((a) => a.Product.Id == curr.Product.Id)
            .reduce(
              (quantity, product) => (quantity += product.OrderedQuantity),
              0,
            );
          prev.push({
            id: curr.Product.Id,
            name: curr.Product.Name,
            quantity: quantityTotal,
          });
        }
        return prev;
      },
      [],
    );
    for (const product of productsBd) {
      const productFind = productsOrder.find((p) => p.id == product.Id);
      if (product.Quantity < productFind.quantity) {
        errors.push(
          `El producto ${product.Name} no tiene suficiente cantidad para satisfacer la orden; solo existe ${product.Quantity} disponible `,
        );
      }
    }
    if (errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }
  }

  attended() {
    this.state = OrderState.ATENDIDO;
    this.apply(Object.assign(new OrderAttendedEvent(), this));
  }
  inProgress() {
    this.state = OrderState.ENREALIZACION;
    //this.apply(Object.assign(new OrderAttendedEvent(), this));
  }
  remove() {
    if (this.state == OrderState.CREADO) {
      this.state = OrderState.ELIMINADO;
      this.apply(Object.assign(new OrderRemovedEvent(), this));
      return;
    }
    throw new UnprocessableEntityException('No se puede eliminar la orden');
  }
  static dtoToDomain(orderDto: OrderBodyRequestDto, status?: Status): Order {
    const generatorCode: GenerateCodeI = new GenerateUuidShortUuid();
    const statusProcess = orderDto.status
      ? new Status({ ...orderDto.status })
      : status;
    const orderDetails: OrderDetail[] = orderDto.orderDetails.map(
      (o) =>
        new OrderDetail({
          id: o.id,
          product: new Product({
            id: o.product.id,
            categories: o.product.categories,
            name: o.product.name,
            price: o.product.price,
          }),
          orderedQuantity: o.orderedQuantity,
          observation: o.observation,
          status,
        }),
    );
    const totalPayment =
      orderDetails.reduce((prev, curr) => {
        prev += curr.Product.Price * curr.OrderedQuantity;
        return prev;
      }, 0) + orderDto.type.price;
    const tableOrder = !orderDto.type.localAttention
      ? null
      : new TableOrder({
          name: orderDto.table.name,
          orders: [],
          id: orderDto.table.id,
        });
    const observation = orderDetails
      .filter((order) => order.Observation)
      .map(
        (orderDetail) =>
          `${orderDetail.Product.Name}(${orderDetail.Observation})`,
      )
      .join(',');
    const order = new Order(
      orderDto.id,
      orderDetails
        .map((od) => `${od.Product.Name}(${od.OrderedQuantity})`)
        .join('*'),
      observation,
      totalPayment,
      tableOrder,
      generatorCode.generateCode(),
      statusProcess,
      orderDto.type,
      orderDetails,
      undefined,
    );
    order.user = orderDto.user;

    return order;
  }
}
