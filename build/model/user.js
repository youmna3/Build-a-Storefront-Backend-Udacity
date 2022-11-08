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
exports.UsersModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/*const hashPassword = (password:string) => {
  const salt = process.env.SALT_ROUNDS as unknown as number
  return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt)
}
*/
const salt = parseInt(process.env.SALT_ROUNDS);
const pepper = process.env.BCRYPT_PASSWORD;
class UsersModel {
    //create new user
    //object of type user
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open new connection
                const connection = yield database_1.default.connect();
                //write sql command (don't return the pass)
                const sql = `INSERT INTO users(email, first_name, last_name, password) VALUES ($1, $2, $3, $4 ) RETURNING id, email, first_name, last_name`;
                /* const hash = bcrypt.hashSync(
                  u.password+ process.env.BCRYPT_PASSWORD,
                 parseInt( process.env.SALT_ROUNDS as unknown as string)
                )
                */
                const hash = bcrypt_1.default.hashSync(u.password + pepper, salt);
                //run the query on db sql query and arrays of the values
                const result = yield connection.query(sql, [u.email, u.first_name, u.last_name, hash]);
                //close conn
                connection.release;
                //return result
                /*const user = result.rows[0]
                  return resut */
                return result.rows[0];
            }
            catch (err) {
                console.log(err);
                throw new Error(`can not create user ${err}`);
            }
        });
    }
    //getall users (get all) index (array of users)
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT * FROM users`;
                const result = yield connection.query(sql);
                connection.release;
                return result.rows;
            }
            catch (err) {
                throw new Error(`no users founds ${err}`);
            }
        });
    }
    //get one user
    //param(id) {(string | number)}
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT * FROM users WHERE id=($1)`;
                const result = yield connection.query(sql, [id]);
                connection.release;
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`no user with this user ${id}. Error: ${error}`);
            }
        });
    }
    //checking the password entered by the user
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `SELECT password FROM users WHERE email=($1)`;
                const result = yield connection.query(sql, [email]);
                //user's password is right
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                        const userInfo = yield connection.query(`SELECT id,email,first_name,last_name FROM users WHERE email=($1)`, [email]);
                        return userInfo.rows[0];
                        //return result.rows[0]
                    }
                }
                connection.release();
                return null;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
}
exports.UsersModel = UsersModel;
//export default usersModel;
