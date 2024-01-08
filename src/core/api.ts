import { UserModel, ProductionModel, LandModel, IncomeModel, OutcomeModel } from "./models/types.models";
import { getCookie, setCookie } from "typescript-cookie";

export function apiAddUser(user: UserModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
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
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/add_user?isBuyer=${user.isBuyer}`,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( user )
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}


export function apiGetUsers(farmer: boolean) : Promise<Array<UserModel>>
{
    if (import.meta.env.VITE_MOCK_API === "true")
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
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/get_all_users?farmer=${farmer}`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}



export function apiGetUser(userID: number) : Promise<UserModel>
{
    if (import.meta.env.VITE_MOCK_API === "true")
    {
        let cookie_name = "users";
        let usersCookie = getCookie(cookie_name);
        
        let users: Array<UserModel>;
        let user: UserModel;

        users = usersCookie ? JSON.parse(usersCookie) : [];

        users.forEach((value)=>
        {
            if (value.userID === userID)
            {
                user = value;
                return;
            }
        });

        return new Promise((res, rej)=>
        {
            res(user);
        });
    }


    else
    {
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/get_user?farmerId=${userID}`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}



export function apiDeleteUser(user: UserModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
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



export function apiAddProduction(userId: number, production: ProductionModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
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
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/add_production?farmerId=${userId}`,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( production )
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}



export function apiGetProductions(userId: number) : Promise<Array<ProductionModel>>
{
    if (import.meta.env.VITE_MOCK_API === "true")
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
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/get_all_productions?farmerId=${userId}`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}



export function apiGetProduction(userId: number, productionId: number) : Promise<ProductionModel>
{
    if (import.meta.env.VITE_MOCK_API === "true")
    {
        let cookie_name = "productions";
        let cookie      = getCookie(cookie_name);

        let productions: Array<ProductionModel>;
        let production: ProductionModel;

        productions = cookie ? JSON.parse(cookie) : [];

        productions.forEach((value)=>
        {

            if (value.id === productionId)
            {
                production = value;
                return;
            }

        });

        return new Promise((res, rej)=>
        {
            res(production);
        });
    }

    else
    {
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/get_production?productionId=${productionId}`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}



export function apiDeleteProduction(userId: number, production: ProductionModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
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



export function apiAddLand(userId: number, land: LandModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
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
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/add_land?farmerId=${userId}`,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( land )
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}



export function apiGetLands(userId: number) : Promise<Array<LandModel>>
{
    if (import.meta.env.VITE_MOCK_API === "true")
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
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/get_all_lands?farmerId=${userId}`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}



export function apiDeleteLand(userId: number, land: LandModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
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





export function apiAddIncome(userId: number, productionId: number, income: IncomeModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
    {
        let cookie_name = "incomes";
        let cookie      = getCookie(cookie_name);

        let incomes: Array<IncomeModel>;

        incomes = cookie ? JSON.parse(cookie) : [];

        incomes.push(income);

        setCookie(cookie_name, JSON.stringify(incomes));

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



export function apiGetIncomes(userId: number, productionId: number) : Promise<Array<IncomeModel>>
{
    if (import.meta.env.VITE_MOCK_API === "true")
    {
        let cookie_name = "incomes";
        let cookie      = getCookie(cookie_name);

        let incomes: Array<IncomeModel>;

        incomes = cookie ? JSON.parse(cookie) : [];

        return new Promise((res, rej)=>
        {
            res(incomes);
        });
    }

    else
    {
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/get_all_incomes?productionId=${productionId}`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}



export function apiDeleteIncome(userId: number, productionId: number, income: IncomeModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
    {
        let cookie_name = "incomes";
        let cookie = getCookie(cookie_name);

        let incomes: Array<IncomeModel>;

        incomes = cookie ? JSON.parse(cookie) : [];

        incomes.forEach((value, index)=>
        {
            if (value.id === income.id)
            {
                incomes.splice(index, 1);
                return;
            }
        });

        setCookie(cookie_name, JSON.stringify(incomes));

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






export function apiAddOutcome(userId: number, productionId: number, outcome: OutcomeModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
    {
        let cookie_name = "outcomes";
        let cookie      = getCookie(cookie_name);

        let outcomes: Array<OutcomeModel>;

        outcomes = cookie ? JSON.parse(cookie) : [];

        outcomes.push(outcome);

        setCookie(cookie_name, JSON.stringify(outcomes));

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



export function apiGetOutcomess(userId: number, productionId: number) : Promise<Array<OutcomeModel>>
{
    if (import.meta.env.VITE_MOCK_API === "true")
    {
        let cookie_name = "outcomes";
        let cookie      = getCookie(cookie_name);

        let outcomes: Array<OutcomeModel>;

        outcomes = cookie ? JSON.parse(cookie) : [];

        return new Promise((res, rej)=>
        {
            res(outcomes);
        });
    }

    else
    {
        return new Promise(async (res, rej)=>
        {
            try
            {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/get_all_outcomes?productionId=${productionId}`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                });
                
                const data = await response.json();

                if (response.ok)
                {
                    res(data);
                }
                
                else
                {
                    rej(data);
                }
            }

            catch(err)
            {
                rej(err);
            }
        });
    }
}



export function apiDeleteOutcome(userId: number, productionId: number, outcome: OutcomeModel) : Promise<boolean>
{
    if (import.meta.env.VITE_MOCK_API === "true")
    {
        let cookie_name = "outcomes";
        let cookie = getCookie(cookie_name);

        let outcomes: Array<OutcomeModel>;

        outcomes = cookie ? JSON.parse(cookie) : [];

        outcomes.forEach((value, index)=>
        {
            if (value.id === outcome.id)
            {
                outcomes.splice(index, 1);
                return;
            }
        });

        setCookie(cookie_name, JSON.stringify(outcomes));

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