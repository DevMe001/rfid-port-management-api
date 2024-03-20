// table

import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table({
	timestamps: true,
	tableName: 'vehicle',
	modelName: 'vehicle',
})
// class
export default class VehicleModel extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare vehicle_id: string;
	@Column({
		type: DataType.STRING(50),
	})
	declare vehicle_name: string;
	@Column({
		type: DataType.STRING(20),
	})
	declare vehicle_type: string;
	@Column({
		type: DataType.STRING(100),
	})
	declare vehicle_photo: string;

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
	})
	declare vehicle_price: number;
}