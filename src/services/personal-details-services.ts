import AccountsModel from "../database/models/accounts.model";
import PersonalInformationModel from "../database/models/profile-information.model";
import { PersonalDto } from '../types/personal-type';
import UtilityService from "./utility-service";


const utilityService = new UtilityService();

export default class PersonalDetailService {
	public getPersonalDetails() {
		return utilityService.performAsyncOperation(async () => {
			const getAll = await PersonalInformationModel.findAll({
				include: [
					{
						model: AccountsModel,
						as: 'account',
					},
				],
			});
			return getAll;
		});
	}

	public getPersonalDetail(personal_id: PersonalDto['personal_id']) {
		return utilityService.performAsyncOperation(async () => {
			const getAll = await PersonalInformationModel.findOne({
				include: [
					{
						model: AccountsModel,
						as: 'account',
					},
				],
				where: {
					personal_id: personal_id,
				},
			});
			return getAll;
		});
	}

	public createUserInformation(personal: PersonalDto) {
		return utilityService.performAsyncOperation(async () => {
			const existingInfo = await PersonalInformationModel.findOne({ where: { firstname: personal.firstname, lastname: personal.lastname } });

			if (existingInfo) {
				return { message: 'Personal information existed', data: [] };
			} else {
				const createUserInfo = await PersonalInformationModel.create(personal);

				if (createUserInfo) {
					return { message: 'New personal information was created', data: createUserInfo };
				} else {
					return { message: 'Failed to create personal details', data: [] };
				}
			}
		});
	}

	public async updateUserInformation(personal_id: PersonalDto['personal_id'], personal: Partial<PersonalDto>) {
		return utilityService.performAsyncOperation(async () => {
			let existingPasenger = await PersonalInformationModel.findOne({
				where: {
					personal_id: personal_id,
				},
			});

			if (existingPasenger) {
				const updateResult = await existingPasenger.update(personal);

				if (updateResult) {
					return { message: 'New personal details was created', data: updateResult };
				} else {
					return { message: 'Failed to create personal details', data: [] };
				}
			}
		});
	}

	public async deleteBooking(personal_id: PersonalDto['personal_id']) {
		return utilityService.performAsyncOperation(async () => {
			const deleteResult = await PersonalInformationModel.destroy({
				where: {
					personal_id: personal_id, // Specify the condition to identify the record to delete
				},
			});

			if (deleteResult) {
				return { message: 'Personal details selected was deleted', data: deleteResult };
			} else {
				return { message: 'Failed to delete personal details', data: [] };
			}
		});
	}
}