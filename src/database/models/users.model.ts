import { Table,Model,Column,DataType } from "sequelize-typescript";

@Table({
	timestamps: true,
	tableName: 'users',
	modelName: 'Users',
})
class UsersModel extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4
	})
	declare id: string;

	@Column({
		type: DataType.STRING(50)
	})
	declare name: string;

	@Column({
		type: DataType.TEXT
	})
	declare address: string;

	@Column({
		type: DataType.BIGINT
	})
	declare age: number;


	@Column({
		type: DataType.STRING(10)
	})
	declare gender: string;


	@Column({
		type: DataType.BIGINT,
		allowNull: false,
	})
	declare mobileNumber: number;

	
	@Column({
		type: DataType.STRING(50)
	})
	declare email: string;

	@Column({
		type: DataType.STRING(97)
	})
	declare password: string;
  
}

export default UsersModel;