import styles from "./Toolbar.module.css";


export type ToolbarButton = {
    text: string,
    tooltip: string,
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
            Toolbar Works!
        </div>
    );
}

export default Toolbar;