/*
import { User, UsersModel } from '../../../model/user';
import { Product, ProductModel } from '../../../model/product';
import {Order, OrderModel } from '../../../model/order';
import db from '../../../database';

const userModel = new UsersModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

describe('Order Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(orderModel.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(orderModel.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(orderModel.create).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
    const user = {
      email: 'test@test.com',
      first_name: 'Test',
      last_name: 'User',
      password: 'test123'
    } as User;

    const product = {
      name: 'product name',
      price: 20,
      
    } as Product;

    const order = {
      status: 'active',
      user_id:'1'
    } as Order;

    beforeAll(async () => {
      // setup user/product to test with
      await userModel.create(user);
      await productModel.create(product);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should add an order', async () => {
      const createdOrder = await orderModel.create(order);
      expect(createdOrder.id).toEqual(1);
    });

    it('Index method should return a list of orders', async () => {
      const orders = await orderModel.index();
      expect(orders[0].id).toBe(1);
    });

    it('Show method should return the correct order', async () => {
      const returnedOrder = await orderModel.show('1');
      expect(returnedOrder.id).toEqual(1);
    });
});
});
*/


import {Order, OrderModel } from '../../../model/order';
//import { OrderProduct } from '../../../model/order';
import db from '../../../database';

const orderModel = new OrderModel();


describe('order model', () => {
  describe('Test Methods Exists', () => {
    it('should have a create method', () => {
      expect(orderModel.create).toBeDefined();
    });
    it('should have a index method', () => {
      expect(orderModel.index).toBeDefined();
    });
    it('should have a show method', () => {
      expect(orderModel.show).toBeDefined();
    });
  });
  describe('order-products model', () => {
    it('should has a add product method', () => {
      expect(orderModel.addProduct).toBeDefined();
    });
  });
  describe('Test Order Model logic', () => {
      const order = {
        id: 1,
        status: 'pending',
        user_id: '1'
    }as Order
    afterAll(async () => {
        const connection = await db.connect();
        const sql = 'DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
      });
      /*
      it('create method should create new order', async()=>{
        const create = await orderModel.create(order)
        expect(create).toEqual({
            id: order.id,
            status:order.status,
            user_id:order.user_id

        })
      });
      */
    it('index should return an array', async () => {
        const getMany = await orderModel.index();
        expect(getMany).toEqual([]);
      });
      /*
      it('show should return order', async () => {
        const getOne = await orderModel.show(1);
        expect(getOne.id).toEqual(order.id);
      });
      */
  });
  /*
  describe('Test Order-products Model logic', () => {
    
      const orderProducts = {
        id:1,
        quantity:1,
        order_id: '1',
        product_id: '1'
      }as OrderProduct
      afterAll(async () => {
        const connection = await db.connect();
        const sql = 'DELETE FROM order_products; \nALTER SEQUENCE order_products_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
      });
      
      it('should add products to the order', async()=>{
        const addProduct = await orderModel.addProduct(1, 2, '1', '1')
        expect(addProduct).toEqual(1, 2, '1', '1',);
      });
     
  });
  */
});