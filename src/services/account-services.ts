import { isEmpty } from "lodash";
import AccountsModel from "../database/models/accounts.model";
import { AccountDto } from '../types/user-type';

export class AccountServices {
	public async getProfileUser(id: AccountDto['user_id']) {
		const user = await AccountsModel.findOne({ where: { user_id: id } });
		return user;
	}

	public async createAccountProfile(newAccount: AccountDto) {
		// validate if email existed
		const user = await AccountsModel.findOne({ where: { email: newAccount.email } });

		if (isEmpty(user)) {
			// const createAccount = await AccountsModel.bulkCreate([
			// 	{
			// 		user_id: 'user1',
			// 		displayName: 'John Doe',
			// 		email: 'john@example.com',
			// 		photo: 'https://example.com/john.jpg',
			// 		createdAt: new Date(),
			// 		updatedAt: new Date(),
			// 	},
			// 	{
			// 		user_id: 'user2',
			// 		displayName: 'Jane Doe',
			// 		email: 'jane@example.com',
			// 		photo: 'https://example.com/jane.jpg',
			// 		createdAt: new Date(),
			// 		updatedAt: new Date(),
			// 	},
			// ]);

			const createAccount = await AccountsModel.create(newAccount);
			


			if (createAccount) {
				return { message: 'User created' };
			} else {
				return { message: 'User not created' };
			}
		} else {
			return { message: 'User existed' };
		}
	}
} 