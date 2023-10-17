'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        static associate(models) {
            Comments.belongsTo(models.Comments, {
                as: 'parentComment',
                foreignKey: 'parentCommentId',
            });
            Comments.hasMany(models.Comments, {
                as: 'replies',
                foreignKey: 'parentCommentId',
            });
        }
    }
    Comments.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            parentCommentId: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            userName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING
            },
            homePage: {
                allowNull: true,
                type: DataTypes.STRING
            },
            text: {
                allowNull: false,
                type: DataTypes.TEXT
            },
            imageName: {
                allowNull: true,
                type: DataTypes.STRING
            },
            fileTextName: {
                allowNull: true,
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            modelName: "Comments",
            tableName: "comments",
            timestamps: true
        });
    return Comments
}