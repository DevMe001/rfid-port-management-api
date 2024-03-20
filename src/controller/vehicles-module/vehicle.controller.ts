import { Route,Get, Body, Post, SuccessResponse, UploadedFile, Path } from "tsoa";
import VehicleServices from "../../services/vehicle-services";
import { VehiclesDto } from "../../types/vehicle-type";
import VehicleCategoriesServices from "../../services/vehicle_type-carrier.services";

const vehicleService = new VehicleServices();

const vehicleCategories =  new VehicleCategoriesServices();

@Route('vehicles')
export default class VehicleController {
	@Get('/')
	public async getVehicles() {
		return await vehicleService.getVehicles();
	}

	@Get('/categories')
	public async getVehicleCategory() {
		return await vehicleCategories.getVehicleCategories();
	}

	@Get('/:vehicle_id')
	public async getVehicle(@Path() vehicle_id: VehiclesDto['vehicle_id']) {
		return await vehicleService.getVehicle(vehicle_id);
	}

	@SuccessResponse('201', 'Created')
	@Post('/')
	public async newVehicle(@Body() requestBody: VehiclesDto) {
		try {
			return await vehicleService.newVehicle({ ...requestBody });
		} catch (error) {
			// Handling errors
			console.error('Error handling file upload:', error);
			throw new Error('Internal Server Error');
		}
	}
}