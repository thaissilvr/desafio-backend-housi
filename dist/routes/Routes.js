"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReservaController_1 = __importDefault(require("../controllers/ReservaController"));
const routes = (0, express_1.Router)();
routes
    .get("/reservas", ReservaController_1.default.listaTodasReservas)
    .post("/reservas", ReservaController_1.default.criaReserva)
    .put("/reservas/:id", ReservaController_1.default.editaReserva)
    .delete("/reservas/:id", ReservaController_1.default.removeReserva);
exports.default = routes;
