import styles from "./SelectUser.module.css";
import { useEffect, useState, useContext, useCallback } from "react";

import { fontawesomeIcons } from "../../core/fontawesome.icons";
import { FakeContext } from "../../core/contex/FakeContext";
import { UserModel } from "../../core/models/types.models";
import { apiGetUsers } from "../../core/api";
import { getRandomID } from "../../core/unilities";

import SmartList from "../../core/components/smart-list/SmartList";



function SelectUser()
{
    const fakeContext = useContext(FakeContext);
    const [farmers, setFarmers] = useState<Array<UserModel>>([]);
    const [buyers, setBuyers] = useState<Array<UserModel>>([]);

    useEffect(()=>
    {
        if (import.meta.env.VITE_MOCK_API)
        {
            let f: Array<UserModel> = [];
            let b: Array<UserModel> = [];

            fakeContext.users.forEach((val: UserModel)=>
            {
                val.userID = getRandomID();

                if (val.isBuyer)
                {
                    b.push(val);
                }

                else
                {
                    f.push(val);
                }
            });

            setFarmers(f);
            setBuyers(b);
        }

        else
        {
            apiGetUsers(100).then((val: Array<UserModel>)=>
            {
                let f: Array<UserModel> = [];
                let b: Array<UserModel> = [];

                fakeContext.users.forEach((val: UserModel)=>
                {
                    val.userID = getRandomID();

                    if (val.isBuyer)
                    {
                        b.push(val);
                    }

                    else
                    {
                        f.push(val);
                    }
                });

                setFarmers(f);
                setBuyers(b);
            })
            .catch((err)=>
            {
                console.log(err);
            });
        }

    }, []);



    const onUserSelected = useCallback((user: UserModel)=>
    {
        console.log(`[onUserSelected] ${JSON.stringify(user)}`);

    }, []);


    const onUserEdit = useCallback((user: UserModel)=>
    {
        console.log(`[onUserEdit] ${JSON.stringify(user)}`);
    }, []);


    const onUserDelete = useCallback((user: UserModel, index: number)=>
    {
        console.log(`[onUserDelete] ${JSON.stringify(user)}`);

        //Delete fomr the list.
        if (user.isBuyer)
        {
            setBuyers((oldValue: Array<UserModel>)=>
            {
                oldValue.splice(index, 1);
                return [...oldValue];
            });
        }

        //Delete from the list.
        else
        {
            setFarmers((oldValue: Array<UserModel>)=>
            {
                oldValue.splice(index, 1);
                return [...oldValue];

            });
        }

        //TODO Delete form the database using api.

    }, []);


    return (

        <div
        className={`${styles.container}`}
        >   
            <div
            className={`${styles.list_titles}`}
            >
                <div
                    className={`${styles.list_title}`}
                    >
                        <label className={`${styles.title} bg-primary`}>Αγρότες</label>
                </div>

                <div
                    className={`${styles.list_title}`}
                    >
                        <label className={`${styles.title} bg-primary`}>Αγοραστές</label>
                </div>
            </div>

            <div
            className={`${styles.lists_container}`}
            >

                <SmartList
                data={farmers}
                getText={(value: UserModel)=>value.surname}
                getLogo={()=> fontawesomeIcons.farmer}
                getId={(value: UserModel)=>value.userID}
                onSelect={onUserSelected}
                onEdit={onUserEdit}
                onDelete={onUserDelete}
                />

                <SmartList
                data={buyers}
                getText={(value: UserModel)=>value.surname}
                getLogo={()=> fontawesomeIcons.farmer}
                getId={(value: UserModel)=>value.userID}
                onSelect={onUserSelected}
                onEdit={onUserEdit}
                onDelete={onUserDelete}
                />

            </div>
        </div>
    );
}

export default SelectUser;