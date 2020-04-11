/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facility_details', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(180),
      allowNull: false
    },
    facilityCode: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    stateId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'state',
        key: 'id'
      }
    },
    countryId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      }
    },
    postalCode: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    contactName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    contactEmail: {
      type: DataTypes.STRING(150),
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
    tableName: 'facility_details'
  });
};
