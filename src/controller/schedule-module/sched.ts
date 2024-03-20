import { Body, Route, Post, SuccessResponse, Get, Path } from 'tsoa';
import { ScheduleDto } from "../../types/schedules.type";
import ScheduleServices from "../../services/schedule.services";

const scheduleService = new ScheduleServices();

@Route('schedule')
export default class ScheduleController {
	@Get('/')
	public async getSchedulesWithVehicles() {
		return await scheduleService.getSchedulesWithVehicles();
	}

	@Get('/:schedule_id')
	public async getSchedulesWithVehicleById(@Path() schedule_id:ScheduleDto['schedule_id']) {
		return await scheduleService.getSchedulesWithVehiclesbyId(schedule_id);
	}

	@SuccessResponse('201', 'Created')
	@Post('/')
	public async newSchedule(@Body() requestBody: ScheduleDto) {
		try {
			return await scheduleService.newSchedule({ ...requestBody });
		} catch (error) {
			// Handling errors
			console.error('Error handling scheduled:', error);
			throw new Error('Internal Server Error');
		}
	}
}