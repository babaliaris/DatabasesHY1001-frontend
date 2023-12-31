import { Outlet } from "react-router-dom";
import { FakeContext, FakeValue } from "../core/contex/FakeContext";
import NavBar from "../core/components/nav-bar/NavBar";

function App() {

  return (
    <>
      <FakeContext.Provider value={FakeValue}>

        <NavBar/>
        <Outlet/>

      </FakeContext.Provider>
    </>
  )
}

export default App;
