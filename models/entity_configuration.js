/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entity_configuration', {
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
    isWebDashboard: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    webDisplayOrder: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    isMobileDashboard: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false
    },
    mobileDisplayOrder: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    canAddToWing: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    isAssistEnabled: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'entity_configuration'
  });
};
