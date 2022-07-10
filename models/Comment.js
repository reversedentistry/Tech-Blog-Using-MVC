const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
        }, 
        comment_text: {
            type: DataTypes.STRING(500), 
            allowNull: false
        }, 
        post_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: "post", 
                key: "id"
            }
        }, 
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
              }, 
            
        }, 
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, 
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }

); 

module.exports = Comment;