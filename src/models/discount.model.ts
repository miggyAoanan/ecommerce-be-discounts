import {Entity, model, property} from '@loopback/repository';

@model()
export class Discount extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  discountName: string;

  @property({
    type: 'string',
    required: true,
  })
  discountCode: string;

  @property({
    type: 'string',
    required: true,
  })
  discountValue: string;

  @property({
    type: 'string',
   
  })
  expiryDate: string;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  dateCreated: string;


  constructor(data?: Partial<Discount>) {
    super(data);
  }
}

export interface DiscountRelations {
  // describe navigational properties here
}

export type DiscountWithRelations = Discount & DiscountRelations;
