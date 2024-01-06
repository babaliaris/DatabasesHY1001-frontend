import { UserModel, ProductionModel, LandModel } from "./models/types.models";
import { getCookie, setCookie } from "typescript-cookie";

export function apiAddUser(user: UserModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API)
    {
        let cookie_name = "users";
        let usersCookie = getCookie(cookie_name);

        let users: Array<UserModel>;

        users = usersCookie ? JSON.parse(usersCookie) : [];

        users.push(user);

        setCookie(cookie_name, JSON.stringify(users));

        return new Promise((res, rej)=>
        {
            res(true);
        });
    }

    else
    {
        return new Promise((res, rej)=>
        {
            rej("Not implemented yet!");
        });
    }
}


export function apiGetUsers(limit: number) : Promise<Array<UserModel>>
{
    if (import.meta.env.VITE_MOCK_API)
    {
        let cookie_name = "users";
        let usersCookie = getCookie(cookie_name);
        
        let users: Array<UserModel>;

        users = usersCookie ? JSON.parse(usersCookie) : [];

        return new Promise((res, rej)=>
        {
            res(users);
        });
    }


    else
    {
        return new Promise((res, rej)=>
        {
            rej("Not implemented yet!");
        });
    }
}



export function apiDeleteUser(user: UserModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API)
    {
        let cookie_name = "users";
        let usersCookie = getCookie(cookie_name);

        let users: Array<UserModel>;

        users = usersCookie ? JSON.parse(usersCookie) : [];

        users.forEach((value, index)=>
        {
            if (value.userID === user.userID)
            {
                users.splice(index, 1);
                return;
            }
        });

        setCookie(cookie_name, JSON.stringify(users));

        return new Promise((res, rej)=>
        {
            res(true);
        });
    }

    else
    {
        return new Promise((res, rej)=>
        {
            rej("Not implemented yet!");
        });
    }
}



export function apiAddProduction(production: ProductionModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API)
    {
        let cookie_name = "productions";
        let cookie      = getCookie(cookie_name);

        let productions: Array<ProductionModel>;

        productions = cookie ? JSON.parse(cookie) : [];

        productions.push(production);

        setCookie(cookie_name, JSON.stringify(productions));

        return new Promise((res, rej)=>
        {
            res(true);
        });
    }

    else
    {
        return new Promise((res, rej)=>
        {
            rej("Not implemented yet!");
        });
    }
}



export function apiGetProductions() : Promise<Array<ProductionModel>>
{
    if (import.meta.env.VITE_MOCK_API)
    {
        let cookie_name = "productions";
        let cookie      = getCookie(cookie_name);

        let productions: Array<ProductionModel>;

        productions = cookie ? JSON.parse(cookie) : [];

        return new Promise((res, rej)=>
        {
            res(productions);
        });
    }

    else
    {
        return new Promise((res, rej)=>
        {
            rej("Not implemented yet!");
        });
    }
}



export function apiDeleteProduction(production: ProductionModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API)
    {
        let cookie_name = "productions";
        let cookie = getCookie(cookie_name);

        let productions: Array<ProductionModel>;

        productions = cookie ? JSON.parse(cookie) : [];

        productions.forEach((value, index)=>
        {
            if (value.id === production.id)
            {
                productions.splice(index, 1);
                return;
            }
        });

        setCookie(cookie_name, JSON.stringify(productions));

        return new Promise((res, rej)=>
        {
            res(true);
        });
    }

    else
    {
        return new Promise((res, rej)=>
        {
            rej("Not implemented yet!");
        });
    }
}



export function apiAddLand(land: LandModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API)
    {
        let cookie_name = "lands";
        let cookie      = getCookie(cookie_name);

        let lands: Array<LandModel>;

        lands = cookie ? JSON.parse(cookie) : [];

        lands.push(land);

        setCookie(cookie_name, JSON.stringify(lands));

        return new Promise((res, rej)=>
        {
            res(true);
        });
    }

    else
    {
        return new Promise((res, rej)=>
        {
            rej("Not implemented yet!");
        });
    }
}



export function apiGetLands() : Promise<Array<LandModel>>
{
    if (import.meta.env.VITE_MOCK_API)
    {
        let cookie_name = "lands";
        let cookie      = getCookie(cookie_name);

        let lands: Array<LandModel>;

        lands = cookie ? JSON.parse(cookie) : [];

        return new Promise((res, rej)=>
        {
            res(lands);
        });
    }

    else
    {
        return new Promise((res, rej)=>
        {
            rej("Not implemented yet!");
        });
    }
}



export function apiDeleteLand(land: ProductionModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API)
    {
        let cookie_name = "lands";
        let cookie = getCookie(cookie_name);

        let lands: Array<LandModel>;

        lands = cookie ? JSON.parse(cookie) : [];

        lands.forEach((value, index)=>
        {
            if (value.id === land.id)
            {
                lands.splice(index, 1);
                return;
            }
        });

        setCookie(cookie_name, JSON.stringify(lands));

        return new Promise((res, rej)=>
        {
            res(true);
        });
    }

    else
    {
        return new Promise((res, rej)=>
        {
            rej("Not implemented yet!");
        });
    }
}