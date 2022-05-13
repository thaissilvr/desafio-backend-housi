import mongoose, { Schema, model } from "mongoose";
import IReservas from "../models/Reserva";

const infoHospedesSchema = new Schema({
  nomeHospede: { type: String, required: true },
  emailHospede: { type: String, required: true },
});

const ReservaSchema = new Schema(
  {
    nomeApartamento: { type: String, required: true },
    dataCheckin: { type: Date, required: true },
    dataCheckout: { type: Date, required: true },
    qtdeHospedes: { type: Number, required: true },
    infoHospedes: [infoHospedesSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IReservas>("Reserva", ReservaSchema);
