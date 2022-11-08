import { Product, ProductModel } from '../../../model/product';
import db from '../../../database';

const productModel = new ProductModel();

describe('product model', () => {
  describe('Test Methods Exists', () => {
    it('should have a create method', () => {
      expect(productModel.create).toBeDefined();
    });
    it('should have a index method', () => {
      expect(productModel.index).toBeDefined();
    });
    it('should have a show method', () => {
      expect(productModel.show).toBeDefined();
    });
  });
  describe('test the product model', () => {
    const product = {
      id: 1,
      name: 'product',
      price: 500
    } as Product;

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });
    it('create should return a new product', async () => {
      const create = await productModel.create(product);
      expect(create).toEqual({
        id: product.id,
        name: product.name,
        price: product.price
      });
    });

    it('index should return an array', async () => {
      const getMany = await productModel.index();
      expect(getMany.length > 0).toBeTruthy;
    });
    it('show should a product', async () => {
      const getOne = await productModel.show('1');
      expect(getOne.id).toEqual(product.id);
    });
  });
});
