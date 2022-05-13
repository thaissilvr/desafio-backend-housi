require("dotenv").config( {path: "././.env" } )
import mongoose from "mongoose";
const DB_uri: string =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@reservasbd.bxry7.mongodb.net/reservasbd`;


mongoose.connect(DB_uri, (error) => {
    if(error) {
        console.log(error)
    } 
})

const databaseConnect = mongoose.connection;


export default databaseConnect