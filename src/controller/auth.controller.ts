import { Body, Post, Route, SuccessResponse } from "tsoa";
import { AccountCreate } from "../types/user-type";
import { AccountServices } from "../services/account-services";


const accountService = new AccountServices();

@Route('auth')
export default class AuthController{
   @SuccessResponse("201", "Created") 
  @Post('/')
  public async newAccountProfile( @Body() requestBody: AccountCreate){
    return accountService.createAccountProfile({ ...requestBody });

  }
}