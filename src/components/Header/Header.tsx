import { Search } from '../Search';

import styles from './header.module.scss';

export function Header() {
    return (
        <header className={styles.header}>
            <img
                className={styles.logo}
                src="https://avatars.githubusercontent.com/u/13049122?s=200&v=4"
                alt="tech logot"
            ></img>
            <Search />
        </header>
    );
}
