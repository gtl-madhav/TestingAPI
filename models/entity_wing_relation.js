/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entity_wing_relation', {
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
    identityId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'identity',
        key: 'id'
      },
      unique: true
    },
    entityId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    entityName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    wingId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'wings',
        key: 'id'
      }
    },
    assistAlert: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
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
    tableName: 'entity_wing_relation'
  });
};
