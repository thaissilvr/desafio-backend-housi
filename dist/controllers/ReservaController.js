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
            const body = req.body;
            // Check if the apartamento already has reserva in the checkIn and checkOut time.
            const reservas = yield Reserva_1.default.find({ nomeApartamento: body.nomeApartamento });
            if (reservas.length) {
                for (let i = 0; i < reservas.length; i++) {
                    const reserva = reservas[i];
                    const canCreateReserva = new Date(new Date(body.dataCheckin).toISOString()) > new Date(reserva.dataCheckout);
                    if (!canCreateReserva) {
                        return res.status(403).json({
                            message: `Uma reserva para o apartamento ${body.nomeApartamento} já existe na data ${body.dataCheckin}`
                        });
                    }
                }
            }
            if (body.qtdeHospedes !== body.infoHospedes.length) {
                return res.status(400).json({ message: "A quantidade de hóspedes não corresponde ao número de hóspedes cadastrados" });
            }
            try {
                const novaReserva = new Reserva_1.default(body);
                yield novaReserva.save();
                return res.status(201).json(novaReserva);
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
            yield Reserva_1.default.findOneAndRemove({ id: req.params.id });
            try {
                return res.json({ message: "Reserva deletada com sucesso!" });
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    removeTodasReservas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Reserva_1.default.deleteMany();
            try {
                return res.json({ message: "Todas as reservas foram deletadas!" });
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    dataCheckin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ltDate = new Date(req.params.dataCheckin);
                ltDate.setDate(ltDate.getDate() + 1);
                const checkIn = yield Reserva_1.default.find({
                    dataCheckin: {
                        $gte: req.params.dataCheckin,
                        $lt: ltDate,
                    },
                });
                return res.json(checkIn);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
    dataCheckout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ltDate = new Date(req.params.dataCheckout);
                ltDate.setDate(ltDate.getDate() + 1);
                const checkOut = yield Reserva_1.default.find({
                    dataCheckout: {
                        $gte: req.params.dataCheckout,
                        $lt: ltDate,
                    },
                });
                return res.json(checkOut);
            }
            catch (error) {
                return res.json({ error: error.message });
            }
        });
    }
}
exports.default = new ReservaController();
