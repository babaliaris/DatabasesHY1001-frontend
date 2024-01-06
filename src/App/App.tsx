import { Outlet } from "react-router-dom";
import { FakeContext, FakeValue } from "../core/contex/FakeContext";
import NavBar from "../core/components/nav-bar/NavBar";
import { useState } from "react";
import Toolbar from "../core/components/toolbar/Toolbar";

function App()
{

  const [fakeContext, setFakeContext] = useState(FakeValue);

  const actualContext = fakeContext;

  actualContext.setContext = setFakeContext;

  return (
    <>
      <FakeContext.Provider value={actualContext}>

        <NavBar/>
        <Toolbar buttons={[]}/>
        <Outlet/>

      </FakeContext.Provider>
    </>
  )
}

export default App;
