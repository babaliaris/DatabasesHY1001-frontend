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
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success btn-info" type="submit">Search</button>
                </form>
            </div>

        </div>
    );
}

export default NavBar;