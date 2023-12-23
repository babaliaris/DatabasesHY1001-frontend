import { createBrowserRouter } from "react-router-dom";

import App from "../App/App";
import CreateUser from "../App/create-user/CreateUser";

export function getRouter()
{
    return createBrowserRouter([
    {
        path: "/", element: <App/>, children:
        [
            {path: "create-user", element: <CreateUser/>}
        ]
    }
    ]);
}