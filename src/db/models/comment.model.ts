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
import Photo from "./photo.model.js";

export interface IComment {
	id: number;
	comment: string;
	UserId: string;
	user: User;
	PhotoId: number;
	photo: Photo;
	createdAt: Date;
	updatedAt: Date;
}

@Table({ tableName: "Comments" })
class Comment extends Model implements IComment {
	@PrimaryKey
	@AllowNull(false)
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare comment: string;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column(DataType.STRING)
	declare UserId: string;

	@BelongsTo(() => User)
	declare user: ReturnType<() => User>;

	@AllowNull(false)
	@ForeignKey(() => Photo)
	@Column(DataType.INTEGER)
	declare PhotoId: number;

	@BelongsTo(() => Photo)
	declare photo: ReturnType<() => Photo>;

	@AllowNull(false)
	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;
}

export default Comment;
