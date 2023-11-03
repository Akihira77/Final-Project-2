import { IRegisterRequestDTO } from "./register-request.dto.js";

export interface IRegisterResponseDTO
	extends Omit<IRegisterRequestDTO, "password"> {}

