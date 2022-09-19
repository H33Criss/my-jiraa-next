import { FC, PropsWithChildren, useReducer } from 'react'
import { UiContext, uiReducer } from './'

export interface UIState {
    openSideMenu: boolean,
}

const UI_INITIAL_STATE: UIState = {
    openSideMenu: false,
}
export const UiProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openMenu = () => {
        dispatch({ type: 'UI - Open sidebar' });
    }
    const closeMenu = () => {
        dispatch({ type: 'UI - Close sidebar' });
    }
    return (
        <UiContext.Provider value={{ ...state, openMenu, closeMenu }}>
            {children}
        </UiContext.Provider>
    )
}