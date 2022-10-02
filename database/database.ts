import mongoose from 'mongoose';



/**
 0=disconnect
 1=connected
 2=connecting
 3=disconnecting
 */
const mongooConnection = {
    statusConnect:0
}

export const connect = async () =>{

    
    if(mongooConnection.statusConnect){
        // console.log('Ya estabamos conectados')
        return;
    }
    
    // console.log(`Nro.: ${mongoose.connections.length}`)
    if(mongoose.connections.length > 0){
        mongooConnection.statusConnect = mongoose.connections[0].readyState;

        if(mongooConnection.statusConnect ===1){
            console.log('Usando conexion anterior');
            return;
        }

        await mongoose.disconnect();
        mongooConnection.statusConnect=0; //atento
    }


    await mongoose.connect(process.env.MOONGO_URL || '');
    mongooConnection.statusConnect=1;
    // console.log(`Conectado a mongoDB: ${process.env.MOONGO_URL || ''}`)
}

export const disconnect = async () =>{
    
    if (mongooConnection.statusConnect === 0) return;
    await mongoose.disconnect();
    mongooConnection.statusConnect=0; //atento
    // console.log(`Desconectado de mongoDB: ${process.env.MOONGO_URL || ''}`)
}