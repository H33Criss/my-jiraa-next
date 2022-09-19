import { UIState } from './';


type UIActionType =
    | { type: 'UI - Open sidebar' }
    | { type: 'UI - Close sidebar' }


export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case 'UI - Open sidebar':
            return {
                ...state,
                openSideMenu: true,
            };
        case 'UI - Close sidebar':
            return {
                ...state,
                openSideMenu: false,
            };

        default:
            return state;
    }
};