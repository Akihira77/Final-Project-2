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
}
//# sourceMappingURL=comment.service.js.map