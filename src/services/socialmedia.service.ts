import Socialmedia from "../db/models/socialmedia.model.js";
import User from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
import {
	EditSocialmediaRequestDtoType,
	EditSocialmediaResponseDtoType,
	CreateSocialmediaRequestDtoType,
	CreateSocialmediaResponseDtoType
} from "../db/dtos/socialmedias/index.dto.js";

export class SocialmediaService {
	private readonly _socialmediaRepository;
	private readonly _userRepository;
	constructor() {
		this._socialmediaRepository = sequelize.getRepository(Socialmedia);
		this._userRepository = sequelize.getRepository(User);
	}

	async findAll(userId: number): Promise<Socialmedia[]> {
		try {
			const socialmedia = await this._socialmediaRepository.findAll({
				include: [
					{
						model: this._userRepository,
						attributes: ["id", "username", "profile_image_url"],
						where: { id: userId }
					}
				]
			});

			return socialmedia;
		} catch (error) {
			throw error;
		}
	}

	async findById(
		socialmediaId: number,
		userId: number
	): Promise<Socialmedia | null> {
		try {
			const socialmedia = await this._socialmediaRepository.findOne({
				where: {
					id: socialmediaId,
					UserId: userId
				}
			});

			return socialmedia;
		} catch (error) {
			throw error;
		}
	}

	async add(
		userId: number,
		{ name, social_media_url }: CreateSocialmediaRequestDtoType
	): Promise<CreateSocialmediaResponseDtoType> {
		try {
			const socialmedia = await this._socialmediaRepository.create({
				UserId: userId,
				name,
				social_media_url
			});

			return {
				id: socialmedia.id,
				name: socialmedia.name,
				social_media_url: socialmedia.social_media_url,
				UserId: socialmedia.UserId,
				createdAt: socialmedia.createdAt,
				updatedAt: socialmedia.updatedAt
			};
		} catch (error) {
			throw error;
		}
	}

	async edit(
		userId: number,
		socialmediaId: number,
		request: EditSocialmediaRequestDtoType
	): Promise<EditSocialmediaResponseDtoType> {
		try {
			const result = await this._socialmediaRepository.update(request, {
				where: {
					id: socialmediaId,
					UserId: userId
				},
				returning: true
			});

			const socialmedia = result[1][0]!;

			return {
				id: socialmedia.id,
				name: socialmedia.name,
				social_media_url: socialmedia.social_media_url,
				UserId: socialmedia.UserId,
				updatedAt: socialmedia.updatedAt,
				createdAt: socialmedia.createdAt
			};
		} catch (error) {
			throw error;
		}
	}

	async delete(userId: number, socialmediaId: string): Promise<boolean> {
		try {
			const result = await this._socialmediaRepository.destroy({
				where: {
					id: socialmediaId,
					UserId: userId
				}
			});

			return Boolean(result);
		} catch (error) {
			throw error;
		}
	}
}
