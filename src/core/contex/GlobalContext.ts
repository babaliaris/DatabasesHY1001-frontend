import { createContext } from "react";

import { ToolbarButton } from "../components/toolbar/Toolbar";


interface GlobalContextI
{
    setContext: (value: GlobalContextI)=> void
    toolbarBtns: Array<ToolbarButton>
}

export const GlobalContextValue: GlobalContextI = {
    setContext: ()=>{},
    toolbarBtns: []
};

export const GlobalContext = createContext(GlobalContextValue);