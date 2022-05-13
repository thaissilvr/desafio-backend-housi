"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DB_uri = 'mongodb+srv://reservashotel:reserva123@reservasbd.bxry7.mongodb.net/reservasbd';
mongoose_1.default.connect(DB_uri, (error) => {
    if (error) {
        console.log(error);
    }
});
const databaseConnect = mongoose_1.default.connection;
exports.default = databaseConnect;
