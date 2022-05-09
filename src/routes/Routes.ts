import { Router } from "express";
import ReservaController from "../controllers/ReservaController";


const routes = Router()

routes
.get("/reservas", ReservaController.listaTodasReservas)
.post("/reservas", ReservaController.criaReserva)
.put("/reservas/:id", ReservaController.editaReserva)
.delete("/reservas/:id", ReservaController.removeReserva)

export default routes