import { FC, PropsWithChildren, useReducer } from 'react'
import { Entries } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'
import { v4 as uuidv4, v4 } from 'uuid';

export interface EntriesState {
    entries: Entries[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: '2Consequat nostrud consequat deserunt nulla enim.',
            status: 'pending',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: '1Consequat nostrud consequat deserunt nulla enim.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
        {
            _id: uuidv4(),
            description: '3Consequat nostrud consequat deserunt nulla enim.',
            status: 'in-progress',
            createdAt: Date.now(),
        }
    ],
}
export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    return (
        <EntriesContext.Provider value={{ ...state }}>
            {children}
        </EntriesContext.Provider>
    )
}