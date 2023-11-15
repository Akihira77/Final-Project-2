import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	NotEmpty,
	PrimaryKey,
	Table,
	UpdatedAt,
	Model,
} from "sequelize-typescript";
import User from "./user.model.js";

export interface ISocialMedia {
	id: number;
	name: string;
	social_media_url: string;
	UserId: string;
	user: User;
	createdAt: Date;
	updatedAt: Date;
}

@Table
class SocialMedia extends Model implements ISocialMedia {
	@PrimaryKey
	@AllowNull(false)
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare name: string;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare social_media_url: string;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column(DataType.STRING)
	declare UserId: string;

	@BelongsTo(() => User)
	declare user: ReturnType<() => User>;

	@AllowNull(false)
	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;
}

export default SocialMedia;
