import Photo from "../db/models/photo.model.js";
import User from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
import {
	EditPhotoRequestDtoType,
	EditPhotoResponseDtoType,
	CreatePhotoRequestDtoType,
	CreatePhotoResponseDtoType
} from "../db/dtos/photos/index.dto.js";
import Comment from "../db/models/comment.model.js";

export class PhotoService {
	private readonly _photoRepository;
	private readonly _userRepository;
	private readonly _commentRepository;
	constructor() {
		this._photoRepository = sequelize.getRepository(Photo);
		this._userRepository = sequelize.getRepository(User);
		this._commentRepository = sequelize.getRepository(Comment);
	}

	async findAll(): Promise<Photo[]> {
		try {
			const photos = await this._photoRepository.findAll({
				include: [
					{
						model: this._commentRepository,
						attributes: ["comment"],
						include: [
							{
								model: this._userRepository,
								attributes: ["username"]
							}
						]
					},
					{
						model: this._userRepository,
						attributes: ["id", "username", "profile_image_url"]
					}
				]
			});

			return photos;
		} catch (error) {
			throw error;
		}
	}

	async findById(photoId: number): Promise<Photo | null> {
		try {
			const photo = await this._photoRepository.findByPk(photoId);

			return photo;
		} catch (error) {
			throw error;
		}
	}

	async findByUserIdAndPhotoId(
		photoId: number,
		userId: number
	): Promise<Photo | null> {
		try {
			const photo = await this._photoRepository.findOne({
				where: {
					id: photoId,
					UserId: userId
				}
			});

			return photo;
		} catch (error) {
			throw error;
		}
	}

	async add(
		userId: number,
		{ caption, title, poster_image_url }: CreatePhotoRequestDtoType
	): Promise<CreatePhotoResponseDtoType> {
		try {
			const photo = await this._photoRepository.create({
				UserId: userId,
				title,
				caption,
				poster_image_url
			});

			return {
				id: photo.id,
				caption: photo.caption,
				poster_image_url: photo.poster_image_url,
				title: photo.title,
				UserId: photo.UserId
			};
		} catch (error) {
			throw error;
		}
	}

	async edit(
		photoId: number,
		request: EditPhotoRequestDtoType
	): Promise<EditPhotoResponseDtoType> {
		try {
			const result = await this._photoRepository.update(request, {
				where: {
					id: photoId
				},
				returning: true
			});

			const photo = result[1][0]!;

			return {
				id: photo.id,
				title: photo.title,
				caption: photo.caption,
				poster_image_url: photo.poster_image_url,
				UserId: photo.UserId,
				createdAt: photo.createdAt,
				updatedAt: photo.updatedAt
			};
		} catch (error) {
			throw error;
		}
	}

	async delete(photoId: number): Promise<boolean> {
		try {
			const result = await this._photoRepository.destroy({
				where: { id: photoId }
			});

			return Boolean(result);
		} catch (error) {
			throw error;
		}
	}
}
