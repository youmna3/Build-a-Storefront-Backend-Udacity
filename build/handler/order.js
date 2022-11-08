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
const order_1 = require("../model/order");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretToken = process.env.TOKEN_SECRET;
const orderRoutes = (0, express_1.Router)();
const orderModel = new order_1.OrderModel();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = String(req.headers.authorization);
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretToken);
        const order = yield orderModel.create(req.body);
        res.json({
            data: Object.assign({}, order)
        });
    }
    catch (error) {
        res.json(error);
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = String(req.headers.authorization);
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretToken);
        const order = yield orderModel.index();
        res.json({
            data: order
        });
    }
    catch (error) {
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = String(req.headers.authorization);
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretToken);
        const order = yield orderModel.show(req.params.id);
        res.json({
            data: { order }
        });
    }
    catch (error) {
        res.json(error);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*const quantity: number = _req.body.quantity
    const order_id = _req.params.id  as string
    const product_id = _req.body
    */
    try {
        const authorizationHeader = String(req.headers.authorization);
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretToken);
        const addedProduct = yield orderModel.addProduct(req.body);
        res.json({
            data: Object.assign({}, addedProduct)
        });
    }
    catch (error) {
        res.json(error);
    }
});
/*const addProduct = async (req: Request, res: Response) => {
  const quantity: number = parseInt(req.body.quantity);
  const order_id: string = req.params.id;
  const product_id: string = req.body;

  try {
    const addedProduct = await orderModel.addProduct(quantity, order_id, product_id);
    res.json(addedProduct);
  } catch (error) {
    res.json(error);
  }
};
*/
orderRoutes.post('/', create);
orderRoutes.get('/', index);
orderRoutes.get('/:id', show);
orderRoutes.post('/:id/products', addProduct);
exports.default = orderRoutes;
/*const orderProducts = async(req:Request, res:Response) =>{
  const orderId: string = (req.params.id)
    const productId:string = req.body.productId
    const quantity:number = parseInt(req.body.quantity)
try {
    const addedProduct = await orderModel.orderProducts(quantity, productId, orderId)
    res.json({
      data:{... addedProduct}
    })
  } catch (error) {
    res.json(error)
  }
}
*/
