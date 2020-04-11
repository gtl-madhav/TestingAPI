/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'user_roles',
        key: 'id'
      }
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
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: false
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
    tableName: 'users'
  });
};
