import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import VehicleModel from './vehicle.model';

@Table({
	timestamps: true,
	tableName: 'schedule',
	modelName: 'schedule',
})
export default class ScheduleModel extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare schedule_id: string;

	@Column({
		type: DataType.STRING(100),
	})
	declare origin: string;

	@Column({
		type: DataType.STRING(100),
	})
	declare destination: string;

	@Column({
		type: DataType.DATE,
	})
	declare arrival_date: Date;

	@Column({
		type: DataType.DATE,
	})
	declare arrival_time: Date;

	@Column({
		type: DataType.BIGINT,
		allowNull: false,
	})
	declare seatRange: number;

	@ForeignKey(() => VehicleModel)
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
	})
	declare vehicle_id: string;

	@BelongsTo(() => VehicleModel, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	declare vehicle: VehicleModel;
}
