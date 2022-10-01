import { FC, PropsWithChildren, useEffect, useReducer } from 'react'
import { Entries } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'
import { entriesApi } from '../../apis';

export interface EntriesState {
    entries: Entries[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}
export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);


    const refreshEntries =async() =>{
        const {data}= await entriesApi.get<Entries[]>('/entries');
        dispatch({ type: 'Entries - Load initial state', payload: data });
    }
    useEffect(() => {
      refreshEntries();
    }, [])
    

    const addNewEntry = async(description: string) => {
        const {data} = await entriesApi.post<Entries>('/entries',{description})

        dispatch({ type: 'Entries - Add new entry', payload: data });
    }
    const updateEntry = (Entry: Entries) => {
        dispatch({ type: 'Entries - Update entries', payload: Entry });
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