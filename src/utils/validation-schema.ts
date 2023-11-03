import { ValidationError } from "sequelize";

export default function validationSchema({ errors }: ValidationError) {
	return errors.map((err) => {
		return err.message;
	});
}

