import Comment from "../db/models/comment.model.js";
import Photo from "../db/models/photo.model.js";
import User from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
export class CommentService {
    _commentRepository;
    _userRepository;
    _photoRepository;
    constructor() {
        this._commentRepository = sequelize.getRepository(Comment);
        this._userRepository = sequelize.getRepository(User);
        this._photoRepository = sequelize.getRepository(Photo);
    }
    async findAll() {
        try {
            const comment = await this._commentRepository.findAll({
                include: [
                    {
                        model: this._userRepository,
                        attributes: ["id", "username", "profile_image_url", "phone_number"],
                    },
                    {
                        model: this._photoRepository,
                        attributes: ["id", "title", "caption", "poster_image_url"],
                    },
                ],
            });
            return comment;
        }
        catch (error) {
            throw error;
        }
    }
    async findById(commentId) {
        try {
            const comment = await this._commentRepository.findByPk(commentId);
            return comment;
        }
        catch (error) {
            throw error;
        }
    }
    async add(userId, { comment, PhotoId }) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async edit(commentId, request) {
        try {
            const result = await this._commentRepository.update(request, {
                where: {
                    id: commentId,
                },
                returning: true,
            });
            const comment = result[1][0];
            return {
                id: comment.id,
                comment: comment.comment,
                UserId: comment.UserId,
                PhotoId: comment.PhotoId,
                updatedAt: comment.updatedAt,
                createdAt: comment.createdAt,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async delete(commentId) {
        try {
            const result = await this._commentRepository.destroy({
                where: { id: commentId },
            });
            return Boolean(result);
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=comment.service.js.map