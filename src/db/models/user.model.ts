import {
	AllowNull,
	Column,
	CreatedAt,
	DataType,
	HasMany,
	IsAlpha,
	IsEmail,
	IsInt,
	IsNumeric,
	IsUrl,
	PrimaryKey,
	Table,
	UpdatedAt,
	Model,
	Unique,
	BeforeCreate,
	BeforeBulkCreate,
	AutoIncrement,
	NotEmpty
} from "sequelize-typescript";
import Photo from "./photo.model.js";
import { hashPassword } from "../../utils/bcrypt.js";

export interface IUser {
	id: number;
	email: string;
	full_name: string;
	username: string;
	password: string;
	profile_image_url: string;
	age: number;
	phone_number: string;
	Photos: Photo[];
	createdAt: Date;
	updatedAt: Date;
}

@Table({ tableName: "Users" })
class User extends Model implements IUser {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER)
	declare id: number;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare full_name: string;

	@IsEmail
	@AllowNull(false)
	@NotEmpty
	@Unique
	@Column(DataType.STRING)
	declare email: string;

	@AllowNull(false)
	@NotEmpty
	@Unique
	@Column(DataType.STRING)
	declare username: string;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare password: string;

	@IsUrl
	@AllowNull(false)
	@NotEmpty
	@Column(DataType.TEXT)
	declare profile_image_url: string;

	@IsInt
	@NotEmpty
	@AllowNull(false)
	@Column(DataType.INTEGER)
	declare age: number;

	@IsNumeric
	@NotEmpty
	@AllowNull(false)
	@Column(DataType.STRING)
	declare phone_number: string;

	@HasMany(() => Photo)
	declare Photos: Photo[];

	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;

	@BeforeCreate
	@BeforeBulkCreate
	static async hashingPassword(instance: User) {
		instance.password = await hashPassword(instance.password);
	}
}

export default User;
