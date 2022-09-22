import { createContext } from 'react'
import { Entries } from '../../interfaces';

interface ContextProps {
    entries: Entries[],
    addNewEntry: (description: string) => void,
    updateEntry: (Entry: Entries) => void,
}


export const EntriesContext = createContext({} as ContextProps);