
import { Op } from "sequelize";
import PassengerCarrierModel from "../database/models/passenger-carrier.model";
import VehicleTypeCarrierModel from "../database/models/vehicle-type.model";

import { VehiclesCarryDto } from "../types/vehicle-type";
import UtilityService from "./utility-service";

const utilityService = new UtilityService();

export default class VehicleCategoriesServices {
	public async getVehicleCategories() {
		return await VehicleTypeCarrierModel.findAll({
			where: {
				vehicletype_id:{
					[Op.ne]:0
				}
			},
		});
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
				let recent = await VehicleTypeCarrierModel.create(type); // Added await here

				if (recent) {
					return { message: 'New vehicle category was added', data: recent };
				} else {
					return { message: 'Failed to create passenger carrier', data: [] };
				}
			}
		});
	}

	public generateVehicleCategories() {
		return utilityService.performAsyncOperation(async () => {
			let recent = await VehicleTypeCarrierModel.bulkCreate([
				{
					vehicletype_name: ' ',
					carrier_fee: '',
				},

				{
					vehicletype_name: 'Bicycle ',
					carrier_fee: 648.0,
				},
				{
					vehicletype_name: 'Motorcycle',
					carrier_fee: 2592.0,
				},
				{
					vehicletype_name: 'Private',
					carrier_fee: 6480.0,
				},
				{
					vehicletype_name: '6W',
					carrier_fee: 11664.0,
				},
				{
					vehicletype_name: '10W ',
					carrier_fee: 15552.0,
				},
				{
					vehicletype_name: '20F',
					carrier_fee: 28512.0,
				},
				{
					vehicletype_name: '40F',
					carrier_fee: 49248.0,
				},
			]);

			if (recent) {
				return { message: 'New vehicle category was added', data: recent };
			} else {
				return { message: 'Failed to create passenger carrier', data: [] };
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