import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import ScheduleModel from "./schedule.model";
import EWalletModel from "./wallet.model";
import { BookingDto } from "../../types/booking.type";

@Table({
	timestamps: true,
	tableName: 'booking',
	modelName: 'booking',
})
export default class BookingModel extends Model<BookingDto> {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare book_id: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare passengers: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare seat_numbers: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare amount: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare service_charge: number;

	@ForeignKey(() => ScheduleModel)
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare schedule_id: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare status: string;

	@BelongsTo(() => ScheduleModel, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	declare schedule: ScheduleModel;

	@ForeignKey(() => EWalletModel)
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare wallet_id: string;

	@BelongsTo(() => EWalletModel, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	declare wallet: EWalletModel;
}