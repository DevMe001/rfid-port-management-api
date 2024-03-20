
import PassengerCarrierModel from "../database/models/passenger-carrier.model";

import { PassengeCarryDto } from "../types/passengers.type";
import UtilityService from "./utility-service";

const utilityService = new UtilityService();

export default class PassengerCarrierServices {
	public async getPassengerCarrier() {
		return await PassengerCarrierModel.findAll();
	}

	public async getPassenger(carrier_id: PassengeCarryDto['carrier_id']) {
		return await PassengerCarrierModel.findOne({ where: { carrier_id: carrier_id } });
	}

	public newPassegerCarrier(passenger: PassengeCarryDto) {
		return utilityService.performAsyncOperation(async () => {
			let existingPasenger = await PassengerCarrierModel.findOne({
				where: {
					owner_name: passenger.owner_name,
					plate_number: passenger.plate_number,
				},
			});

			if (existingPasenger) {
				return { message: 'Passenger carrier already on list', data: [] };
			} else {
				let recent = await PassengerCarrierModel.create(passenger); // Added await here

				if (recent) {
					return { message: 'New passenger carrier created', data: recent };
				} else {
					return { message: 'Failed to create passenger carrier', data: [] };
				}
			}
		});
	}

	public async modifyPassenger(carrier_id: PassengeCarryDto['carrier_id'], passenger: Partial<PassengeCarryDto>) {
		return utilityService.performAsyncOperation(async () => {
			let existingPasenger = await PassengerCarrierModel.findOne({
				where: {
					carrier_id: carrier_id,
				},
			});

			if (existingPasenger) {
				const updateResult = await existingPasenger.update(passenger);

				if (updateResult) {
					return { message: 'New passenger carrier updated', data: updateResult };
				} else {
					return { message: 'Failed to update passenger', data: [] };
				}
			}
		});
	}

	public async deletePassenger(carrier_id: PassengeCarryDto['carrier_id']) {
		return utilityService.performAsyncOperation(async () => {
			const deleteResult = await PassengerCarrierModel.destroy({
				where: {
					carrier_id: carrier_id, // Specify the condition to identify the record to delete
				},
			});

			if (deleteResult) {
				return { message: 'Passenger carrier was deleted', data: deleteResult };
			} else {
				return { message: 'Failed to delete passenger', data: [] };
			}
		});
	}
}


// or condition
 // let existingPasengerOrClause = await PassengerCarrierModel.findOne({
			// 	where: {
			// 		[Op.or]: [{ firstname: passenger.firstname }, { lastname: passenger.lastname }],
			// 	},
			// });