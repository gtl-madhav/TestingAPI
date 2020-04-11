const sequelize = require("sequelize");
const identity = require("../models").identity;
const entity_wing_relation = require("../models").entity_wing_relation;
const entities = require("../models").entities;
const entity_configuration = require("../models").entity_configuration;
const entity_param_response = require("../models").entity_param_response;

/**
 * @file /controllers/scanIdentityController.js
 */
module.exports = {
    /**
     * Validate identity GET API for SMSP Mobile App
     * <p>
     * Validate identity GET API for SMSP Mobile application
     * to fetch the entity name on which identity is attached
     * </p>
     * Local API
     * @method GET Local SMSP API
     * @param {object} req the request object
     * @param  {object} res  the response object
     * @param  {object} next the next middleware
     * @return {object} JSON object
     */
    validateIdentity: async function (req, res, next) {
        let resultout = {
            result: {
                statusBind: false,
                statusCodeBind: 117,
                data: {
                    message: "Scanning failed! Identity code is not matched."
                }
            }
        };

        await identity
            .findOne({
                where: {
                    name: req.params.identitycode,
                    statusId: [1]
                },
                include: [{
                    model: entity_wing_relation,
                    where: { statusId: [1] }
                }]
            })
            .then(entity => {
                if (entity !== null) {
                    req.result = {
                        data: {
                            entity: entity
                        }
                    };
                    return next();
                }
                else {
                    req.result = resultout.result;
                    return next();
                }
            })
            .catch(error => {
                console.log("ERROR: ", error.message);
                req.result = resultout.result;
                //logger.log(error.message, error, req);
                return next();
            });
    },
    /**
     * Entity GET API for SMSP Mobile App
     * <p>
     * Entity GET API for SMSP Mobile application
     * to get the mobile dashboard entities with its parameter response
     * </p>
     * Local API
     * @method GET Local SMSP API
     * @param {object} req the request object
     * @param  {object} res  the response object
     * @param  {object} next the next middleware
     * @return {object} JSON object
     */
    getDashboardEntity: async function (req, res, next) {
        let resultout = {
            result: {
                statusBind: false,
                statusCodeBind: 117,
                data: {
                    message: "Something went wrong with API operation try again / contact API admin"
                }
            }
        };

        await entities
            .findAll({
                where: {
                    name: req.body.facilityId,
                    statusId: [1]
                },
                include: [{
                    model: entity_configuration,
                    where: { isMobileDashboard: 1 },
                    order: [["mobileDisplayOrder", "AESC"]]
                }],
                include: [{
                    model: entity_param_response,
                    where: {
                        entityWingRelationId: req.body.entityWingRelationId,
                        statusId: [1]
                    }
                }]
            })
            .then(entityData => {
                if (entityData !== null) {
                    req.result = {
                        data: {
                            entityResponse: entityData
                        }
                    };
                    // await entity_param_response
                    //     .findAll({
                    //         where: {
                    //             entityWingRelationId: req.body.entityWingRelationId,
                    //             entityId: entityData.id,
                    //             statusId: [1]
                    //         }
                    //     }).then(entityResponse => {
                    //         
                    //     }).catch(error => {
                    //         console.log("ERROR: ", error.message);
                    //         req.result = resultout.result;
                    //         //logger.log(error.message, error, req);
                    //         return next();
                    //     })
                    return next();
                }
                else {
                    req.result = resultout.result;
                    return next();
                }
            })
            .catch(error => {
                console.log("ERROR: ", error.message);
                req.result = resultout.result;
                //logger.log(error.message, error, req);
                return next();
            });
    },
    /**
     * Entity GET API for SMSP Mobile App
     * <p>
     * Entity GET API for SMSP Mobile application
     * to get the mobile dashboard entities with its parameter response
     * </p>
     * Local API
     * @method GET Local SMSP API
     * @param {object} req the request object
     * @param  {object} res  the response object
     * @param  {object} next the next middleware
     * @return {object} JSON object
     */
    postEntityResponse: async function (req, res, next) {
        let resultout = {
            result: {
                statusBind: false,
                statusCodeBind: 117,
                data: {
                    message: "Something went wrong with API operation try again / contact API admin"
                }
            }
        };

        await entities
            .findAll({
                where: {
                    name: req.body.facilityId,
                    statusId: [1]
                },
                include: [{
                    model: entity_configuration,
                    where: { isMobileDashboard: 1 },
                    order: [["mobileDisplayOrder", "AESC"]]
                }],
                include: [{
                    model: entity_param_response,
                    where: {
                        entityWingRelationId: req.body.entityWingRelationId,
                        statusId: [1]
                    }
                }]
            })
            .then(entityData => {
                if (entityData !== null) {
                    req.result = {
                        data: {
                            entityResponse: entityData
                        }
                    };
                    // await entity_param_response
                    //     .findAll({
                    //         where: {
                    //             entityWingRelationId: req.body.entityWingRelationId,
                    //             entityId: entityData.id,
                    //             statusId: [1]
                    //         }
                    //     }).then(entityResponse => {
                    //         
                    //     }).catch(error => {
                    //         console.log("ERROR: ", error.message);
                    //         req.result = resultout.result;
                    //         //logger.log(error.message, error, req);
                    //         return next();
                    //     })
                    return next();
                }
                else {
                    req.result = resultout.result;
                    return next();
                }
            })
            .catch(error => {
                console.log("ERROR: ", error.message);
                req.result = resultout.result;
                //logger.log(error.message, error, req);
                return next();
            });
    }
}