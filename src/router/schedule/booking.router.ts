import express, { Request ,Response} from 'express';
import UtilityService from '../../services/utility-service';
import { BookingDto } from '../../types/booking.type';
import BookingController from '../../controller/schedule-module/booking';

const BookingRouter = express.Router();

const bookController =  new BookingController();
const utilityService =  new UtilityService();

BookingRouter.get('/booking',async(_req:Request,res:Response)=>{
   const requestValue = await bookController.getBookingList();

		return await utilityService.performAsyncRequestResponse(res, () => {
			res.status(200).json(requestValue);
		});
})


BookingRouter.get('/booking/:id', async (_req: Request, res: Response) => {
  const id = _req.params.id;
	const requestValue = await bookController.getBookById(id);

	return await utilityService.performAsyncRequestResponse(res, () => {
		res.status(200).json(requestValue);
	});
});




BookingRouter.post('/booking',async (req:Request & {body:Omit<BookingDto,'book_id'|'createdAt'>},res:Response) => {
      const requestValue = await bookController.newBook({...req.body})

      return await utilityService.performAsyncRequestResponse(res, () => {
        res.status(200).json(requestValue);
      })
})



export default BookingRouter