import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DiscountDataSource} from '../datasources';
import {Discount, DiscountRelations} from '../models';

export class DiscountRepository extends DefaultCrudRepository<
  Discount,
  typeof Discount.prototype.id,
  DiscountRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: DiscountDataSource,
  ) {
    super(Discount, dataSource);
  }
}
