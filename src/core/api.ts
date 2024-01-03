import { UserModel } from "./models/types.models";
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