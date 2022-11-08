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
const user_1 = require("../../../model/user");
const database_1 = __importDefault(require("../../../database"));
const usersModel = new user_1.UsersModel();
describe('users model', () => {
    describe('Test Methods Exists', () => {
        it('should have a create method', () => {
            expect(usersModel.create).toBeDefined();
        });
        it('should have a index method', () => {
            expect(usersModel.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(usersModel.show).toBeDefined();
        });
        it('should have a authenticate method', () => {
            expect(usersModel.authenticate).toBeDefined();
        });
    });
    describe('test the user model', () => {
        const user = {
            id: 1,
            email: 'test@ymail.com',
            first_name: 'first',
            last_name: 'test'
        };
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
            yield connection.query(sql);
            connection.release();
        }));
        it('Create method should return a User', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield usersModel.create(user);
            expect(createdUser).toEqual({
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            });
        }));
        it('index should return an array', () => __awaiter(void 0, void 0, void 0, function* () {
            const getMany = yield usersModel.index();
            expect(getMany.length).toBe(1);
        }));
        it('show method should return a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const getOne = yield usersModel.show('1');
            expect(getOne.id).toEqual(user.id);
        }));
        it('return authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticate = yield usersModel.authenticate(user.email, user.password);
            expect(authenticate).toEqual(user);
        }));
    });
});
