"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            full_name: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true,
                    isEmail: true
                }
            },
            username: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                }
            },
            profile_image_url: {
                allowNull: false,
                type: Sequelize.TEXT,
                validate: {
                    notEmpty: true,
                    isUrl: true
                }
            },
            age: {
                allowNull: false,
                type: Sequelize.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
            phone_number: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Date.now()
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    }
};
export {};
//# sourceMappingURL=20231103002034-User.cjs.map