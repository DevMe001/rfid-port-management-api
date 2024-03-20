import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({
	timestamps: true,
	tableName: 'payment_history',
	modelName: 'payment_history',
})
export default class PaymentHistoryModel extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare payment_id: string;

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
	})
	declare balance: number;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare payment_type: string;

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
	})
	declare amount: number;
}