import { UserModel } from "./models/types.models";

export function apiAddUser(user: UserModel) : Promise<boolean>
{
    return new Promise((res, rej)=>
    {
        rej("Not implemented yet!");
    });
}


export function apiGetUsers(limit: number) : Promise<Array<UserModel>>
{
    return new Promise((res, rej)=>
    {
        rej("Not implemented yet!");
    });
}