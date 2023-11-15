"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Comments", {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER,
            },
            comment: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            UserId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            PhotoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Photos",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
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
        await queryInterface.dropTable("Comments");
    },
};
export {};
//# sourceMappingURL=20231108085236-Comment.cjs.map