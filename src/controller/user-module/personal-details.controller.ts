import { Body, Post, Route, SuccessResponse } from "tsoa";
import PersonalDetailService from "../../services/personal-details-services";
import { PersonalDto } from "../../types/personal-type";

const personalDetailService = new PersonalDetailService;


@Route('personal')
export default class PersonalDetailsController{
  @SuccessResponse('201','Created')
  @Post('/')
  public async newPersonalUser(@Body() body:PersonalDto){
    return await personalDetailService.createUserInformation({...body})
  }
}