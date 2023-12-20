import Socialmedia from "../db/models/socialmedia.model.js";
import User from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
export class SocialmediaService {
    _socialmediaRepository;
    _userRepository;
    constructor() {
        this._socialmediaRepository = sequelize.getRepository(Socialmedia);
        this._userRepository = sequelize.getRepository(User);
    }
    async findAll(userId) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async findById(socialmediaId, userId) {
        try {
            const socialmedia = await this._socialmediaRepository.findOne({
                where: {
                    id: socialmediaId,
                    UserId: userId
                }
            });
            return socialmedia;
        }
        catch (error) {
            throw error;
        }
    }
    async add(userId, { name, social_media_url }) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async edit(userId, socialmediaId, request) {
        try {
            const result = await this._socialmediaRepository.update(request, {
                where: {
                    id: socialmediaId,
                    UserId: userId
                },
                returning: true
            });
            const socialmedia = result[1][0];
            return {
                id: socialmedia.id,
                name: socialmedia.name,
                social_media_url: socialmedia.social_media_url,
                UserId: socialmedia.UserId,
                updatedAt: socialmedia.updatedAt,
                createdAt: socialmedia.createdAt
            };
        }
        catch (error) {
            throw error;
        }
    }
    async delete(userId, socialmediaId) {
        try {
            const result = await this._socialmediaRepository.destroy({
                where: {
                    id: socialmediaId,
                    UserId: userId
                }
            });
            return Boolean(result);
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=socialmedia.service.js.map