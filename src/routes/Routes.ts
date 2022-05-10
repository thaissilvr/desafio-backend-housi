import { Router } from "express";
import ReservaController from "../controllers/ReservaController";


const routes = Router()


routes
.get("/reservas", ReservaController.listaTodasReservas)
.get("/reservas/:id", ReservaController.listaReservaID)
.post("/reservas", ReservaController.criaReserva)
.put("/reservas/:id", ReservaController.editaReserva)
.delete("/reservas/:id", ReservaController.removeReserva)
.delete("/reservas", ReservaController.removeTodasReservas)

export default routes