import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import PersonalInformationModel from "./profile-information.model";
import PassengerCarrierModel from "./passenger-carrier.model";

@Table({
	timestamps: true,
	tableName: 'passengers',
	modelName: 'passengers',
})
export default class PassengerModels extends Model {
	@Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true,
	})
	declare passenger_id: number;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare firstname: string;
	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare lastname: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare gender: string;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	declare birthdate: string;
	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare fare_type: string;

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

	@ForeignKey(() => PassengerCarrierModel)
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: true,
	})
	declare carrier_id: string;

	@BelongsTo(() => PassengerCarrierModel, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	declare passenger_carry: PassengerCarrierModel;
}