import db from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
/*const hashPassword = (password:string) => {
  const salt = process.env.SALT_ROUNDS as unknown as number
  return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt)
}
*/

const salt = parseInt(process.env.SALT_ROUNDS as string);
const pepper = process.env.BCRYPT_PASSWORD;

export class UsersModel {
  //create new user
  //object of type user
  async create(u: User): Promise<User> {
    try {
      //open new connection
      const connection = await db.connect();
      //write sql command (don't return the pass)
      const sql = `INSERT INTO users(email, first_name, last_name, password) VALUES ($1, $2, $3, $4 ) RETURNING id, email, first_name, last_name`;
      /* const hash = bcrypt.hashSync(
        u.password+ process.env.BCRYPT_PASSWORD,
       parseInt( process.env.SALT_ROUNDS as unknown as string)
      )
      */

      const hash = bcrypt.hashSync(u.password + pepper, salt);
      //run the query on db sql query and arrays of the values
      const result = await connection.query(sql, [u.email, u.first_name, u.last_name, hash]);
      //close conn
      connection.release;
      //return result
      /*const user = result.rows[0]
        return resut */
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`can not create user ${err}`);
    }
  }
  //getall users (get all) index (array of users)
  async index(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM users`;
      const result = await connection.query(sql);
      connection.release;
      return result.rows;
    } catch (err) {
      throw new Error(`no users founds ${err}`);
    }
  }
  //get one user
  //param(id) {(string | number)}
  async show(id?: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM users WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`no user with this user ${id}. Error: ${error}`);
    }
  }
  //checking the password entered by the user
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = `SELECT password FROM users WHERE email=($1)`;
      const result = await connection.query(sql, [email]);
      //user's password is right
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          const userInfo = await connection.query(
            `SELECT id,email,first_name,last_name FROM users WHERE email=($1)`,
            [email]
          );
          return userInfo.rows[0];
          //return result.rows[0]
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  //DELETE User
  /*async delete(id:number): Promise<User>{
      try {
          const connection = await db.connect();
          const sql = `DELETE FROM users WHERE id=($1)`;
          const result = await connection.query(sql, [id]);
          connection.release;
          return result.rows[0];
      } catch (error) {
          throw new Error(`can not delete user with ${id}. Error: ${error}`)
      }
  }
  */
}
//export default usersModel;
