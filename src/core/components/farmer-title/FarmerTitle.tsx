import styles from "./FarmerTitle.module.css";

export type FarmerTitleProps = {
    title: string,
    style?: React.CSSProperties
};

function FarmerTitle(props: FarmerTitleProps)
{
    return (
        <div
        className={`${styles.container}`}
        style={props.style}
        >
            <label
            className={`${styles.title} bg-primary`}
            >
                {props.title}
            </label>
        </div>
    );
}


export default FarmerTitle;