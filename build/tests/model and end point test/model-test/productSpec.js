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
const product_1 = require("../../../model/product");
const database_1 = __importDefault(require("../../../database"));
const productModel = new product_1.ProductModel();
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
        };
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1;';
            yield connection.query(sql);
            connection.release();
        }));
        it('create should return a new product', () => __awaiter(void 0, void 0, void 0, function* () {
            const create = yield productModel.create(product);
            expect(create).toEqual({
                id: product.id,
                name: product.name,
                price: product.price
            });
        }));
        it('index should return an array', () => __awaiter(void 0, void 0, void 0, function* () {
            const getMany = yield productModel.index();
            expect(getMany.length > 0).toBeTruthy;
        }));
        it('show should a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const getOne = yield productModel.show('1');
            expect(getOne.id).toEqual(product.id);
        }));
    });
});
