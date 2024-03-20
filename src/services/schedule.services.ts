import ScheduleModel from "../database/models/schedule.model";
import VehicleModel from "../database/models/vehicle.model";
import { ScheduleDto } from "../types/schedules.type";
import UtilityService from "./utility-service";


const utilityService =  new UtilityService();

export default class ScheduleServices {
	public async getSchedulesWithVehicles() {
		try {
			const schedulesWithVehicles = await ScheduleModel.findAll({
				include: [
					{
						model: VehicleModel,
						as: 'vehicle',
					},
				],
			});
			return schedulesWithVehicles;
		} catch (error) {
			console.error('Error retrieving schedules with vehicles:', error);
			throw error; // Re-throw the error for the caller to handle
		}
	}

	public async getSchedulesWithVehiclesbyId(schedule_id: ScheduleDto['schedule_id']) {
			return utilityService.performAsyncOperation(async () => {
				const getBookingListById = await ScheduleModel.findOne({
					include: [
						{
							model: VehicleModel,
							as: 'vehicle',
						},
					],
					where: {
						schedule_id: schedule_id,
					},
				});
				return getBookingListById;
			});
	}

	public async newSchedule(sched: ScheduleDto) {
		try {
			// Validate if vehicle name already exists

			console.log(sched, 'get schedule');

			const existingSched = await ScheduleModel.findOne({ where: { vehicle_id: sched.vehicle_id } });

			if (existingSched) {
				return { message: 'Scheduled already reserve', data: [] };
			}

			// Create the vehicle
			const createSchedule = await ScheduleModel.create(sched);

			if (createSchedule) {
				return { message: 'Scheduled has been set', data: createSchedule };
			} else {
				return { message: 'Failed to create scheduled', data: [] };
			}
		} catch (error) {
			console.error('Error creating scheduled:', error);
			return { message: 'An error occurred', data: [] };
		}
	}

	public async modifySchedule(schedule_id: ScheduleDto['schedule_id'], schedule: Partial<ScheduleDto>) {
		return utilityService.performAsyncOperation(async () => {
			let existingPasenger = await ScheduleModel.findOne({
				where: {
					schedule_id: schedule_id,
				},
			});

			if (existingPasenger) {
				const updateResult = await existingPasenger.update(schedule);

				if (updateResult) {
					return { message: 'New book was updated', data: updateResult };
				} else {
					return { message: 'Failed to update passenger', data: [] };
				}
			}
		});
	}

	public async deleteBooking(schedule_id: ScheduleDto['schedule_id']) {
		return utilityService.performAsyncOperation(async () => {
			const deleteResult = await ScheduleModel.destroy({
				where: {
					schedule_id: schedule_id, // Specify the condition to identify the record to delete
				},
			});

			if (deleteResult) {
				return { message: 'Book selected was deleted', data: deleteResult };
			} else {
				return { message: 'Failed to delete passenger', data: [] };
			}
		});
	}
}