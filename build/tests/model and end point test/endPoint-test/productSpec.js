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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../../index"));
//import { Product, ProductModel } from "../../../model/product";
//import db from '../../../database';
//const productModel = new ProductModel();
const request = (0, supertest_1.default)(index_1.default);
describe('product endpoints', () => {
    describe('Test CRUD', () => {
        it('create a new product', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/api/products');
            expect(response.status).toBe(200);
        }));
        it('show all products', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/products');
            expect(response.status).toBe(200);
        }));
        it('get one product', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/products/:id');
            expect(response.status).toBe(200);
        }));
    });
});
