"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Photos", {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                }
            },
            caption: {
                allowNull: false,
                type: Sequelize.TEXT,
                validate: {
                    notEmpty: true
                }
            },
            poster_image_url: {
                allowNull: false,
                type: Sequelize.TEXT,
                validate: {
                    notEmpty: true,
                    isUrl: true
                }
            },
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id"
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
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
        await queryInterface.dropTable("Photos");
    }
};
export {};
//# sourceMappingURL=20231106034749-Photo.cjs.map