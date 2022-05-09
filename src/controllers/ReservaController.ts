import { Request, Response } from "express";
import Reserva from "../schemas/Reserva"

class ReservaController{
    public async listaTodasReservas(req: Request, res: Response): Promise<Response> {
       const reservas = await Reserva.find()
       try {
        return res.json(reservas)
       } catch (error: any) {
        return res.json({error: error.message})
       }
    }

    public async criaReserva(req: Request, res: Response): Promise<Response> {
        const novaReserva = await Reserva.create(req.body)

        try {
            return res.json(novaReserva)
        } catch (error: any) {
            return res.json({error: error.message})
        }
    }

    public async removeReserva(req: Request, res: Response): Promise<Response> {
        const reservaDeletada = await Reserva.findByIdAndDelete()

        try {
          return res.json(reservaDeletada)
        } catch (error: any) {
            return res.json({error: error.message})
        }
    }
    public async editaReserva(req: Request, res: Response): Promise<Response> {
        const reservaEditada = await Reserva.findByIdAndUpdate(req.params.id)

        try {
            return res.json(reservaEditada)
        } catch (error: any) {
            return res.json({error: error.message})
        }
    }

}

export default new ReservaController()