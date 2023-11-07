import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	IsUrl,
	Model,
	NotEmpty,
	PrimaryKey,
	Table,
	UpdatedAt,
} from "sequelize-typescript";
import User from "./user.model.js";

export interface IPhoto {
	id: number;
	title: string;
	caption: string;
	poster_image_url: string;
	UserId: string;
	user: User;
	createdAt: Date;
	updatedAt: Date;
}

@Table
export class Photo extends Model implements IPhoto {
	@PrimaryKey
	@AllowNull(false)
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare title: string;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare caption: string;

	@AllowNull(false)
	@NotEmpty
	@IsUrl
	@Column(DataType.STRING)
	declare poster_image_url: string;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column(DataType.STRING)
	declare UserId: string;

	@BelongsTo(() => User)
	declare user: User;

	@AllowNull(false)
	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;
}

