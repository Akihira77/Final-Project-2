"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			full_name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			email: {
				unique: true,
				allowNull: false,
				type: Sequelize.STRING,
			},
			username: {
				unique: true,
				allowNull: false,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			profile_image_url: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			age: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			phone_number: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Date.now(),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};

