import { Outlet } from "react-router-dom";
import NavBar from "../core/components/nav-bar/NavBar";

function App() {

  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default App;
