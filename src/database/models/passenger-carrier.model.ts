import { Table, Model, DataType, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import VehicleTypeCarrierModel from './vehicle-type.model';

@Table({
	timestamps: true,
	tableName: 'passenger_carry',
	modelName: 'passenger_carry',
})
export default class PassengerCarrierModel extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare carrier_id: string;

	@Column({
		type: DataType.STRING(80),
	})
	declare owner_name: string;

	@Column({
		type: DataType.STRING(80),
	})
	declare plate_number: string;

	@ForeignKey(() => VehicleTypeCarrierModel)
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare vehicletype_id: string;

	@BelongsTo(() => VehicleTypeCarrierModel, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	declare vehicletype_carry: VehicleTypeCarrierModel;
}
