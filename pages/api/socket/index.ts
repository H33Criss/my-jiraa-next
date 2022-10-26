import type { NextApiRequest, NextApiResponse } from 'next'
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer, Socket } from 'socket.io'
import { Server } from 'socket.io'
import cors from 'cors'


interface SocketServer extends HTTPServer {
    io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
    server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO
}


export default async function socket(req: NextApiRequest, res: NextApiResponseWithSocket) {
    cors();
    if (res.socket.server.io) {
        console.log('Ya hay un server.')
    } else {
        console.log('Soy el server...')

        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', (socket: Socket) => {
            console.log('Alguien se conecto al server.')

            socket.on('disconnect', () => {
                console.log('Se desconecto alguien del server.')
            })
            socket.on('refreshForAll', () => {
                socket.broadcast.emit('refreshEntries');
                console.log('Se desconecto alguien del server.')
            })
        })

    }
    res.end()
}
function NextCors(req: NextApiRequest, res: NextApiResponseWithSocket, arg2: {
    // Options
    methods: string[]; origin: string; optionsSuccessStatus: number
}) {
    throw new Error('Function not implemented.')
}

