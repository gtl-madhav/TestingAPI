/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const identity = sequelize.define('identity', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    facilityId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'facility_details',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    uniqueId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    statusId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'generic_status',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'identity'
  });

  identity.associate = function (models) {
    // associations can be defined here
    // identity.belongsTo(models.generic_status, {
    //   foreignKey: "status_id"
    // });
    identity.hasMany(models.entity_wing_relation, {
      foreignKey: "identityId"
    });
  }
  return identity;
};
