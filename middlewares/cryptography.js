"use strict";
const env = process.env.NODE_ENV || "development";
var crypto = require("crypto");
const smspConfiguration = require("../config/smspConfig.json")[env];
const KEY_PRIVATE = smspConfiguration.privatekey;
const IV_VECTOR = smspConfiguration.vectorkey;
const CHR_ENCODE = smspConfiguration.chrencode;
/**
 * @file /middlewares/cryptography.js
 */
module.exports = {
  /**
   * Payload encryption
   * <p>
   * Encrypts all payload / response back to request.
   * All response from API is encrypted based on AES-256-CBC encryption
   * standards and returned back to applications
   * </p>
   * Encryption Helper / Middleware
   *
   * @method EncryptPayload
   * @param  {object} req  the request object
   * @param  {object} res  the response object
   * @param  {object} next the next middleware
   * @return {object} JSON object with encryption payload
   */
  EncryptPayload: async function (req, res, next) {
    let encryptedInput = null;
    if (req.result === undefined) {
      req.result = {
        data: { message: "Defalut response" }
      };
    }
    let outdata = {
      result: req.result.data
    };
    if (req.result.data.errors !== undefined) {
      if (req.result.data.errors.length > 0) {
        req.result.statusBind = false;
      } else {
        req.result.statusBind = true;
      }
    }
    let encryptHeader = req.headers["smspenc"];
    let doencryption = true;
    if (encryptHeader !== undefined && env !== "production") {
      if (encryptHeader === "false" || encryptHeader === false) {
        doencryption = false;
      }
    }
    let inputKey = getsaltkey();
    if (req.result.data !== undefined && doencryption === true) {
      let binaryEncryptionKeynew = Buffer.from(KEY_PRIVATE + inputKey);
      let binaryIV = Buffer.from(IV_VECTOR);
      let cipher = crypto.createCipheriv(
        "AES-256-CBC",
        binaryEncryptionKeynew,
        binaryIV
      );
      encryptedInput =
        cipher.update(JSON.stringify(req.result.data), CHR_ENCODE, "hex") +
        cipher.final("hex");
      outdata = {
        response: encryptedInput,
        saltKey: inputKey
      };
    }
    if (req.result.statusBind === undefined) {
      req.result.statusBind = true;
    }
    if (req.result.statusCodeBind === undefined) {
      req.result.statusCodeBind = 200;
    }
    var response = {
      status: req.result.statusBind,
      statusCode: req.result.statusCodeBind,
      data: outdata
    };
    res.status(200).json(response);
    //res.end();
    response = null;
    console.log("Your result: ", req.result.data);
    //res.status(200).send(req.result);
  },
  /**
   * Payload decryption
   * <p>
   * Decrypt all payload / request
   * All requests from smsp application are
   * decrypted based on AES-256-CBC standard and return back to back-end process
   * </p>
   * Encryption Helper / Middleware
   *
   * @method DecryptPayload
   * @param  {object} req  the request object
   * @param  {object} res  the response object
   * @param  {object} next the next middleware
   * @return void decrypted payload assigned to req.body
   */
  DecryptPayload: async function (req, res, next) {
    req.languageCode = "en";
    var saltKey, result;
    var response = {
      status: false,
      statusCode: 120,
      data: {
        message:
          "Bad request / request contains empty payload / request is not decrypted properly"
      }
    };
    if (
      env === "production" &&
      req.body.data.salt === undefined &&
      req.body.data.request === undefined &&
      req.method !== "GET"
    ) {
      res.status(200).json(response);
      return;
    }
    let encryptHeader = req.headers["smspenc"];
    if (encryptHeader !== undefined) {
      if (req.body.data === undefined) {
        return next();
      }
      else if (req.body.data.request !== undefined) {
        console.log("IN DECRYPT");
        req.body = req.body.data.request;
        return next();
        //return;
      }
    }
    if (req.body.data === undefined && env !== "production") {
      next();
    }
    else if (
      (req.body.data.salt !== undefined &&
        req.body.data.request !== undefined &&
        req.method !== "GET") ||
      (req.body.data.request !== undefined && req.method !== "GET")
    ) {
      if (req.body.data.salt !== undefined) {
        saltKey = req.body.data.salt;
      } else {
        res.status(200).json(response);
        return;
      }
      if (req.body.data.request !== undefined) {
        result = req.body.data.request;
      } else {
        res.status(200).json(response);
        return;
      }
      result = result.replace(" ", "+");
      let binaryEncryptionKey = Buffer.from(KEY_PRIVATE + saltKey);
      let binaryIV = Buffer.from(IV_VECTOR);
      let decipher = crypto.createDecipheriv(
        "AES-256-CBC",
        binaryEncryptionKey,
        binaryIV
      );
      try {
        let decryptedInput =
          decipher.update(result, "hex", CHR_ENCODE) +
          decipher.final(CHR_ENCODE);
        //req.body = JSON.parse(decryptedInput);
        if (result !== undefined) {
          req.body = JSON.parse(decryptedInput);
        }
        next();
      } catch (err) {
        res.status(200).json(response);
        res.end();
      }
    } else {
      next();
    }
    console.log("before going to contoller");
  }
};
/**
 * Random string generator
 *
 * Helper function to generate salt key
 *
 * @return {string} string
 */
function getsaltkey() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
