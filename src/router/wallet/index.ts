import express, { Request, Response } from 'express';
import UtilityService from '../../services/utility-service';
import WalletController from '../../controller/wallet';
import { WalletDto } from '../../types/wallet-type';

const WalletRouter = express.Router();

const walletController = new WalletController();
const utilityService = new UtilityService();

WalletRouter.post('/wallet', async (req: Request & { body: Omit<WalletDto, 'wallet_id'> }, res: Response) => {
	const request = await walletController.newWallet({ ...req.body });

	return await utilityService.performAsyncRequestResponse(res,  () => {
		res.status(200).json(request);
	});
});


export default WalletRouter;