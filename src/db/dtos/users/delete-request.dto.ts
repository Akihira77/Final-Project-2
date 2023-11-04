import { NotEmpty, NotNull } from "sequelize-typescript";

export interface IDeleteUserDTO {
	userId: string;
}

export class DeleteUserDTO implements IDeleteUserDTO {
	@NotEmpty
	@NotNull
	declare userId: string;
}
