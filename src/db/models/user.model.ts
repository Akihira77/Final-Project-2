import {
	Column,
	CreatedAt,
	DataType,
	IsAlpha,
	IsEmail,
	IsInt,
	IsNumeric,
	Model,
	PrimaryKey,
	Table,
	UpdatedAt,
} from "sequelize-typescript";

@Table
class User extends Model<User> {
	@PrimaryKey
	@Column(DataType.STRING)
	declare id: string;

	@IsAlpha
	@Column(DataType.STRING)
	declare full_name: string;

	@IsEmail
	@Column(DataType.STRING)
	declare email: string;

	@IsAlpha
	@Column(DataType.STRING)
	declare username: string;

	@IsAlpha
	@Column(DataType.STRING)
	declare password: string;

	@Column(DataType.TEXT)
	declare profile_image_url: string;

	@IsInt
	@Column(DataType.INTEGER)
	declare age: number;

	@IsNumeric
	@Column(DataType.STRING)
	declare phone_number: string;

	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;
}

export default User;

