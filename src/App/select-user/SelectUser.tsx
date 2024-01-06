import styles from "./SelectUser.module.css";
import { useEffect, useState, useCallback } from "react";

import { fontawesomeIcons } from "../../core/fontawesome.icons";
import { UserModel } from "../../core/models/types.models";
import { apiGetUsers, apiDeleteUser } from "../../core/api";
import { useNavigate } from "react-router-dom";

import SmartList from "../../core/components/smart-list/SmartList";



function SelectUser()
{
    const [farmers, setFarmers] = useState<Array<UserModel>>([]);
    const [buyers, setBuyers] = useState<Array<UserModel>>([]);
    const navigate = useNavigate();

    useEffect(()=>
    {
        apiGetUsers(100).then((users: Array<UserModel>)=>
        {
            let f: Array<UserModel> = [];
            let b: Array<UserModel> = [];

            users.forEach((val: UserModel)=>
            {

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

    }, []);



    const onUserSelected = useCallback((user: UserModel)=>
    {
        navigate(`/user-profile/${user.userID}`);
    }, []);


    const onUserEdit = useCallback((user: UserModel)=>
    {
        console.log(`[onUserEdit] ${JSON.stringify(user)}`);
    }, []);


    const onUserDelete = useCallback((user: UserModel, index: number)=>
    {
        //Delete from api.
        apiDeleteUser(user);

        //Delete from the list.
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
                getText={(value: UserModel)=>`${value.name} ${value.surname}`}
                getLogo={()=> fontawesomeIcons.farmer}
                getId={(value: UserModel)=>value.userID}
                onSelect={onUserSelected}
                onEdit={onUserEdit}
                onDelete={onUserDelete}
                />

                <div className={styles.list_divider}></div>

                <SmartList
                data={buyers}
                getText={(value: UserModel)=>`${value.name} ${value.surname}`}
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