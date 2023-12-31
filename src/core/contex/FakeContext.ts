import { createContext } from "react";

import { UserModel, ProductionModel } from "../models/types.models";


interface FakeContextInterface
{
    users: Array<UserModel>
    productions: Array<ProductionModel>
}

export const FakeValue: FakeContextInterface = {
    users: [],
    productions: []
};

export const FakeContext = createContext(FakeValue);