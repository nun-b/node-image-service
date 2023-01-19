"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
(() => {
    const result = dotenv_1.default.config({ path: path_1.default.join(__dirname, "config", ".env") });
    if (result.parsed == undefined)
        throw new Error("Cannot loaded environment variables file.");
})();
const server = (0, express_1.default)();
server.get('/', (req, res) => {
    res.send('HOHOHO!!!');
});
server.listen(process.env.PORT, () => {
    console.log(`SERVER :: http://localhost:${process.env.PORT}`);
});
