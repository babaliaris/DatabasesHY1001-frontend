import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

export type ModalProps = {
    title?: string
    closeBtn?: string
    onClose: ()=>void
};

function Modal(props: React.PropsWithChildren<ModalProps>)
{

    return (
        <>
        {
            createPortal(
            <div
            className={`${styles.container}`}
            >
                <div
                className={`${styles.modal_body}`}
                >
                    { props.title &&
                        <div
                        className={`${styles.modal_title}`}
                        >
                            <label
                            className={`${styles.title}`}
                            >
                                {props.title}
                            </label>
                        </div>
                    }

                    <div
                    className={`${styles.modal_content}`}
                    >
                        {props.children}

                    </div>
                    
                    { props.closeBtn &&
                        <div
                        className={`${styles.modal_footer}`}
                        >
                            <button
                            className={`${styles.close_btn} btn btn-primary`}
                            onClick={props.onClose}
                            >
                                {props.closeBtn}
                            </button>

                        </div>
                    }

                </div>

            </div>
            , document.body
            )
        }
        </>
    );
}

export default Modal;