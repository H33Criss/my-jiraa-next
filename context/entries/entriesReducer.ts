import { EntriesState } from './';


type EntriesActionType =
    | { type: 'Entries - Open sidebar' }
    | { type: 'Entries - Close sidebar' }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        // case 'Entries - Open sidebar':
        //     return {
        //         ...state,
        //         openSideMenu: true,
        //     };


        default:
            return state;
    }
};