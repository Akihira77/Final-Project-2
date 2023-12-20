"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("SocialMedias", {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            social_media_url: {
                allowNull: false,
                type: Sequelize.STRING
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
        await queryInterface.dropTable("Socialmedias");
    }
};
export {};
//# sourceMappingURL=20231109105628-Socialmedia.cjs.map