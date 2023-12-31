import { createBrowserRouter } from "react-router-dom";

import App from "../App/App";
import CreateUser from "../App/create-user/CreateUser";
import SelectUser from "../App/select-user/SelectUser";

export function getRouter()
{
    return createBrowserRouter([
    {
        path: "/", element: <App/>, children:
        [
            {path: "create-user", element: <CreateUser/>},
            {path: "select-user", element: <SelectUser/>}
        ]
    }
    ]);
}