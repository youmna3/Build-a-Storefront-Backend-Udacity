"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const status  = 'active';
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING *`;
                const result = yield connection.query(sql, [o.status, parseInt(o.user_id)]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not create order. Error: ${error}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT * FROM orders`;
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`can not get all the orders. Error:${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT * FROM orders WHERE id=($1)`;
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not get order id:${id}`);
            }
        });
    }
    addProduct(op) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `INSERT INTO order_products(quantity, order_id, product_id) VALUES ($1, $2,$3) RETURNING *`;
                const result = yield connection.query(sql, [op.quantity, op.order_id, op.product_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
}
exports.OrderModel = OrderModel;
/*
  async addProduct(quantity: number, orderId?: string, productId?: string): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [quantity, orderId, productId]);
      connection.release;
      return result.rows[0];
    } catch (error) {
      throw new Error('error');
    }
  }
}
*/
