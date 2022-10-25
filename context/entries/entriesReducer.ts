import { Entries } from '../../interfaces';
import { EntriesState } from './';


type EntriesActionType =
    | { type: 'Entries - Add new entry', payload: Entries }
    | { type: 'Entries - Update entries', payload: Entries }
    | { type: 'Entries - Load initial state', payload: Entries[] }
    | { type: 'Entries - Set Refreshing all', payload: boolean }
    | { type: 'Entries - Set Refreshing Pending', payload: boolean }
    | { type: 'Entries - Set Refreshing Finish', payload: boolean }
    | { type: 'Entries - Set Refreshing in-progress', payload: boolean }
// | { type: 'Entries - Close sidebar' }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case 'Entries - Add new entry':
            return {
                ...state,
                entries: [...state.entries, action.payload],
            };
        case 'Entries - Update entries':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            };
        case 'Entries - Load initial state':
            return {
                ...state,
                entries: [...action.payload],
            }
        case 'Entries - Set Refreshing all':
            return {
                ...state,
                refreshingOne: {
                    refreshFinish: action.payload,
                    refreshPending: action.payload,
                    refreshProgress: action.payload,
                },
            }
        case 'Entries - Set Refreshing Pending':
            return {
                ...state,
                refreshingOne: {
                    ...state.refreshingOne,
                    refreshPending: action.payload,
                },
            }
        case 'Entries - Set Refreshing Finish':
            return {
                ...state,
                refreshingOne: {
                    ...state.refreshingOne,
                    refreshFinish: action.payload,
                },
            }
        case 'Entries - Set Refreshing in-progress':
            return {
                ...state,
                refreshingOne: {
                    ...state.refreshingOne,
                    refreshProgress: action.payload,
                },
            }


        default:
            return state;
    }
};