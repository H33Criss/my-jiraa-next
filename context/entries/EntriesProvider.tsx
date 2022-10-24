import { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react'
import { Entries } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';
import { io, Socket } from 'Socket.IO-client'


export interface EntriesState {
    entries: Entries[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

let socket: Socket;
export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entries[]>('/entries');
        dispatch({ type: 'Entries - Load initial state', payload: data });
    }
    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io('http://localhost:3000')

        socket.on('connect', () => {
            console.log('Cliente conectado')
        })
        socket.on('refreshEntries', () => {
            console.log('Se estan refrescando las entries')
            refreshEntries();
        })
        socket.on('disconnect', () => {
            console.log('No hay server')
        })
    }

    useEffect(() => {
        refreshEntries();
        socketInitializer();
    }, [])


    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entries>('/entries', { description })

        dispatch({ type: 'Entries - Add new entry', payload: data });
        socket.emit('refreshForAll');
    }
    const updateEntry = async (Entry: Entries) => {
        try {
            const { data } = await entriesApi.put<Entries>(`/entries/${Entry._id}`, {
                description: Entry.description,
                status: Entry.status,
            })
            dispatch({ type: 'Entries - Update entries', payload: data });
            enqueueSnackbar('Entrada actualizada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
            socket.emit('refreshForAll');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}