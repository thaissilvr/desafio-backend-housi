import express from "express"
import routes from "../routes/Routes";
import mongoose from "mongoose"

class App {
    public express: express.Application;
    public mongoose = mongoose
    public uri: string = 'mongodb+srv://reservashotel:reserva123@reservasbd.bxry7.mongodb.net/reservasbd';


    constructor () {
        this.express = express()
        this.middlewares()
        this.routes()
        this.database()
    }
    private middlewares(): void {
        this.express.use(express.json())
    }
    private database (): void {
        this.mongoose.connect(this.uri, (error) => {
            if(error) {
                console.log(error)
            } else {
                console.log("Conexão com MongoDB feita com sucesso!")
            }
        })
    }
    private routes(): void{
        this.express.use(routes)
    }
}


export default new App().express