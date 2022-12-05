import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { Discount } from '../models';
import { DiscountRepository } from '../repositories';
import {
  CustomResponseSchema,
  CustomResponse,
  isNotEmpty,
  isNotNull
} from '../utils';

export class DiscountController {
  constructor(
    @repository(DiscountRepository)
    public discountRepository: DiscountRepository,
  ) { }

  @post('/discounts')
  @response(200, {
    description: 'Discount model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Discount) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {
            title: 'NewDiscount',
            exclude: ['id', 'dateCreated', 'expiryDate'],
          }),
        },
      },
    })
    discount: Omit<Discount, 'id'>,
  ): Promise<CustomResponse<{}>> {

    try {
      let now = new Date();
      let oneYr = new Date();
      let addOneYear = oneYr.setFullYear(now.getFullYear() + 1)
      let d = new Date(addOneYear)
      let oneYrtotString = d.toLocaleDateString()
      discount.expiryDate = oneYrtotString
      await this.discountRepository.create(discount);

      return {
        status: 'success',
        data: discount,
        message: 'Discount data successfully generated.',
      };

    } catch (error) {
      return {
        status: 'fail',
        data: null,
        message: error ? error.message : 'Discount creation failed.',
      };
    }


  }


  @get('/discounts')
  @response(200, {
    description: 'Returns an array of all discounts in the database with their information',
    content: { 'application/json': { schema: CustomResponseSchema } },
  })
  async find(
    @param.filter(Discount) filter?: Filter<Discount>,
  ): Promise<CustomResponse<{}>> {
    try {
      const discounts = await this.discountRepository.find(filter);
      return {
        status: 'success',
        data: discounts,
        message: 'All discounts data fetched successfully.',
      };

    } catch (error) {
      return {
        status: 'fail',
        data: null,
        message: error ? error.message : 'Fetching all discounts data failed.',
      };

    }

  }


  @get('/discounts/{id}')
  @response(200, {
    description: 'Returns all data of a discount (provide discount id).',
    content: { 'application/json': { schema: CustomResponseSchema } },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Discount, { exclude: 'where' }) filter?: FilterExcludingWhere<Discount>
  ): Promise<CustomResponse<{}>> {
    try {
      const discount = await this.discountRepository.findById(id, filter);
      if (!discount) throw new Error('Discount with the given ID not found.');
      return {
        status: 'success',
        data: discount,
        message: 'User data fetched successfully.',
      };
    } catch (error) {
      return {
        status: 'fail',
        data: null,
        message: error ? error.message : 'Fetching discount data failed.',
      };
    }
  }

  @patch('/discounts/{id}')
  @response(204, {
    description: 'Returns updated data of the edited discount.',
    content: { 'application/json': { schema: CustomResponseSchema } },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {
            title: 'Update discount',
            exclude: ['id', 'dateCreated'],
            partial: true
          }),
        },
      },
    })
    discount: Discount,
  ): Promise<CustomResponse<{}>> {


    try {
      
      isNotEmpty(discount.discountName, 'discountName')
      isNotEmpty(discount.discountCode, 'discountCode')
      isNotEmpty(discount.discountValue, 'discountValue')
      // isNotNull(discount.expiryDate, 'expiryDate')
      
      let parse = new Date(discount.expiryDate!)
      discount.expiryDate = parse.toLocaleDateString()

      await this.discountRepository.updateById(id, discount);
      const updatedDiscount = await this.discountRepository.findById(id)

      return {
        status: 'success',
        data: updatedDiscount,
        message: 'Discount updated successfully',
      };

    } catch (error) {
      return {
        status: 'fail',
        data: null,
        message: error ? error.message : 'Updating discount failed.',
      };
    }
  }


  @del('/discounts/{id}')
  @response(204, {
    description:
      'Returns deleted discount id',
    content: { 'application/json': { schema: CustomResponseSchema } },
  })
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse<{}>> {
    try {

      await this.discountRepository.deleteById(id);

      return {
        status: 'success',
        data: id,
        message: 'Discount deleted successfully.',
      };
    } catch (error) {
      return {
        status: 'fail',
        data: null,
        message: error ? error.message : 'Deleting discount failed.',
      };
    }
  }
}
