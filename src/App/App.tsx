import { Outlet } from "react-router-dom";
import { FakeContext, FakeValue } from "../core/contex/FakeContext";
import NavBar from "../core/components/nav-bar/NavBar";
import { useState } from "react";
import Toolbar, { ToolbarButton } from "../core/components/toolbar/Toolbar";
import { fontawesomeIcons } from "../core/fontawesome.icons";

function App()
{

  const [fakeContext, setFakeContext] = useState(FakeValue);

  const actualContext = fakeContext;

  actualContext.setContext = setFakeContext;

  const btns: Array<ToolbarButton> = [
    {text: "Add Production", icon: fontawesomeIcons.farmer, onClick: ()=>console.log("Add Production Clicked!")},
    {text: "Add Land", icon: fontawesomeIcons.farmer, onClick: ()=>console.log("Add Land Clicked!")},
  ];

  return (
    <>
      <FakeContext.Provider value={actualContext}>

        <NavBar/>
        <Toolbar buttons={btns}/>
        <Outlet/>

      </FakeContext.Provider>
    </>
  )
}

export default App;
