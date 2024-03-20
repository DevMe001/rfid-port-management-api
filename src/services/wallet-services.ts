import { Op } from 'sequelize';
import { WalletDto } from '../types/wallet-type';
import EWalletModel from '../database/models/wallet.model';
import UtilityService from './utility-service';
import PersonalInformationModel from '../database/models/profile-information.model';


const utilityService = new UtilityService();



export default class WalletService {
	public getWalletList() {
		return utilityService.performAsyncOperation(async () => {
			const getAll = await EWalletModel.findAll({
				include: [
					{
						model: PersonalInformationModel,
						as: 'personal_information',
					},
				],
			});
			return getAll;
		});
	}

	public getWalletById(book_id: WalletDto['wallet_id']) {
		return utilityService.performAsyncOperation(async () => {
			const getById = await EWalletModel.findOne({
				include: [
					{
						model: PersonalInformationModel,
						as: 'personal_information',
					},
				],
				where: {
					book_id: book_id,
				},
			});
			return getById;
		});
	}

	public createWallet(wallet: WalletDto) {
		return utilityService.performAsyncOperation(async () => {
			let existingWallet = await EWalletModel.findOne({
				where: {
					account_number: wallet.account_number,
					personal_id: wallet.personal_id,
				},
			});

			if (existingWallet) {
				return { message: 'Wallet already on list', data: [] };
			} else {
				let recent = await EWalletModel.create(wallet); // Added await here

				if (recent) {
					return { message: 'New wallet created', data: recent };
				} else {
					return { message: 'Failed to create wallet', data: [] };
				}
			}
		});
	}

	public async modifyWallet(wallet_id: WalletDto['wallet_id'], wallet: Partial<WalletDto>) {
		return utilityService.performAsyncOperation(async () => {
			let existingPasenger = await EWalletModel.findOne({
				where: {
					wallet_id: wallet_id,
				},
			});

			if (existingPasenger) {
				const updateResult = await existingPasenger.update(wallet);

				if (updateResult) {
					return { message: 'New wallet was updated', data: updateResult };
				} else {
					return { message: 'Failed to update wallet', data: [] };
				}
			}
		});
	}

	public async deleteWallet(wallet_id: WalletDto['wallet_id']) {
		return utilityService.performAsyncOperation(async () => {
			const deleteResult = await EWalletModel.destroy({
				where: {
					wallet_id: wallet_id, // Specify the condition to identify the record to delete
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



