import { Body, Delete, Get, Path, Post, Put, Route,SuccessResponse } from "tsoa";
import { UserCreate, Users } from "../../types/user-type";
import { UserService } from "../../services/user-service";

const userService = new UserService();



@Route("users")
export default class UserController {
  @Get("/")
  public async getUser() {
    return userService.getAll();
  }


  @SuccessResponse("201", "Created") 
  @Post('/')
  public async newUser( @Body() requestBody: UserCreate){
    return userService.create({...requestBody});

  }

  @SuccessResponse("202 ", "Accepted ") 
  @Put('/')
  public async updateUser( @Path() userId: string, @Body() requestBody: Omit<UserCreate,'id'>){
    return userService.update(userId,{...requestBody});
  }

  @SuccessResponse("202 ", "Accepted ") 
  @Delete('/')
  public async deleteUser( @Path() userId :string){
    return userService.delete(userId);
  }
}