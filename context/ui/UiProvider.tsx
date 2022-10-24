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
    const setAdding = (adding:boolean) => {
        dispatch({ type: 'UI - Set adding', payload: adding });
    }
    //this does work
    const toggleDragging = (current=state.isDragging) => {
        dispatch({ type: 'UI - Toggle dragging', payload: current });
    }
    const setDragging = (dragg:boolean) => {
        dispatch({ type: 'UI - Set dragging', payload: dragg });
    }
    return (
        <UiContext.Provider value={{ ...state, openMenu, closeMenu, setAdding, toggleDragging,setDragging }}>
            {children}
        </UiContext.Provider>
    )
}