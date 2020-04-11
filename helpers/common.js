"use strict";
const env = process.env.NODE_ENV || "development";
const crypto = require("crypto");
const smspConfiguration = require('../config/smspConfig.json')[env];
const KEY_DB_PRIVATE = smspConfiguration.privatedbkey;
const IV_VECTOR = smspConfiguration.vectorkey;
const CHR_ENCODE = smspConfiguration.chrencode;
/**
 * @file /helpers/common.js
 */
module.exports = {
    /**
     * This function is used to encrypt DB values
     * @param {string} reqString
     * @return encrypted string
     */
    EncryptValue: function (reqString) {
        let encryptedString;
        let binaryEncryptionKey = Buffer.from(KEY_DB_PRIVATE);
        let binaryIV = Buffer.from(IV_VECTOR);
        let cipher = crypto.createCipheriv(
            "AES-256-CBC",
            binaryEncryptionKey,
            binaryIV
        );
        try {
            let encryptedInput =
                cipher.update(reqString, CHR_ENCODE, "hex") + cipher.final("hex");
            encryptedString = encryptedInput;
        } catch (err) {
            encryptedString = reqString;
        }
        if (encryptedString === "") {
            encryptedString = reqString;
        }
        return encryptedString;
    },
    /**
     * This function is used to decrypt DB values
     *
     * @param {string} reqString
     * @return decrypted string
     */
    DecryptValue: function (reqString) {
        let decrypted;
        let binaryEncryptionKey = Buffer.from(KEY_DB_PRIVATE);
        let binaryIV = Buffer.from(IV_VECTOR);
        let decipher = crypto.createDecipheriv(
            "AES-256-CBC",
            binaryEncryptionKey,
            binaryIV
        );
        try {
            let decryptedInput =
                decipher.update(reqString, "hex", CHR_ENCODE) +
                decipher.final(CHR_ENCODE);
            decrypted = decryptedInput;
        } catch (err) {
            decrypted = reqString;
        }
        if (decrypted === "") {
            decrypted = reqString;
        }
        return decrypted;
    }
};
