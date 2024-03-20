import { Table, Model,Column,DataType,ForeignKey,BelongsTo } from 'sequelize-typescript';
import BookingModel from './booking.model';
import EWalletModel from './wallet.model';
import PersonalInformationModel from './profile-information.model';

@Table({
	timestamps: true,
	tableName: 'transaction',
	modelName: 'transaction',
})
export default class TransactionModel extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare transaction_id: string;

	@ForeignKey(() => BookingModel)
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare book_id: string;

	@BelongsTo(() => BookingModel, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	declare booking: BookingModel;

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

	@ForeignKey(() => PersonalInformationModel)
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare personal_id: string;

	@BelongsTo(() => PersonalInformationModel, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	declare personal_information: PersonalInformationModel;
}