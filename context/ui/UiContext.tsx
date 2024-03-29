import { createContext } from 'react'

interface ContextProps {
    openSideMenu: boolean,
    isAdding: boolean,
    isDragging: boolean,
    openMenu: () => void,
    closeMenu: () => void,
    setAdding: (adding:boolean) => void,
    toggleDragging: (current?:boolean) => void,
    setDragging: (dragg:boolean) => void,
}


export const UiContext = createContext({} as ContextProps);
