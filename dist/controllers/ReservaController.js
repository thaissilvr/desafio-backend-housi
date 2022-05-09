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
const Reserva_1 = __importDefault(require("../schemas/Reserva"));
class ReservaController {
    listaTodasReservas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield Reserva_1.default.find();
            try {
                return res.json(reservas);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    criaReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const novaReserva = yield Reserva_1.default.create(req.body);
            try {
                return res.json(novaReserva);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    removeReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaDeletada = yield Reserva_1.default.findByIdAndDelete();
            try {
                return res.json(reservaDeletada);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    editaReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaEditada = yield Reserva_1.default.findByIdAndUpdate(req.params.id);
            try {
                return res.json(reservaEditada);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
}
exports.default = new ReservaController();
