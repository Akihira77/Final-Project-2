import { PhotoService } from "../../services/photo.service.js";
import { StatusCodes } from "../../utils/constants.js";
const photoService = new PhotoService();
export const findAllPhoto = async (req, res) => {
    try {
        const photos = await photoService.findAll();
        res.status(StatusCodes.Ok200).send({ photos });
        return;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=handler.js.map