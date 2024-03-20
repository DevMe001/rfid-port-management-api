
import PassengerCarrierModel from "../database/models/passenger-carrier.model";
import VehicleTypeCarrierModel from "../database/models/vehicle-type.model";

import { VehiclesCarryDto } from "../types/vehicle-type";
import UtilityService from "./utility-service";

const utilityService = new UtilityService();

export default class VehicleCategoriesServices {
	public async getVehicleCategories() {
		return await VehicleTypeCarrierModel.findAll();
	}

	public async getVehicleCategory(vehicletype_id: VehiclesCarryDto['vehicletype_id']) {
		return await VehicleTypeCarrierModel.findOne({ where: { vehicletype_id: vehicletype_id } });
	}

	public newVehicleCategory(type: VehiclesCarryDto) {
		return utilityService.performAsyncOperation(async () => {
			let existingType = await VehicleTypeCarrierModel.findOne({
				where: {
					vehicletype_name: type.vehicletype_name,
				},
			});

			if (existingType) {
				return { message: 'Vehicle category already on list', data: [] };
			} else {
				let recent = await PassengerCarrierModel.create(type); // Added await here

				if (recent) {
					return { message: 'New vehicle category was added', data: recent };
				} else {
					return { message: 'Failed to create passenger carrier', data: [] };
				}
			}
		});
	}

	public async modifyVehicleCategory(vehicletype_id: VehiclesCarryDto['vehicletype_id'], passenger: Partial<VehiclesCarryDto>) {
		return utilityService.performAsyncOperation(async () => {
			let existingType = await VehicleTypeCarrierModel.findOne({
				where: {
					vehicletype_id: vehicletype_id,
				},
			});

			if (existingType) {
				const updateResult = await existingType.update(passenger);

				if (updateResult) {
					return { message: 'New vehicle category  updated', data: updateResult };
				} else {
					return { message: 'Failed to update vehicle category', data: [] };
				}
			}
		});
	}

	public async deleteVehicleCategory(vehicletype_id: VehiclesCarryDto['vehicletype_id']) {
		return utilityService.performAsyncOperation(async () => {
			const deleteResult = await VehicleTypeCarrierModel.destroy({
				where: {
					vehicletype_id: vehicletype_id, // Specify the condition to identify the record to delete
				},
			});

			if (deleteResult) {
				return { message: 'Vehicle category was deleted', data: deleteResult };
			} else {
				return { message: 'Failed to delete vehicle category', data: [] };
			}
		});
	}
}


// or condition
 // let existingTypeOrClause = await VehicleTypeCarrierModel.findOne({
			// 	where: {
			// 		[Op.or]: [{ firstname: passenger.firstname }, { lastname: passenger.lastname }],
			// 	},
			// });