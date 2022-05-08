"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const infoHospedesSchema = new mongoose_1.Schema({
    nomeHospede: { type: String, required: true },
    emailHospede: { type: String, required: true },
});
const ReservaSchema = new mongoose_1.Schema({
    nomeApartamento: { type: String, required: true },
    dataCheckin: { type: Date, required: true },
    dataCheckout: { type: Date, required: true },
    qtdeHospedes: { type: Number, required: true },
    infoHospedes: infoHospedesSchema,
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Reserva", ReservaSchema);
