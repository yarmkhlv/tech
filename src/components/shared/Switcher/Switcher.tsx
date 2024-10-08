import clsx from 'clsx';
import styles from './switcher.module.scss';

interface ISwitcherProps {
    switcherActive: boolean;
    handleChangeSwitcher: () => void;
    text?: string;
}
export const Switcher = ({
    switcherActive,
    handleChangeSwitcher,
    text,
}: ISwitcherProps) => (
    <div className={styles.switcherBlock}>
        {text && <p>{text}</p>}
        <label htmlFor="switcher" className={styles.switcher}>
            <input
                onChange={() => handleChangeSwitcher()}
                id="switcher"
                type="checkbox"
                checked={switcherActive}
            />
            <span className={clsx(styles.slider, styles.round)} />
        </label>
    </div>
);
