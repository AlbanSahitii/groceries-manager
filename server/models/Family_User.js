module.exports = (sequelize, DataTypes) => {
    const FamilyUser = sequelize.define("FamilyUser", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
              }
  
        },
        family_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'families',
                key: 'id'
              }
  
        }

    }, {
        tableName: 'family_user'
    });
    
    return FamilyUser;
}