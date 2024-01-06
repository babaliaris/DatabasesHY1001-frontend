import styles from "./Toolbar.module.css";

import { getRandomID } from "../../unilities";


export type ToolbarButton = {
    text?: string,
    icon: string,
    onClick: ()=>void
};

export type ToolbarProps = {
    buttons: Array<ToolbarButton>,
    style?: React.CSSProperties
};

function Toolbar(props: ToolbarProps)
{
    return(
        <div
        className={`${styles.container} bg-secondary`}
        style={props.style}
        >
            {
                props.buttons.map((btn: ToolbarButton)=>
                {
                    return (
                        <div
                        className={`${styles.item_column}`}
                        key={getRandomID()}
                        >
                            <button
                            className={`btn btn-primary`}
                            onClick={()=>btn.onClick()}
                            >
                                {btn.icon && <i className={`${styles.btn_icon} ${btn.icon}`}/>}
                                {btn.text && btn.text}

                            </button>
                        </div>
                    );
                })
            }

        </div>
    );
}

export default Toolbar;