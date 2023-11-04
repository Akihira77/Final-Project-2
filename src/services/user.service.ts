import { sequelize } from "../db/db.js";
import { RegisterRequestDTO } from "../db/dtos/users/register-request.dto.js";
import { IRegisterResponseDTO } from "../db/dtos/users/register-response.dto.js";
import User from "../db/models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/bcrypt.js";
import { DeleteUserDtoType } from "../db/dtos/users/delete-request.dto.js";

class UserService {
	private readonly _userRepository;
	constructor() {
		this._userRepository = sequelize.getRepository(User);
	}

	async findAll(): Promise<User[]> {
		try {
			return await this._userRepository.findAll();
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async findById(id: string): Promise<User | null> {
		try {
			return await this._userRepository.findByPk(id);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async add({
		age,
		email,
		full_name,
		password,
		phone_number,
		profile_image_url,
		username,
	}: RegisterRequestDTO): Promise<IRegisterResponseDTO> {
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
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async delete({ userId }: DeleteUserDtoType): Promise<boolean> {
		try {
			const result = await this._userRepository.destroy({
				where: {
					id: userId,
				},
			});

			return Boolean(result);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export default UserService;
