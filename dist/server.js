"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./config/App"));
const port = 5000;
App_1.default.listen(port, () => console.log(`App listening on port ${port}`));
