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
    const updateEntry = async(Entry: Entries) => {
        try {
            const {data} = await entriesApi.put<Entries>(`/entries/${Entry._id}`,{
                description:Entry.description,
                status:Entry.status,
            })
            dispatch({ type: 'Entries - Update entries', payload: data });
            
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