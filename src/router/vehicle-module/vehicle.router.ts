import express, { Request, Response } from 'express';
import VehicleController from "../../controller/vehicles-module/vehicle.controller";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { VehiclesDto } from '../../types/vehicle-type';
import UtilityService from '../../services/utility-service';
import { isUndefined } from 'lodash';
// route
const VehicleRouter = express.Router();


const uploadDirectory = path.join(__dirname,'..','..','..', 'uploads', 'temp', 'vehicles');


// controller
const vehicleController =  new VehicleController();

const utilityService =  new UtilityService();

let upload = multer({
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				const uploadPath = path.join('uploads', 'temp', 'vehicles');
				fs.mkdirSync(uploadPath, { recursive: true });
				cb(null, uploadPath);
			},
			filename: (req, file, cb) => {
				cb(null, file.originalname);
			},
		}),
	})
// route
VehicleRouter.get('/vehicles',async(_req:Request,res:Response)=>{
    	try {
			
				// Assuming accountController is properly imported and instantiated
				const response = await vehicleController.getVehicles();

				// Returning the response
				return res.status(200).json(response);
			} catch (error) {
				// Handling errors
				console.error('Error fetching account:', error);
				return res.status(500).json({ error: 'Internal Server Error' });
			}
});

VehicleRouter.get('/vehicles/types', async (_req: Request, res: Response) => {
	try {
		// Assuming accountController is properly imported and instantiated
		const response = await vehicleController.getVehicleCategory();

		// Returning the response
		return res.status(200).json(response);
	} catch (error) {
		// Handling errors
		console.error('Error fetching account:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});


VehicleRouter.get('/vehicle/:vehicle_id', async (_req: Request, res: Response & Partial<VehiclesDto>) => {
	const response = await vehicleController.getVehicle(_req.params.vehicle_id);

	return await utilityService.performAsyncRequestResponse(res, () => {
		res.status(200).json(response);
	});
});

VehicleRouter.get('/vehicle', async (_req: Request &{query:{photo:string}}, res: Response & Partial<VehiclesDto>) => {
   const getVehicleImages = await vehicleController.getVehicle(_req.query.photo);

		const imagePath = path.join(uploadDirectory, getVehicleImages?.vehicle_photo as string);

	if(!isUndefined(imagePath)){
			res.sendFile(imagePath);
	}else{
		return res.status(200).json({message:'Vehicle is null'})
	}
});

VehicleRouter.post('/vehicles', upload.single('vehicle_photo'), async (req: Request, res: Response) => {
	try {

		const files = req.file?.originalname as string;

	
		const reqDetails = await vehicleController.newVehicle({
			vehicle_photo: files,
			vehicle_name: req.body.vehicle_name ?? '',
			vehicle_type: req.body.vehicle_type ?? '',
			vehicle_price: req.body.vehicle_price ?? '',
		});

		return res.status(200).json(reqDetails);
	} catch (error) {
		// Handling errors
		console.error('Error handling file upload:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});



VehicleRouter.post('/vehicles/type', async (_req: Request, res: Response) => {
	try {

		const reqDetails = await vehicleController.newVehicleType();

		return res.status(200).json(reqDetails);
	} catch (error) {
		// Handling errors
		console.error('Error handling file upload:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});



export default VehicleRouter;