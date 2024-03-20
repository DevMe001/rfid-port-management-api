
import PassengerCarrierModel from "../database/models/passenger-carrier.model";
import PassengerModels from "../database/models/passenger-details.model";
import VehicleTypeCarrierModel from "../database/models/vehicle-type.model";
import { PassengerDto } from "../types/passengers.type";
import UtilityService from "./utility-service";

const utilityService = new UtilityService();

export default class PassengerServices {
	public  getPassengers() {

	return utilityService.performAsyncOperation(async () => {
		 return await PassengerModels.findAll({
				include: [
					{
						model: PassengerCarrierModel,
						as: 'passenger_carry',
						include: [
							{
								model: VehicleTypeCarrierModel, // Include the association to CarryVehicleModel
								as: 'vehicletype_carry', // Assuming this is the alias used for the association
							},
						],
					},
				],
			});
	});

	
	}

	public getPassenger(passenger_id: PassengerDto['passenger_id']) {

		return utilityService.performAsyncOperation(async () => {
				return await PassengerModels.findOne({
					include: [
						{
							model: PassengerCarrierModel,
							as: 'passenger_carry',
						},
					],
					where: { passenger_id: passenger_id },
				});
		});
		
	}

	public newPassengers(passenger: PassengerDto) {
		return utilityService.performAsyncOperation(async () => {
			let existingPasenger = await PassengerModels.findOne({
				where: {
					firstname: passenger.firstname,
					lastname: passenger.lastname,
				},
			});

			if (existingPasenger) {
				return { message: 'Passenger already on list', data: [] };
			} else {
				let recent = await PassengerModels.create(passenger); // Added await here

				if (recent) {
					return { message: 'New passenger created', data: recent };
				} else {
					return { message: 'Failed to create passenger', data: [] };
				}
			}
		});
	}

	public async modifyPassenger(passenger_id: PassengerDto['passenger_id'], passenger: Partial<PassengerDto>) {
		return utilityService.performAsyncOperation(async () => {
			let existingPasenger = await PassengerModels.findOne({
				where: {
					passenger_id: passenger_id,
				},
			});

			if (existingPasenger) {
				const updateResult = await existingPasenger.update(passenger);

				if (updateResult) {
					return { message: 'New passenger updated', data: updateResult };
				} else {
					return { message: 'Failed to update passenger', data: [] };
				}
			}
		});
	}

	public async deletePassenger(passenger_id: PassengerDto['passenger_id']) {
		return utilityService.performAsyncOperation(async () => {
			const deleteResult = await PassengerModels.destroy({
				where: {
					passenger_id: passenger_id, // Specify the condition to identify the record to delete
				},
			});

			if (deleteResult) {
				return { message: 'Passenger was deleted', data: deleteResult };
			} else {
				return { message: 'Failed to delete passenger', data: [] };
			}
		});
	}
}


// or condition
 // let existingPasengerOrClause = await PassengerModels.findOne({
			// 	where: {
			// 		[Op.or]: [{ firstname: passenger.firstname }, { lastname: passenger.lastname }],
			// 	},
			// });