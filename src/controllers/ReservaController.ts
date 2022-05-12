import { Request, Response } from "express";
import Reserva from "../schemas/Reserva";

class ReservaController {
  public async listaTodasReservas(req: Request, res: Response): Promise<Response> {
    try {
      const reservas = await Reserva.find();
      console.log(reservas);
      return res.json(reservas);
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }

  public async listaReservaID(req: Request, res: Response): Promise<Response> {
    try {
      const reservaPorId = await Reserva.findOne();
      console.log(reservaPorId);
      return res.json(reservaPorId);
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }

  public async criaReserva(req: Request, res: Response): Promise<Response> {
    const novaReserva = new Reserva(req.body);
    await novaReserva.save();
    try {
      return res.json(novaReserva);
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }
  public async editaReserva(req: Request, res: Response): Promise<Response> {
    try {
      const reservaEditada = await Reserva.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.json(reservaEditada);
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }

  public async removeReserva(req: Request, res: Response): Promise<Response> {
    const reservaDeletada = await Reserva.findByIdAndDelete(req.params.id);

    try {
      return res.json(reservaDeletada);
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }

  public async removeTodasReservas(req: Request,res: Response): Promise<Response> {
    const reservasDeletadas = await Reserva.deleteMany();
    try {
      return res.json(reservasDeletadas);
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }

  public async listaPorData(req: Request, res: Response): Promise<Response> {
    try {
      const ltDate = new Date(req.params.dataCheckin);
      ltDate.setDate(ltDate.getDate() + 1);
      const reservasPorData = await Reserva.find({
        dataCheckin: {
          $gte: req.params.dataCheckin,
          $lt: ltDate,
        },
      });
      return res.json(reservasPorData);
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }
}

export default new ReservaController();
