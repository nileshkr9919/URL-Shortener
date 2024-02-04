"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/:shortKey', controllers_1.URLController.redirectToOriginalURL);
router.post('/', controllers_1.URLController.shortenURL);
//# sourceMappingURL=url.route.js.map