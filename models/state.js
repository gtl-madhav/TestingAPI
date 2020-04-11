/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('state', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    countryId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      }
    }
  }, {
    tableName: 'state'
  });
};
