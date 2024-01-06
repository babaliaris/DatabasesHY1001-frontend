import { Outlet } from "react-router-dom";
import { GlobalContext, GlobalContextValue } from "../core/contex/GlobalContext";
import NavBar from "../core/components/nav-bar/NavBar";
import { useState } from "react";
import Toolbar from "../core/components/toolbar/Toolbar";


function App()
{

  const [globalContext, setGlobalContext] = useState(GlobalContextValue);

  const actualContext       = globalContext;
  actualContext.setContext  = setGlobalContext;

  return (
    <>
        <GlobalContext.Provider value={actualContext}>
          <NavBar/>
          <Toolbar buttons={actualContext.toolbarBtns}/>
          <Outlet/>
        </GlobalContext.Provider>

    </>
  )
}

export default App;
