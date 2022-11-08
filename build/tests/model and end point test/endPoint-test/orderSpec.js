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
const request = (0, supertest_1.default)(index_1.default);
describe('orders endpoints', () => {
    describe('Test CRUD', () => {
        it('create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/api/orders');
            expect(response.status).toBe(200);
        }));
        it('show all orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/orders');
            expect(response.status).toBe(200);
        }));
        it('get one order', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/orders/:id');
            expect(response.status).toBe(200);
        }));
        it('create products in each order', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/api/orders/:id/products');
            expect(response.status).toBe(200);
        }));
    });
});
