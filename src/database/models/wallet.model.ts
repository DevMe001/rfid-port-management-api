import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import PersonalInformationModel from "./profile-information.model";

@Table({
	timestamps: true,
	tableName: 'ewallet',
	modelName: 'ewallet',
})
export default class EWalletModel extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare wallet_id: string;

	@Column({
		type: DataType.INTEGER,
		allowNull:true,
	})
	declare account_number: number;

	@Column({
		type: DataType.DOUBLE,
		defaultValue:0
	})
	declare balance: number;

	@Column({
		type: DataType.SMALLINT,
		defaultValue:0
	})
	declare is_taken: number;

	@Column({
		type: DataType.STRING(40),
	})
	declare status: string;

	@ForeignKey(() => PersonalInformationModel)
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
	})
	declare personal_id: string;

	@BelongsTo(() => PersonalInformationModel, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	declare personal_information: PersonalInformationModel;
}

