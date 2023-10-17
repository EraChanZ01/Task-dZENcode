module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            homePage: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            parentCommentId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'comments',
                    key: 'id',
                },
            },
            imageName: {
                allowNull: true,
                type: Sequelize.STRING
            },
            fileTextName: {
                allowNull: true,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('comments');
    },
}