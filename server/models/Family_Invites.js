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
  
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
      

    }, {
        tableName: 'family_invites'
    });

    FamilyInvites.associate = models => { 
        FamilyInvites.belongsTo(models.Family, {
            foreignKey: "family_id",
            onDelete: "cascade"
        })
        FamilyInvites.belongsTo(models.User, {
            foreignKey: "user_id",
            onDelete: "cascade"
        })
    }
    
    return FamilyInvites;
}