import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "../routes/Routes";
import databaseConnect from "./databaseConnect";
class App {
  public express: express.Application;
  public mongoose = mongoose;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.database();
  }
  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }
  private database(): void {
    databaseConnect.on("error", console.error.bind("Falha na conexão"));
    databaseConnect.once("open", async () => {
      console.log("Conectado com sucesso ao mongoDB");
    });
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
