import { Document } from "mongoose";

interface IReservas extends Document {
    nomeApartamento: String
    dataCheckin: Date
    dataCheckout: Date
    qtdeHospedes: Number
    infoHospedes: {
        nomeHospede: String
        emailHospede: String
    }
}

export default IReservas