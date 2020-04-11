const env = process.env.NODE_ENV || "development";
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
const smspConfiguration = require("../config/smspConfig.json")[env];
const KEY_PRIVATE = smspConfiguration.privatekey;
const IV_VECTOR = smspConfiguration.vectorkey;
const CHR_ENCODE = smspConfiguration.chrencode;
const SECRET_KEY = smspConfiguration.secretkey;
/**
 * @file /middlewares/authentication.js
 */
module.exports = {
    /**
     * JWT Token varification
     * <p>
     * Ensure And Verify Token for all request  which are after login
     * Takes care of authentication for SMSP Application
     * Requests and validates
     * </p>
     *
     * @method EnsureAndVerifyToken for all request  which are after login
     * @param  {object} req  the request object
     * @param  {object} res  the response object
     * @param  {object} next the next middleware
     * @return {string} string|JSON object of userid, username token and role
     */
    EnsureAndVerifyToken: async function (req, res, next) {
        if (
            req.path.indexOf("/login") > -1 ||
            req.path.indexOf("/forgotpassword") > -1 ||
            (req.path.indexOf("/signup") > -1 && req.method === "POST")
        ) {
            console.log("Inside for signup/login and password");
            next();
        } else {
            var bearerHeader = req.headers["authorization"];
            // console.log ("token >>",req.path);
            console.log("token >>", bearerHeader);
            if (bearerHeader !== undefined) {
                // Blocked user must not access the apis.
                if (req.session.blockedTokenList !== undefined) {
                    if (req.session.blockedTokenList.indexOf(bearerHeader) != -1) {
                        res.status(401).json({
                            message:
                                "The server understood the request but" +
                                " refuses to authorize it. Either Token has been Expired.!"
                        });
                        res.end();
                        return;
                    }
                }
                req.token = bearerHeader;
                let binaryEncryptionKey = Buffer.from(KEY_PRIVATE);
                let binaryIV = Buffer.from(IV_VECTOR);
                let decipher = crypto.createDecipheriv(
                    "AES-128-CBC",
                    binaryEncryptionKey,
                    binaryIV
                );
                let decryptedInput;
                try {
                    decryptedInput =
                        decipher.update(req.token, "hex", CHR_ENCODE) +
                        decipher.final(CHR_ENCODE);
                } catch (exception) {
                    console.log(exception.message);
                    res.status(403).json({
                        message:
                            "The server understood the request but" +
                            " refuses to authorize it.!"
                    });
                    res.end();
                    return;
                }
                if (decryptedInput !== undefined) {
                    jwt.verify(decryptedInput, SECRET_KEY, async function (err, data) {
                        if (err) {
                            if (err.name === "TokenExpiredError") {
                                res.status(401).json({
                                    message: "Token has been Expired."
                                });
                                res.end();
                                return;
                            } else {
                                res.status(403).json({
                                    message:
                                        "The server understood the request but" +
                                        " refuses to authorize it.!"
                                });
                                res.end();
                                return;
                            }
                        } else {
                            req.acl = {
                                role: data.payload.role,
                                email: data.payload.email,
                                userid: data.payload.userid
                            };
                            await validateadminemail(req, res, next)
                                .then(async validemail => {
                                    return next();
                                })
                                .catch(error => {
                                    res.status(200).json(error);
                                    res.end();
                                    return;
                                });
                        }
                    });
                } else {
                    res.status(403).json({
                        message:
                            "The server understood the request but" +
                            " refuses to authorize it.!"
                    });
                    res.end();
                    return;
                }
            } else {
                res.status(403).json({
                    message:
                        "The server understood the request but" +
                        " refuses to authorize it.!"
                });
                res.end();
                return;
            }
        }
    }
}
