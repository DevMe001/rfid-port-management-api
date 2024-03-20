import { Body, Post, Route, SuccessResponse } from "tsoa";
import WalletService from "../../services/wallet-services";
import { WalletDto } from "../../types/wallet-type";

  
const walletService = new WalletService();

@Route('wallet')
export default class WalletController {


	@SuccessResponse('201', 'Created')
	@Post('/')
	public async newWallet(@Body() requestBody: WalletDto) {
		return await walletService.createWallet({ ...requestBody });
	}
}