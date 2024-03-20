import express, { Request, Response } from "express";
import AccountController from "../../controller/user-module/profile.controller";

// router
const AccountRouter = express.Router();

// controller
const accountController = new AccountController();
// route http verb


AccountRouter.get('/account/:id', async (_req: Request, res: Response) => {
	try {
		const id = _req.params.id;

		// Assuming accountController is properly imported and instantiated
		const response = await accountController.getAccount(id);

		// Returning the response
		return res.status(200).json(response);
	} catch (error) {
		// Handling errors
		console.error('Error fetching account:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});


export default AccountRouter;