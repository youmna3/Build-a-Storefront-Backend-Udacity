/*import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretToken = process.env.TOKEN_SECRET as string;

const  verifyAuthToken = (req: Request, res:Response, next:NextFunction) =>{
    try{
const authorizationHeader = req.headers.authorization;
const token = authorizationHeader.split(' ')[1];
jwt.verify(token as string, secretToken)
    }catch {
       res.json('error') 
    }
}
export default verifyAuthToken;

*/
/*
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';




const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authheader
    const authheader = req.get('autherization');
    //check authheader validate
    if(authheader) {
        //split the first part of the string
        const bearer = authheader.split('')[0].toLocaleLowerCase();
        const token = authheader.split('')[1];
        if(token && bearer === 'bearer') {
            const decode = jwt.verify(token, process.env.TOKEN_SECRET as unknown as string);
            if (decode) {
                next()
            } else {
                res.json('err')
            }
           
        }else{
            //token not bearer
            res.json('err')
        }
    }else{
        //no token
        res.json('no token provided')
    }
    
  } catch (error) {
    res.json('err')
  }
};
export default verifyAuthToken;

//get value of token
//check if token is bearer
// not token is not bearer
//token is bearer = verify it based on the token secret
//token is ok then next
//token not ok faild to authenticat



/*
import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretToken = process.env.TOKEN_SECRET as string; // The token secret saved in our env variable

function Verify(req: Request, userId?: number) {
  const authHeader = String(req.headers.authorization); // Bearer token ex: bearer eyJhbGciOiJIUz...
  const token = authHeader.split(' ')[1] as unknown as string; // Split the string to get the token after the word bearer
  const decoded = jwt.verify(token as string, secretToken) as JwtPayload; // Return the decoded payload
  if (userId && decoded.user.userId != userId) {
    // If the userId is passed and the decoded userId is not the same as the passed userId
    throw new Error('User id does not match!'); // Throw an error
  }
}

export default Verify;
*/
