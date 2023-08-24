import { Outlet, useLocation, useNavigate, Link } from "react-router-dom"

import styles from './Profile.module.css';

function Profile() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        navigate(`/profile/${tab}`)
    }

    return (
        <div>
            <Link to="/" className={styles.homeLink}>Inicio</Link>
            <div className={styles.tabsContainer}>
                <span 
                    className={`${pathname.includes('my-info') ? styles.active : ''} ${styles.tab}`}
                    style={{marginRight: 8}}
                    onClick={() => handleTabClick('my-info')}
                >
                    Mi información
                </span>
                <span
                    className={`${pathname.includes('liked-events') ? styles.active : ''} ${styles.tab}`}
                    onClick={() => handleTabClick('liked-events')}
                >
                    Eventos favoritos
                </span>
            </div>
            <Outlet />
        </div>
    )
}

export default Profile