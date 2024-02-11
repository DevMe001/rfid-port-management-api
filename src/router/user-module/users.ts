import express, { Request, Response } from 'express';
import UserController from '../../controller/user-module/users-controller';
import * as argon2 from "argon2";

const UserRouter = express.Router();

const controller = new UserController();


UserRouter.get("/users", async (_req: Request, res: Response) => {
  // const response = await controller.getUser();
  const hash = await argon2.hash('Admin@2023');
  const hashVerify = await argon2.verify('$argon2id$v=19$m=65536,t=3,p=4$tvEzR3KMkmuRkxEVDDjy7Q$UHATKC1jqxUoG9r4mDCwFV6ibsgRpTEJ8kGkW4fsaRk','Admin@2023');
  
  const getLength = hash.length;

  return res.send({hash,hashVerify,getLength});
});



UserRouter.post("/user", async (_req: Request, res: Response) => {

  const passwordEncrypted = await argon2.hash(_req.body.password);

  const response = await controller.newUser({
    id: _req.body.id,
    name: _req.body.name,
    email: _req.body.email,
    username: _req.body.username,
    password:passwordEncrypted,
    address:  _req.body.address,
    gender:  _req.body.gender,
    mobileNumber:  _req.body.mobileNumber,
    age: _req.body.age
  });
  return res.json(response).status(200).send();



});


UserRouter.put('/user/:id',async (_req:Request,res:Response) =>{
  
  const id  = _req.params.id;

  const response = await controller.updateUser(id,{
    name: _req.body.name,
    email: _req.body.email,
    username: _req.body.username,
    password: _req.body.password,
    address: _req.body.address,
    gender: _req.body.gender,
    mobileNumber: _req.body.mobileNumber,
    age: _req.body.age
  });

  return res.json(response).status(202).send();


});


UserRouter.delete('/user/:id',async(_req:Request,res:Response) =>{

  const id  = _req.params.id;
    const response = await controller.deleteUser(id);

    return res.json(response).status(202).send();
})


export default UserRouter;