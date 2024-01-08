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
        //Get farmers
        apiGetUsers(true).then((f: Array<UserModel>)=>
        {
            setFarmers(f);
        })
        .catch((err)=>
        {
            console.log(err);
        });


        //Get buyers.
        apiGetUsers(false).then((b: Array<UserModel>)=>
        {
            setBuyers(b);
        })
        .catch((err)=>
        {
            console.log(err);
        });

    }, []);



    const onUserSelected = useCallback((user: UserModel)=>
    {   
        if (user.isBuyer) navigate(`/buyer-profile/${user.userID}`);

        else navigate(`/farmer-profile/${user.userID}`);
        
    }, []);


    const onUserEdit = useCallback((user: UserModel)=>
    {
        console.log(`[onUserEdit] ${JSON.stringify(user)}`);
    }, []);


    const onUserDelete = useCallback((user: UserModel)=>
    {
        //Delete from api.
        apiDeleteUser(user).then(()=>
        {

        }).catch((err)=>
        {
            console.error(err);
        });

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
                getText={(value: UserModel)=>JSON.stringify(value)}
                getLogo={()=> fontawesomeIcons.farmer}
                getId={(value: UserModel)=>value.userID}
                onSelect={onUserSelected}
                onEdit={onUserEdit}
                onDelete={onUserDelete}
                />

                <div className={styles.list_divider}></div>

                <SmartList
                data={buyers}
                getText={(value: UserModel)=>JSON.stringify(value)}
                getLogo={()=> fontawesomeIcons.buyer}
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