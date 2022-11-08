/*
//import db from '../../database';
import { Product, ProductModel } from '../../model/product';
import db from '../../database'
const productModel = new ProductModel();

describe('product model', () => {
  it('product model should include create method', () => {
    expect(productModel.create).toBeDefined();
  });
  it('product model should include index method', () => {
    expect(productModel.index).toBeDefined();
  });
  it('product model should include show method', () => {
    expect(productModel.show).toBeDefined();
  });
});

describe('test the logic', () => {
  const product = {
    name: 'productName',
    price: 5000
  } as Product;

  afterAll(async () => {
    const connection = await db.connect();
    const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });


  it('create method should return a product', async () => {
    const createProduct = await productModel.create(product);
    expect(createProduct).toEqual({
      id: 1,
      name: 'productName',
      price: 5000
    });
  });
});
*/