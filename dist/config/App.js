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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("../routes/Routes"));
const databaseConnect_1 = __importDefault(require("./databaseConnect"));
class App {
    constructor() {
        this.mongoose = mongoose_1.default;
        this.express = (0, express_1.default)();
        this.middlewares();
        this.routes();
        this.database();
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use((0, cors_1.default)());
    }
    database() {
        databaseConnect_1.default.on("error", console.error.bind("Falha na conexão"));
        databaseConnect_1.default.once("open", () => __awaiter(this, void 0, void 0, function* () {
            console.log("Conectado com sucesso ao mongoDB");
        }));
    }
    routes() {
        this.express.use(Routes_1.default);
    }
}
exports.default = new App().express;
