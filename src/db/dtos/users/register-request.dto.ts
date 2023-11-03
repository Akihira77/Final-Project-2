import {
	IsAlpha,
	IsAlphanumeric,
	IsEmail,
	IsNumeric,
	IsUrl,
	NotEmpty,
	NotNull,
} from "sequelize-typescript";

export interface IRegisterRequestDTO {
	email: string;
	full_name: string;
	username: string;
	password: string;
	profile_image_url: string;
	age: number;
	phone_number: string;
}

export class RegisterRequestDTO implements IRegisterRequestDTO {
	@IsEmail
	@NotNull
	@NotEmpty
	@IsAlphanumeric
	declare email: string;

	@NotNull
	@NotEmpty
	@IsAlpha
	declare full_name: string;

	@NotNull
	@NotEmpty
	@IsAlphanumeric
	declare username: string;

	@NotNull
	@NotEmpty
	declare password: string;

	@NotNull
	@NotEmpty
	@IsUrl
	declare profile_image_url: string;

	@NotNull
	@NotEmpty
	@IsNumeric
	declare age: number;

	@NotNull
	@NotEmpty
	@IsNumeric
	declare phone_number: string;
}

