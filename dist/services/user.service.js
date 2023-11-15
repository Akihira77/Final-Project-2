import User from "../db/models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, validate } from "../utils/bcrypt.js";
import { jwtSign } from "../utils/jwt.js";
import { sequelize } from "../db/db.js";
class UserService {
    _userRepository;
    constructor() {
        this._userRepository = sequelize.getRepository(User);
    }
    async findAll() {
        try {
            return await this._userRepository.findAll();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async findById(id) {
        try {
            return await this._userRepository.findByPk(id);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async findByEmail(email) {
        try {
            const user = await this._userRepository.findOne({
                where: {
                    email,
                },
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async add({ age, email, full_name, password, phone_number, profile_image_url, username, }) {
        try {
            const user = {
                id: uuidv4(),
                full_name,
                username,
                email,
                password: await hashPassword(password),
                age,
                phone_number,
                profile_image_url,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const savedUser = await this._userRepository.create(user);
            return {
                email: savedUser.email,
                full_name: savedUser.full_name,
                username: savedUser.username,
                profile_image_url: savedUser.profile_image_url,
                age: savedUser.age,
                phone_number: savedUser.phone_number,
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async login({ email, password, }) {
        try {
            const user = await this.findByEmail(email);
            if (!user) {
                return "Email or Password is incorrect";
            }
            const isMatch = await validate(password, user.password);
            if (!isMatch) {
                return "Email or Password is incorrect";
            }
            const token = jwtSign({
                userId: user.id,
                email: user.email,
                full_name: user.full_name,
            });
            return { token };
        }
        catch (error) {
            throw error;
        }
    }
    async delete({ userId }) {
        try {
            const result = await this._userRepository.destroy({
                where: {
                    id: userId,
                },
            });
            return Boolean(result);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async edit(userId, request) {
        try {
            const result = await this._userRepository.update(request, {
                where: {
                    id: userId,
                },
                returning: true,
            });
            const user = result[1][0];
            return {
                user: {
                    email: user.email,
                    full_name: user.full_name,
                    username: user.username,
                    profile_image_url: user.profile_image_url,
                    age: user.age,
                    phone_number: user.phone_number,
                },
            };
        }
        catch (error) {
            throw error;
        }
    }
}
export default UserService;
//# sourceMappingURL=user.service.js.map