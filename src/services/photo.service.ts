import {
	CreatePhotoRequestDtoType,
	CreatePhotoResponseDtoType,
} from "./../db/dtos/photos/create.dto";
import Photo from "../db/models/photo.model.js";
import User from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";

export class PhotoService {
	private readonly _photoRepository;
	private readonly _userRepository;
	constructor() {
		this._photoRepository = sequelize.getRepository(Photo);
		this._userRepository = sequelize.getRepository(User);
	}

	async findAll(): Promise<Photo[]> {
		try {
			const photos = await this._photoRepository.findAll({
				include: this._userRepository,
			});

			return photos;
		} catch (error) {
			throw error;
		}
	}

	async add(
		userId: string,
		{ caption, title, poster_image_url }: CreatePhotoRequestDtoType
	): Promise<CreatePhotoResponseDtoType> {
		try {
			const photo = await this._photoRepository.create({
				UserId: userId,
				title,
				caption,
				poster_image_url,
			});

			return {
				id: photo.id,
				caption: photo.caption,
				poster_image_url: photo.poster_image_url,
				title: photo.title,
				UserId: photo.UserId,
			};
		} catch (error) {
			throw error;
		}
	}
}

