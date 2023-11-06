import {
	AllowNull,
	Column,
	CreatedAt,
	DataType,
	IsAlpha,
	IsEmail,
	IsInt,
	IsNumeric,
	IsUrl,
	Model,
	NotEmpty,
	NotNull,
	PrimaryKey,
	Table,
	UpdatedAt,
} from "sequelize-typescript";

export interface IUser {
	id: string;
	email: string;
	full_name: string;
	username: string;
	password: string;
	profile_image_url: string;
	age: number;
	phone_number: string;
	createdAt: Date;
	updatedAt: Date;
}

@Table
class User extends Model implements IUser {
	@PrimaryKey
	@AllowNull(false)
	@Column(DataType.STRING)
	declare id: string;

	@IsAlpha
	@AllowNull(false)
	@Column(DataType.STRING)
	declare full_name: string;

	@IsEmail
	@AllowNull(false)
	@Column(DataType.STRING)
	declare email: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare username: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare password: string;

	@IsUrl
	@AllowNull(false)
	@Column(DataType.TEXT)
	declare profile_image_url: string;

	@IsInt
	@Column(DataType.INTEGER)
	declare age: number;

	@IsNumeric
	@AllowNull(false)
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
