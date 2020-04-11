/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entity_parameters', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entityId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    parameter: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    isAlert: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    alertValue: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    alertDisplayOrder: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    paramDisplayOrder: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
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
    tableName: 'entity_parameters'
  });
};
