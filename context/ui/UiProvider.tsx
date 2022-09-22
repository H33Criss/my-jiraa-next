import { FC, PropsWithChildren, useReducer } from 'react'
import { UiContext, uiReducer } from './'

export interface UIState {
    openSideMenu: boolean,
    isAdding: boolean,
    isDragging: boolean,
}

const UI_INITIAL_STATE: UIState = {
    openSideMenu: false,
    isAdding: false,
    isDragging: false,
}
export const UiProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openMenu = () => {
        dispatch({ type: 'UI - Open sidebar' });
    }
    const closeMenu = () => {
        dispatch({ type: 'UI - Close sidebar' });
    }
    const toggleAdding = () => {
        dispatch({ type: 'UI - Toggle adding', payload: state.isAdding });
    }
    const toggleDragging = () => {
        dispatch({ type: 'UI - Toggle dragging', payload: state.isDragging });
    }
    return (
        <UiContext.Provider value={{ ...state, openMenu, closeMenu, toggleAdding, toggleDragging }}>
            {children}
        </UiContext.Provider>
    )
}