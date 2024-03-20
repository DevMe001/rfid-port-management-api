import express, { Request, Response } from "express";
import ScheduleController from "../../controller/schedule-module/sched";

const ScheduleRouter = express.Router();

const scheduleController = new ScheduleController();

ScheduleRouter.get('/schedule',async(_req:Request,res:Response)=>{
  try {
    const schedVehicle = await scheduleController.getSchedulesWithVehicles();

    return res.status(200).json(schedVehicle);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
    
  }
});


ScheduleRouter.get('/schedule/:schedule_id', async (_req: Request, res: Response) => {
	try {
		const schedVehicle = await scheduleController.getSchedulesWithVehicleById(_req.params.schedule_id);

		return res.status(200).json(schedVehicle);
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' });
	}
});




ScheduleRouter.post('/schedule',async(req:Request,res:Response)=>{

  try {

    const schedBody = await scheduleController.newSchedule({
			origin: req.body.origin,
			destination: req.body.destination,
			arrival_date: req.body.arrival_date,
			arrival_time: req.body.arrival_time,
			seatRange: req.body.seatRange,
			vehicle_id: req.body.vehicle_id,
		});

    return res.status(200).json(schedBody);
    
  } catch (error) {
    return res.status(500).json({message:'Internal Server Error'});
  }



});


export default ScheduleRouter;