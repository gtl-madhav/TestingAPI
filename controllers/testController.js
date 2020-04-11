const sequelize = require("sequelize");
const country = require("../models").country;

module.exports = {
    testFun: async function (re, res, next) {
        await country.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('name')), 'No_Country']]
        }).then(no => {
            return res.json(no);
        }).catch(error => {
            console.log(error.message);
            return res.status(500);
        })
    }
}