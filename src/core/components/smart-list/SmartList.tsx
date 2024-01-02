import styles from "./SmartList.module.css";
import { useCallback } from "react";

import { fontawesomeIcons } from "../../fontawesome.icons";

export type SmartListProps = {
    data: Array<any>,
    getLogo: (value: any)=>string,
    getText: (value: any)=>string,
    onSelect?: (data: any)=>void,
    onEdit?: (data: any)=>void,
    onDelete?: (data: any)=>void,
    style?: React.CSSProperties
};

function SmartList(props: SmartListProps)
{

    const onItemSelect = useCallback((value: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>
    {
        event.stopPropagation();
        if (props.onSelect) props.onSelect(value);

    }, [props]);


    const onItemEdit = useCallback((value: any, event: React.MouseEvent<HTMLElement, MouseEvent>)=>
    {
        event.stopPropagation();
        if (props.onEdit) props.onEdit(value);

    }, [props]);


    const onItemDelete = useCallback((value: any, index: number, event: React.MouseEvent<HTMLElement, MouseEvent>)=>
    {
        event.stopPropagation();
        if (props.onDelete) props.onDelete(value);

        props.data.splice(index, 1);

    }, [props]);


    return (
        <div
        className={`${styles.container}`}
        style={props.style}
        >
            {
                props.data.map((value: any, index: number)=>
                {
                    return (
                        <div
                        className={`${styles.list_item}`}
                        onClick={(event)=>{onItemSelect(value, event)}}
                        >
                            <div
                            className={`${styles.item_logo}`}
                            >

                                <i
                                className={`${props.getLogo(value)}`}
                                />

                            </div>

                            <div
                            className={`${styles.item_text}`}
                            >
                                <label
                                className={`${styles.text}`}
                                >
                                    {props.getText(value)}
                                </label>
                            </div>

                            {
                                props.onEdit &&

                                <div
                                className={`${styles.item_edit}`}
                                >
                                    <i
                                    className={`${fontawesomeIcons.edit} ${styles.edit}`}
                                    onClick={(event)=>onItemEdit(value, event)}
                                    />

                                </div>
                            }

                            {
                                props.onDelete &&

                                <div
                                className={`${styles.item_delete}`}
                                >
                                    <i
                                    className={`${fontawesomeIcons.delete} ${styles.delete}`}
                                    onClick={(event)=>onItemDelete(value, index, event)}
                                    />

                                </div>
                            }

                        </div>
                    );
                })
            }

        </div>
    );
}


export default SmartList;