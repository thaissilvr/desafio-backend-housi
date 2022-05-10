"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("../routes/Routes"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor() {
        this.mongoose = mongoose_1.default;
        this.uri = 'mongodb+srv://reservashotel:reserva123@reservasbd.bxry7.mongodb.net/reservasbd';
        this.express = (0, express_1.default)();
        this.middlewares();
        this.routes();
        this.database();
    }
    middlewares() {
        this.express.use(express_1.default.json());
    }
    database() {
        this.mongoose.connect(this.uri, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Conexão com MongoDB feita com sucesso!");
            }
        });
    }
    routes() {
        this.express.use(Routes_1.default);
    }
}
exports.default = new App().express;
