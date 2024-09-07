import { Link } from 'react-router-dom';

import styles from './navigation.module.scss';

import { NAV_DATA_ITEMS } from './variables';

export function Navigation() {
    const renderNavElements = NAV_DATA_ITEMS.map(({ text, link }) => (
        <li className={styles.listItems}>
            <Link to={link}>{text}</Link>
        </li>
    ));
    return (
        <nav className={styles.nav}>
            <ul className={styles.listItems}>{renderNavElements}</ul>
        </nav>
    );
}
