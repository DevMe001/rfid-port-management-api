
// services

import { Get, Path, Route } from "tsoa";
import { AccountServices } from "../../services/account-services";
import { AccountCreate } from "../../types/user-type";

const accountService = new AccountServices();

// route
@Route('account')
export default class AccountController {
	@Get('/:user_id')
	public async getAccount(@Path() user_id: AccountCreate['user_id']) {
		return accountService.getProfileUser(user_id);
	}
}


