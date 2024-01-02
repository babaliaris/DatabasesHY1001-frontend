import styles from "./SelectUser.module.css";
import { useEffect, useState, useContext, useCallback } from "react";

import { FakeContext } from "../../core/contex/FakeContext";
import { UserModel } from "../../core/models/types.models";
import { fontawesomeIcons } from "../../core/fontawesome.icons";
import { apiGetUsers } from "../../core/api";



function SelectUser()
{
    const fakeContext = useContext(FakeContext);
    const [users, setUsers] = useState<Array<UserModel>>([]);

    useEffect(()=>
    {
        if (import.meta.env.VITE_MOCK_API)
        {
            setUsers(fakeContext.users);
        }

        else
        {
            apiGetUsers(100).then((users: Array<UserModel>)=>
            {
                setUsers(users);
            })
            .catch((err)=>
            {
                console.log(err);
            });
        }

    }, []);



    const onUserSelected = useCallback((user: UserModel, event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>
    {
        event.stopPropagation();
        console.log(`[onUserSelected] ${JSON.stringify(user)}`);

    }, []);


    const onUserEdit = useCallback((user: UserModel, event: React.MouseEvent<HTMLElement, MouseEvent>)=>
    {
        event.stopPropagation();
        console.log(`[onUserEdit] ${JSON.stringify(user)}`);
    }, []);


    const onUserDelete = useCallback((user: UserModel, event: React.MouseEvent<HTMLElement, MouseEvent>)=>
    {
        event.stopPropagation();
        console.log(`[onUserDelete] ${JSON.stringify(user)}`);
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

                <div
                className={`${styles.list_farmers}`}
                >
                    {
                        users.map((user: UserModel)=>
                        {
                            return (
                                user.isBuyer !== true &&
                                <div
                                className={`${styles.list_item}`}
                                onClick={(event)=>onUserSelected(user, event)}
                                >
                                    <div
                                    className={`${styles.item_icon}`}
                                    >
                                        <i className={`${fontawesomeIcons.farmer}`}/>
                                    </div>

                                    <div
                                    className={`${styles.item_text}`}
                                    >
                                        <label>{`${user.name} ${user.surname}`}</label>
                                    </div>

                                    <div
                                    className={`${styles.item_edit}`}
                                    >
                                        <i
                                        className={`${fontawesomeIcons.edit}`}
                                        onClick={(event)=>onUserEdit(user, event)}
                                        />

                                    </div>

                                    <div
                                    className={`${styles.item_delete}`}
                                    >
                                        <i
                                        className={`${fontawesomeIcons.delete}`}
                                        onClick={(event)=>onUserDelete(user, event)}
                                        />

                                    </div>

                                </div>
                            );
                        })
                    }

                </div>



                <div
                className={`${styles.list_buyers}`}
                >
                    {
                        users.map((user: UserModel)=>
                        {
                            return (
                                user.isBuyer == true &&
                                <div
                                className={`${styles.list_item}`}
                                onClick={(event)=>onUserSelected(user, event)}
                                >
                                    <div
                                    className={`${styles.item_icon}`}
                                    >
                                        <i className={`${fontawesomeIcons.buyer}`}/>
                                    </div>

                                    <div
                                    className={`${styles.item_text}`}
                                    >
                                        <label>{`${user.name} ${user.surname}`}</label>
                                    </div>

                                    <div
                                    className={`${styles.item_edit}`}
                                    >
                                        <i
                                        className={`${fontawesomeIcons.edit}`}
                                        onClick={(event)=>onUserEdit(user, event)}
                                        />

                                    </div>

                                    <div
                                    className={`${styles.item_delete}`}
                                    >
                                        <i
                                        className={`${fontawesomeIcons.delete}`}
                                        onClick={(event)=>onUserDelete(user, event)}
                                        />

                                    </div>

                                </div>
                            );
                        })
                    }

                </div>

            </div>
        </div>
    );
}

export default SelectUser;