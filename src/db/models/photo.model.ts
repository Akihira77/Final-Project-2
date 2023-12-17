import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	IsUrl,
	NotEmpty,
	PrimaryKey,
	Table,
	UpdatedAt,
	Model,
	HasMany
} from "sequelize-typescript";
import User from "./user.model.js";
import Comment from "./comment.model.js";

export interface IPhoto {
	id: number;
	title: string;
	caption: string;
	poster_image_url: string;
	UserId: number;
	User: User;
	Comments: Comment[];
	createdAt: Date;
	updatedAt: Date;
}

@Table({ tableName: "Photos" })
class Photo extends Model implements IPhoto {
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
	@Column(DataType.INTEGER)
	declare UserId: number;

	@BelongsTo(() => User)
	declare User: ReturnType<() => User>;

	@HasMany(() => Comment)
	declare Comments: Comment[];

	@AllowNull(false)
	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;
}

export default Photo;
