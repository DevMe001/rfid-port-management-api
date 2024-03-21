import { Table, Model, DataType,Column } from 'sequelize-typescript';

@Table({
	timestamps: true,
	tableName: 'vehicletype_carry',
	modelName: 'vehicletype_carry',
})
export default class VehicleTypeCarrierModel extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare vehicletype_id: string;

	@Column({
		type: DataType.STRING(80),
	})
	declare vehicletype_name: string;
	@Column({
		type: DataType.DOUBLE,
	})
	declare carrier_fee: number;
}