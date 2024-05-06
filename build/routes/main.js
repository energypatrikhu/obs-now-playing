"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_path_1 = require("node:path");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.sendFile('index.min.html', { root: (0, node_path_1.join)(__dirname, '../static') });
});
exports.default = router;
