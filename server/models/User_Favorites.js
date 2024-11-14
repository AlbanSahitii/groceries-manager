module.exports = (sequelize, DataTypes) => {
    const UserFavorites = sequelize.define("UserFavorites", {
        groceries_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'groceries',
                key: 'id'
              }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
              }
        }
    }, {
        tableName: 'user_favorites'
    });
    
    return UserFavorites;
}