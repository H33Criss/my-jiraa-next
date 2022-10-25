import { FC, PropsWithChildren, useEffect, useReducer } from 'react'
import { Entries } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';
import { io, Socket } from 'Socket.IO-client'
import { EntryStatus } from '../../interfaces/entries';



export interface EntriesState {
    entries: Entries[],
    refreshingOne: RefreshMultiple,
}
export interface RefreshMultiple {
    refreshPending: boolean,
    refreshProgress: boolean,
    refreshFinish: boolean,
}

export interface RefreshPropertys {
    refreshingAll?: boolean,
    entrylist?: EntryStatus,
    individualValue?: boolean
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
    refreshingOne: {
        refreshPending: false,
        refreshProgress: false,
        refreshFinish: false,
    },
}

let socket: Socket;
export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {


    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const refreshEntries = async (firstload = false) => {
        firstload && setRefreshing({ refreshingAll: true });
        const { data } = await entriesApi.get<Entries[]>('/entries');
        dispatch({ type: 'Entries - Load initial state', payload: data });
        firstload && setRefreshing({ refreshingAll: false });
    }
    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io('http://localhost:3000')

        socket.on('connect', () => {
            // console.log('Cliente conectado')
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
        refreshEntries(true);
        socketInitializer();
    }, [])

    const setRefreshing = ({ refreshingAll, individualValue, entrylist }: RefreshPropertys) => {
        if (refreshingAll !== undefined) return dispatch({ type: 'Entries - Set Refreshing all', payload: refreshingAll! });

        if (entrylist === 'finished') return dispatch({ type: 'Entries - Set Refreshing Finish', payload: individualValue! });
        if (entrylist === 'pending') return dispatch({ type: 'Entries - Set Refreshing Pending', payload: individualValue! });
        if (entrylist === 'in-progress') return dispatch({ type: 'Entries - Set Refreshing in-progress', payload: individualValue! });

    }
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
            setRefreshing({ refreshingAll: false });
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
            setRefreshing,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}