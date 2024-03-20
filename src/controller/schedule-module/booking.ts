import { Route, SuccessResponse,Post, Body, Get, Path } from "tsoa";
import BookingService from "../../services/booking-services";
import { BookingDto } from "../../types/booking.type";

const bookingService =  new BookingService();

@Route('booking')
export default class BookingController{

  @Get('/')
  public async getBookingList(){
    return await bookingService.getBookingList();
  }

  @Get('/:id')
  public async getBookById(@Path() queryParams:BookingDto['book_id']){
    return await bookingService.getBookListById(queryParams);
    
  }


  @SuccessResponse('201','Created')
  @Post('/')
  public async newBook(@Body() requestBody:BookingDto){
    return await bookingService.createBooking({...requestBody})
  }
}