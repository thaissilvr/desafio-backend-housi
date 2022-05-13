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
    const body = req.body

    // Check if the apartamento already has reserva in the checkIn and checkOut time.
    const reservas = await Reserva.find({nomeApartamento: body.nomeApartamento})
    
    if (reservas.length) {
      for (let i = 0; i < reservas.length; i++) {
        const reserva = reservas[i]
        const canCreateReserva = new Date(new Date(body.dataCheckin).toISOString()) > new Date(reserva.dataCheckout)

        if (!canCreateReserva) {
          return res.status(403).json({
            message: `Uma reserva para o apartamento ${body.nomeApartamento} já existe na data ${body.dataCheckin}`
          })
        }
      }
    }

    if (body.qtdeHospedes !== body.infoHospedes.length) {
      return res.status(400).json({message: "A quantidade de hóspedes não corresponde ao número de hóspedes cadastrados"})
    }

    try {
      const novaReserva = new Reserva(body);
 
        await novaReserva.save();
        return res.status(201).json(novaReserva);
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
    await Reserva.findOneAndRemove({id: req.params.id});

    try {
      return res.json({message: "Reserva deletada com sucesso!"});
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }

  public async removeTodasReservas(req: Request,res: Response): Promise<Response> {
   await Reserva.deleteMany();
    try {
      return res.json({message: "Todas as reservas foram deletadas!"});
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }

  public async dataCheckin(req: Request, res: Response): Promise<Response> {
    try {
      const ltDate = new Date(req.params.dataCheckin);
      ltDate.setDate(ltDate.getDate() + 1);
      const checkIn = await Reserva.find({
        dataCheckin: {
          $gte: req.params.dataCheckin,
          $lt: ltDate,
        },
      });
      return res.json(checkIn);
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }
  public async dataCheckout(req: Request, res: Response): Promise<Response> {
    try {
      const ltDate = new Date(req.params.dataCheckout);
      ltDate.setDate(ltDate.getDate() + 1);
      const checkOut = await Reserva.find({
        dataCheckout: {
          $gte: req.params.dataCheckout,
          $lt: ltDate,
        },
      });
      return res.json(checkOut);
    } catch (error: any) {
      return res.json({ error: error.message });
    }
  }
}

export default new ReservaController();
