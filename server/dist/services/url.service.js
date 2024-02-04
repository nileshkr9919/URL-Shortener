"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortKey = exports.URLService = void 0;
const url_model_1 = require("../models/url.model");
const crypto_1 = __importDefault(require("crypto"));
exports.URLService = {
    findOrCreate: (longURL) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let url = yield url_model_1.URLModel.findOne({ longURL });
            if (!url) {
                const shortKey = generateShortKey(longURL);
                url = yield url_model_1.URLModel.create({ longURL, shortKey });
            }
            return url;
        }
        catch (error) {
            throw new Error(`Error in findOrCreate: ${error.message}`);
        }
    }),
    findOne: (shortKey) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return url_model_1.URLModel.findOne({ shortKey });
        }
        catch (error) {
            throw new Error(`Error in findOne: ${error.message}`);
        }
    }),
};
function generateHash(longURL) {
    const hash = crypto_1.default.createHash('sha256');
    hash.update(longURL);
    return hash.digest('hex');
}
function base62Encode(value, length) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (value > 0 && result.length < length) {
        result = characters.charAt(value % 62) + result;
        value = Math.floor(value / 62);
    }
    return result;
}
function generateShortKey(longURL) {
    const hashValue = generateHash(longURL);
    const numericValue = parseInt(hashValue, 16);
    return base62Encode(numericValue, 10);
}
exports.generateShortKey = generateShortKey;
//# sourceMappingURL=url.service.js.map