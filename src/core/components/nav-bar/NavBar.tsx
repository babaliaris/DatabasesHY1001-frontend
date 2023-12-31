import styles from './NavBar.module.css';
import { fontawesomeIcons } from '../../fontawesome.icons';
import { useNavigate } from 'react-router-dom';

function NavBar()
{
    const navigate = useNavigate();

    return (
        <div className={`${styles.container} bg-primary`}>
            
            <div className={`${styles.logo_column}`} onClick={()=>navigate("/")}>
                <i className={`${fontawesomeIcons.agro_logo}`}/>
            </div>

            <div className={`${styles.title_column}`} onClick={()=>navigate("/")}>
                <label className={`${styles.title_label}`}>AgroTrade</label>
            </div>

            <div className={`${styles.content_column}`}>
                <div className={`${styles.content_item}`}>
                    <button
                    className={`btn btn-info`}
                    onClick={()=>navigate('create-user')}
                    >
                        Δημιουργία Χρήστη
                    </button>
                </div>

                <div className={`${styles.content_item}`}>
                    <button
                    className={`btn btn-info`}
                    onClick={()=>navigate('select-user')}
                    >
                        Επιλογή Χρήστη
                    </button>
                </div>
            </div>

        </div>
    );
}

export default NavBar;