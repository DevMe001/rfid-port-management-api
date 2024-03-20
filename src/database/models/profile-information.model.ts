import { Table,Model,Column,DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import AccountsModel from "./accounts.model";
import { PersonalDto } from "../../types/personal-type";

@Table({
	timestamps: true,
	tableName: 'personal_information',
	modelName: 'personal_information',
})
class PersonalInformationModel extends Model<PersonalDto> {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare personal_id: string;

	@Column({
		type: DataType.STRING(50),
	})
	declare firstname: string;

	@Column({
		type: DataType.STRING(50),
	})
	declare midlename: string;

	@Column({
		type: DataType.STRING(50),
	})
	declare lastname: string;

	@Column({
		type: DataType.INTEGER,
	})
	declare age: number;

	@Column({
		type: DataType.DATE,
	})
	declare birthdate: Date;

	@Column({
		type: DataType.STRING(10),
	})
	declare gender: string;

	@Column({
		type: DataType.STRING(20),
	})
	declare nationality: string;

	@Column({
		type: DataType.TEXT,
	})
	declare address: string;

	@Column({
		type: DataType.STRING(11),
		allowNull: false,
	})
	declare mobileNumber: string;

	@ForeignKey(() => AccountsModel)
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
	})
	declare account_id: string;

	@BelongsTo(() => AccountsModel, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	declare accounts: AccountsModel;
}

export default PersonalInformationModel;