import { createContext } from 'react'

interface ContextProps {
    openSideMenu: boolean,
    openMenu: () => void,
    closeMenu: () => void,
}


export const UiContext = createContext({} as ContextProps);
