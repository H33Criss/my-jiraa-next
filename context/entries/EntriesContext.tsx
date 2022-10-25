import { createContext } from 'react'
import { Entries } from '../../interfaces';
import { RefreshMultiple, RefreshPropertys } from './';

interface ContextProps {
    entries: Entries[],
    refreshingOne: RefreshMultiple,
    addNewEntry: (description: string) => void,
    updateEntry: (Entry: Entries) => void,
    setRefreshing: ({ }: RefreshPropertys) => void,
}


export const EntriesContext = createContext({} as ContextProps);