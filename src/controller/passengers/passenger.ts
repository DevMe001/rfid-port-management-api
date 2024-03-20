import { Body, Post, Put, Route, SuccessResponse, Path, Delete, Get } from 'tsoa';
import { PassengerDto } from "../../types/passengers.type";
import PassengerServices from "../../services/passenger-services";
import PassengerCarrierServices from '../../services/passenger-carry-services';

  
const passengerService = new PassengerServices();

@Route('passenger')
export default class PassengerController {
	@Get('/')
	public async getPassengerwithCarrier() {
		return await passengerService.getPassengers();
	}

	@SuccessResponse('201', 'Created')
	@Post('/')
	public async newPassenger(@Body() requestBody: PassengerDto) {
		return await passengerService.newPassengers({ ...requestBody });
	}

	@SuccessResponse('202 ', 'Accepted ')
	@Put('/')
	public async updatePassenger(@Path() passenger_id: string, @Body() requestBody: Omit<PassengerDto, 'id'>) {
		return passengerService.modifyPassenger(passenger_id, { ...requestBody });
	}

	@SuccessResponse('202 ', 'Accepted ')
	@Delete('/:id')
	public async deletePassenger(@Path() passenger_id: string) {
		return passengerService.deletePassenger(passenger_id);
	}
}