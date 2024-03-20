
import BookingModel from "../database/models/booking.model";
import ScheduleModel from "../database/models/schedule.model";
import EWalletModel from "../database/models/wallet.model";
import { BookingDto } from "../types/booking.type";
import UtilityService from "./utility-service";
import { Op } from "sequelize";

const utilityService = new UtilityService();




export default class BookingService {
	public getBookingList() {
		return utilityService.performAsyncOperation(async () => {
			const getBookingList = await BookingModel.findAll({
				include: [
					{
						model: ScheduleModel,
						as: 'schedule',
					},
					{
						model: EWalletModel,
						as: 'wallet',
					},
				],
			});
			return getBookingList;
		});
	}

	public getBookListById(book_id: BookingDto['book_id']) {
		return utilityService.performAsyncOperation(async () => {
			const getBookingListById = await BookingModel.findOne({
				include: [
					{
						model: ScheduleModel,
						as: 'schedule',
					},
					{
						model: EWalletModel,
						as: 'wallet',
					},
				],
				where: {
					book_id: book_id,
				},
			});
			return getBookingListById;
		});
	}

	public createBooking(book: BookingDto) {
		return utilityService.performAsyncOperation(async () => {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			const existingBooking = await BookingModel.findOne({
				include: [
					{
						model: ScheduleModel,
						required: true,
						where: {
							vehicle_id: { [Op.eq]: book.vehicle_id },
						},
					},
				],
				where: {
					schedule_id: { [Op.eq]: book.schedule_id },
					createdAt: {
						[Op.gte]: today, // Greater than or equal to today's date
						[Op.lt]: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Less than tomorrow's date
					},
				},
			});

			if (existingBooking) {
				return { messag: 'You alread book for today same vehicle', data: [] };
			} else {
				const newBook = await BookingModel.create(book);

				if (newBook) {
					return { message: 'New book was created', data: newBook };
				} else {
					return { message: 'Failed to create new book', data: [] };
				}
			}
		});
	}
	public async modifyBooking(book_id: BookingDto['book_id'], book: Partial<BookingDto>) {
		return utilityService.performAsyncOperation(async () => {
			let existingPasenger = await BookingModel.findOne({
				where: {
					book_id: book_id,
				},
			});

			if (existingPasenger) {
				const updateResult = await existingPasenger.update(book);

				if (updateResult) {
					return { message: 'New book was updated', data: updateResult };
				} else {
					return { message: 'Failed to update passenger', data: [] };
				}
			}
		});
	}

	public async deleteBooking(book_id: BookingDto['book_id']) {
		return utilityService.performAsyncOperation(async () => {
			const deleteResult = await BookingModel.destroy({
				where: {
					book_id: book_id, // Specify the condition to identify the record to delete
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