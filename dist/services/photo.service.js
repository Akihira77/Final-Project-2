import { sequelize } from "../db/db.js";
import Photo from "../db/models/photo.model.js";
import User from "../db/models/user.model.js";
export class PhotoService {
    _photoRepository;
    constructor() {
        this._photoRepository = sequelize.getRepository(Photo);
    }
    async findAll() {
        try {
            const photos = await this._photoRepository.findAll({
                include: User,
            });
            return photos;
        }
        catch (error) {
            throw error;
        }
    }
    async add({ caption, title, poster_image_url, }) {
        try {
            const photo = await this._photoRepository.create({
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
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=photo.service.js.map