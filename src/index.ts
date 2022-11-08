import express, { Application, Request, Response } from 'express';
//import morgan from 'morgan';
import * as dotenv from 'dotenv';
import routes from './Relevant Supporting Files/routes/routes';

//import db from './database'; //pool

dotenv.config();

const PORT = process.env.PORT || 4000;
// create an instance server
const app: Application = express();

app.use(express.json());

// HTTP request logger middleware
//app.use(morgan('short'));

app.use('/api', routes);

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'welcome'
  });
});

//app.use(errorhandeling);

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

//test the connection
/*db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release(); //close the data base connection that we opened in line 41
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});
*/

//console.log(db);

export default app;
