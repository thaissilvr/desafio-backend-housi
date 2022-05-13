import mongoose from "mongoose";
const DB_uri: string = 'mongodb+srv://reservashotel:reserva123@reservasbd.bxry7.mongodb.net/reservasbd';

mongoose.connect(DB_uri, (error) => {
    if(error) {
        console.log(error)
    } 
})

const databaseConnect = mongoose.connection;


export default databaseConnect