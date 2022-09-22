import { UIState } from './';


type UIActionType =
    | { type: 'UI - Open sidebar' }
    | { type: 'UI - Close sidebar' }
    | { type: 'UI - Toggle adding', payload: boolean }
    | { type: 'UI - Toggle dragging', payload: boolean }


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
        case 'UI - Toggle adding':
            return {
                ...state,
                isAdding: !action.payload,
            };
        case 'UI - Toggle dragging':
            return {
                ...state,
                isDragging: !action.payload,
            };

        default:
            return state;
    }
};