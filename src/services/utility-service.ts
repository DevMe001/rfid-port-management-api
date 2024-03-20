import { Response } from 'express';

export default class UtilityService {
	public async performAsyncOperation(operation: Function) {
		try {
			return await operation(); // Await and return the result of the operation
		} catch (error) {
			console.error('Error occurred:', error);
			return { message: 'An error occurred', data: [] };
		}
	}

	public async performAsyncRequestResponse(res: Response, cb: Function) {
		try {
			return await cb(); // Await and return the result of the callback
		} catch (error) {
			console.error('Error handling file upload:', error);
			return res.status(500).json({ error: 'Internal Server Error' });
		}
	}
}
