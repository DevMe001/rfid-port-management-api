import express, { Request, Response } from 'express';
import { PersonalDto } from "../../types/personal-type";
import PersonalDetailsController from "../../controller/user-module/personal-details.controller";
import UtilityService from "../../services/utility-service";

const UserPersonalDetailsRouter  = express.Router();


const controllerPersonalDetails = new PersonalDetailsController();
const utilityService = new UtilityService();

UserPersonalDetailsRouter.post('/user/personal',async(req:Request & {body:Omit<PersonalDto,'personal_id'>},res:Response)=>{
  const requestBody = await controllerPersonalDetails.newPersonalUser({...req.body});

  return await utilityService.performAsyncRequestResponse(res,()=>{
     res.status(200).json(requestBody);
  });

});




export default UserPersonalDetailsRouter;