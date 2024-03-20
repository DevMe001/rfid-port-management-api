import { Table,Model,Column,DataType } from "sequelize-typescript";

@Table({
	timestamps: true,
	tableName: 'accounts',
	modelName: 'accounts',
})
class AccountsModel extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare account_id: string;

	@Column({
		type: DataType.STRING(100),
	})
	declare user_id: string;

	@Column({
		type: DataType.STRING(50),
	})
	declare displayName: string;

	@Column({
		type: DataType.STRING(50),
	})
	declare email: string;

	@Column({
		type: DataType.STRING(200),
	})
	declare photo: string;
}

export default AccountsModel;