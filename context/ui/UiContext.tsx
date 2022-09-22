import { createContext } from 'react'

interface ContextProps {
    openSideMenu: boolean,
    isAdding: boolean,
    isDragging: boolean,
    openMenu: () => void,
    closeMenu: () => void,
    toggleAdding: () => void,
    toggleDragging: () => void,
}


export const UiContext = createContext({} as ContextProps);
