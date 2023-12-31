import { createContext } from "react";

import { UserModel, ProductionModel } from "../models/types.models";


interface FakeContextInterface
{
    setContext: (value: FakeContextInterface)=> void;
    users: Array<UserModel>
    productions: Array<ProductionModel>
}

export const FakeValue: FakeContextInterface = {
    setContext: ()=>{},
    users: [],
    productions: []
};

export const FakeContext = createContext(FakeValue);