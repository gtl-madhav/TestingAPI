/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('settings', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
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
    noOfWingColumns: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '5'
    },
    defaultEntityColumns: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '5'
    },
    androidAppVersion: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    iosAppVersion: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    androidForceUpdate: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    iosForceUpdate: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    isOta: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    otaLink: {
      type: DataTypes.STRING(512),
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
    tableName: 'settings'
  });
};
