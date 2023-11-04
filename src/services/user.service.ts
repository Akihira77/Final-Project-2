import { sequelize } from "../db/db.js";
import {
	RegisterRequestDtoType,
	RegisterResponseDtoType,
} from "../db/dtos/users/register.dto.js";
import User from "../db/models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, validate } from "../utils/bcrypt.js";
import { DeleteUserDtoType } from "../db/dtos/users/delete.dto.js";
import {
	LoginRequestDtoType,
	LoginResponseDtoType,
} from "../db/dtos/users/login.dto.js";
import jwt from "jsonwebtoken";

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

	async findByEmail(email: string): Promise<User | null> {
		try {
			const user = await this._userRepository.findOne({
				where: {
					email,
				},
			});

			return user;
		} catch (error) {
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
	}: RegisterRequestDtoType): Promise<RegisterResponseDtoType> {
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

	async login({
		email,
		password,
	}: LoginRequestDtoType): Promise<LoginResponseDtoType> {
		try {
			const user = await this.findByEmail(email);
			if (!user) {
				return "Email or Password is incorrect";
			}

			const isMatch = await validate(password, user.password);
			if (!isMatch) {
				return "Email or Password is incorrect";
			}

			const payload = { userId: user.id, email: user.email };
			const token = jwt.sign(payload, process.env.JWT_SECRET!);

			return { token };
		} catch (error) {
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
