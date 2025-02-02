module.exports = (sequelize, DataTypes) => {
    const FamilyInvites = sequelize.define("FamilyInvites", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
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
        tableName: 'family_invites'
    });

    FamilyInvites.associate = models => { 
        FamilyInvites.belongsTo(models.Family, {
            onDelete: "cascade"
        })
        FamilyInvites.belongsTo(models.User, {
            onDelete: "cascade"
        })
    }
    
    return FamilyInvites;
}