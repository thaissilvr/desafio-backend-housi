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
            try {
                const reservas = yield Reserva_1.default.find();
                console.log(reservas);
                return res.json(reservas);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    listaReservaID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservaPorId = yield Reserva_1.default.findOne();
                console.log(reservaPorId);
                return res.json(reservaPorId);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    criaReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const novaReserva = new Reserva_1.default(req.body);
            yield novaReserva.save();
            try {
                return res.json(novaReserva);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    editaReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservaEditada = yield Reserva_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.json(reservaEditada);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    removeReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservaDeletada = yield Reserva_1.default.findByIdAndDelete(req.params.id);
            try {
                return res.json(reservaDeletada);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    removeTodasReservas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservasDeletadas = yield Reserva_1.default.deleteMany();
            try {
                return res.json(reservasDeletadas);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    listaPorData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservaPorData = yield Reserva_1.default.find({ dataCheckin: Date });
                return res.json(reservaPorData);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
}
exports.default = new ReservaController();
