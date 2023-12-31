import { createBrowserRouter, redirect } from "react-router-dom";

import App from "../App/App";
import CreateUser from "../App/create-user/CreateUser";
import SelectUser from "../App/select-user/SelectUser";
import Welcome from "../App/welcome/Welcome";

export function getRouter()
{
    return createBrowserRouter([
        {
            path: "/", element: <App/>, children:
            [
                {path: "welcome", element: <Welcome/>},
                {path: "create-user", element: <CreateUser/>},
                {path: "select-user", element: <SelectUser/>},
                {path: "/", loader: ()=>redirect("/welcome")}
            ]
            
        }
    ]);
}