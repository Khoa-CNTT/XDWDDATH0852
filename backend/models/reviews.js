import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import User from './users.js'
import MenuItem from './menu_items.js'

const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_Id: {
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: 'users',
            key: 'id'
        }
    },
    rating: { type: DataTypes.DECIMAL(2, 1), allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    menu_item_Id: { type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'menu_items',
            key: 'id'
        }
    },
}, {
    tableName: "reviews",
    timestamps: false,
})

// Thiết lập quan hệ với User
Review.belongsTo(User, { foreignKey: 'user_Id' })
Review.belongsTo(MenuItem, { foreignKey: 'menu_item_Id' })

export default Review
