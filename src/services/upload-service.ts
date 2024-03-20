import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

export default class FileUploadService {
	private upload = multer({
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				const uploadPath = path.join(__dirname, 'uploads', 'temp', 'vehicles');
				fs.mkdirSync(uploadPath, { recursive: true });
				cb(null, uploadPath);
			},
			filename: (req, file, cb) => {
				cb(null, file.originalname);
			},
		}),
	}).single('vehicle_photo');

	public async uploadSingleFile(req: any, res: Response): Promise<string> {
		return new Promise((resolve, reject) => {
			this.upload(req, res, async (err: unknown) => {
				let errMsg = err as Error;
				if (errMsg) {
					reject(errMsg);
				} else {
					// Multer has already stored the file, so you can directly access it from req.file
					const uploadedFilePath = path.join('uploads', 'temp', 'vehicles', req.file.filename);
					resolve(uploadedFilePath);
				}
			});
		});
	}

	
}
