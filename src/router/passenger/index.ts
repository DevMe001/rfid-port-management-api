import express, { Request, Response } from "express";
import PassengerController from "../../controller/passengers/passenger";
import UtilityService from "../../services/utility-service";
import { PassengerDto } from "../../types/passengers.type";

const PassengerRouter = express.Router();


const passengerController =  new PassengerController();
const utilityService = new UtilityService();




PassengerRouter.get('/passengers', async (_req: Request, res: Response) => {
	try {
		// Assuming accountController is properly imported and instantiated
		const response = await passengerController.getPassengerwithCarrier();

		// Returning the response
		return res.status(200).json(response);
	} catch (error) {
		// Handling errors
		console.error('Error fetching account:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

PassengerRouter.post('/passenger', async (req: Request & { body: Omit<PassengerDto,'passenger_id'> }, res: Response) => {
	const request = await passengerController.newPassenger({ ...req.body });

	return await utilityService.performAsyncRequestResponse(res,  () => {
		res.status(200).json(request);
	});
});


PassengerRouter.put('/passenger/:id', async (req: Request & { body: Omit<PassengerDto, 'passenger_id'> }, res: Response) => {
	const request = await passengerController.updatePassenger(req.params.id, { ...req.body });

	return await utilityService.performAsyncRequestResponse(res, () => {
		res.status(200).json(request);
	});
});

PassengerRouter.delete('/passenger/:id', async (req: Request, res: Response) => {
	const request = await passengerController.deletePassenger(req.params.id);

	return await utilityService.performAsyncRequestResponse(res, () => {
		res.status(200).json(request);
	});
});



export default PassengerRouter;