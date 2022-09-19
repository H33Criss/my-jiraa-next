import { createContext } from 'react'
import { Entries } from '../../interfaces';

interface ContextProps {
    entries: Entries[],
}


export const EntriesContext = createContext({} as ContextProps);