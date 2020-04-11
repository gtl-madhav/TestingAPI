/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entity_param_response_history', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entityWingRelationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'entity_wing_relation',
        key: 'id'
      }
    },
    entityParamId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'entity_parameters',
        key: 'id'
      }
    },
    entityParamResponse: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: true
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
    tableName: 'entity_param_response_history'
  });
};
