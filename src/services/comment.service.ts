import {
	CreateCommentRequestDtoType,
	CreateCommentResponseDtoType,
} from "./../db/dtos/comments/create.dto";
import Comment from "../db/models/comment.model.js";
import Photo from "../db/models/photo.model.js";
import User from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
import { date } from "zod";
// import {
// 	EditCommentRequestDtoType,
// 	EditCommentResponseDtoType,
// } from "../db/dtos/comments/edit.dto.js";

export class CommentService {
	private readonly _commentRepository;
	private readonly _userRepository;
	private readonly _photoRepository;
	constructor() {
		this._commentRepository = sequelize.getRepository(Comment);
		this._userRepository = sequelize.getRepository(User);
		this._photoRepository = sequelize.getRepository(Photo);
	}

	// async findAll(): Promise<Photo[]> {
	// 	try {
	// 		const photos = await this._photoRepository.findAll({
	// 			include: [
	// 				{
	// 					model: this._userRepository,
	// 					attributes: ["id", "username", "profile_image_url"],
	// 				},
	// 			],
	// 		});

	// 		return photos;
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }

	// async findById(photoId: string): Promise<Photo | null> {
	// 	try {
	// 		const photo = await this._photoRepository.findByPk(photoId);

	// 		return photo;
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }

	async add(
		userId: string,
		{ comment, PhotoId }: CreateCommentRequestDtoType
	): Promise<CreateCommentResponseDtoType> {
		try {
			const komen = await this._commentRepository.create({
				UserId: userId,
				comment,
				PhotoId,
			});

			return {
				id: komen.id,
				comment: komen.comment,
                PhotoId: komen.PhotoId,
				UserId: komen.UserId,
                createdAt: komen.createdAt,
                updatedAt: komen.updatedAt
			};
		} catch (error) {
			throw error;
		}
	}

// 	async edit(
// 		photoId: string,
// 		request: EditPhotoRequestDtoType
// 	): Promise<EditPhotoResponseDtoType> {
// 		try {
// 			const result = await this._photoRepository.update(request, {
// 				where: {
// 					id: photoId,
// 				},
// 				returning: true,
// 			});

// 			const photo = result[1][0]!;

// 			return {
// 				id: photo.id,
// 				title: photo.title,
// 				caption: photo.caption,
// 				poster_image_url: photo.poster_image_url,
// 				UserId: photo.UserId,
// 				createdAt: photo.createdAt,
// 				updatedAt: photo.updatedAt,
// 			};
// 		} catch (error) {
// 			throw error;
// 		}
// 	}

// 	async delete(photoId: string): Promise<boolean> {
// 		try {
// 			const result = await this._photoRepository.destroy({
// 				where: { id: photoId },
// 			});

// 			return Boolean(result);
// 		} catch (error) {
// 			throw error;
// 		}
// 	}
}

