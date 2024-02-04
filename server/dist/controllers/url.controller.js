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
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLController = void 0;
const services_1 = require("../services");
exports.URLController = {
    shortenURL: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { longURL } = req.body;
            if (!longURL) {
                return res.status(400).json({ error: 'Long URL is required' });
            }
            const url = yield services_1.URLService.findOrCreate(longURL);
            return res.status(200).json({ shortenedURL: encodeURI(`${process.env.HOST_URL}/${url.shortKey}`) });
        }
        catch (error) {
            console.error('Error shortening URL:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }),
    redirectToOriginalURL: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { shortKey } = req.params;
            if (!shortKey) {
                return res.status(400).json({ error: 'Short key is required' });
            }
            const url = yield services_1.URLService.findOne(shortKey);
            if (!url) {
                return res.status(404).json({ error: 'URL not found' });
            }
            return res.redirect(url.longURL);
        }
        catch (error) {
            console.error('Error retrieving shortened URL:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }),
};
//# sourceMappingURL=url.controller.js.map