import { isEmpty } from "lodash";
import VehicleModel from "../database/models/vehicle.model";
import { VehiclesDto } from "../types/vehicle-type";
import UtilityService from "./utility-service";


const utilityService =  new UtilityService();

export default class VehicleServices {
	public async getVehicles() {
		return await VehicleModel.findAll();
	}

	public async getVehicle(vehicle_id: VehiclesDto['vehicle_id']) {
		return await VehicleModel.findOne({ where: { vehicle_id: vehicle_id } });
	}

	public async newVehicle(vehicle: VehiclesDto) {
		try {
			// Validate if vehicle name already exists
			const existingVehicle = await VehicleModel.findOne({ where: { vehicle_name: vehicle.vehicle_name } });

			if (existingVehicle) {
				return { message: 'Vehicle already exists', data: [] };
			}

			// Create the vehicle
			const createdVehicle = await VehicleModel.create(vehicle);

			if (createdVehicle) {
				return { message: 'Vehicle created', data: createdVehicle };
			} else {
				return { message: 'Failed to create vehicle', data: [] };
			}
		} catch (error) {
			console.error('Error creating vehicle:', error);
			return { message: 'An error occurred', data: [] };
		}
	}

	public async modifyVehicle(book_id: VehiclesDto['vehicle_id'], book: Partial<VehiclesDto>) {
		return utilityService.performAsyncOperation(async () => {
			let existingPasenger = await VehicleModel.findOne({
				where: {
					book_id: book_id,
				},
			});

			if (existingPasenger) {
				const updateResult = await existingPasenger.update(book);

				if (updateResult) {
					return { message: 'New vehicle was updated', data: updateResult };
				} else {
					return { message: 'Failed to update passenger', data: [] };
				}
			}
		});
	}

	public async delteVehicle(vehicle_id: VehiclesDto['vehicle_id']) {
		return utilityService.performAsyncOperation(async () => {
			const deleteResult = await VehicleModel.destroy({
				where: {
					vehicle_id: vehicle_id, // Specify the condition to identify the record to delete
				},
			});

			if (deleteResult) {
				return { message: 'Vehicle selected was deleted', data: deleteResult };
			} else {
				return { message: 'Failed to delete passenger', data: [] };
			}
		});
	}
}