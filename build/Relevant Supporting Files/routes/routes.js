"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../../handler/user"));
const product_1 = __importDefault(require("../../handler/product"));
const order_1 = __importDefault(require("../../handler/order"));
//import verifyAuthToken from '../middleware/authentication';
const routes = (0, express_1.Router)();
routes.use('/users', user_1.default);
routes.use('/products', product_1.default);
routes.use('/orders', order_1.default);
exports.default = routes;
