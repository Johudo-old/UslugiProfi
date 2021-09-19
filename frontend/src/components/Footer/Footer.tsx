import Container from "../Container";
import Logo from "../Logo";
import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <Container>
                <div className={styles.footer__top}>
                    <a href="/">
                        <Logo type="white" className={styles.footer__logo} />
                    </a>
                    <ul className={styles.footer__menu}>
                        <li className={styles.footer__menuItem}>
                            <a href="/">Безопасность</a>
                        </li>
                        <li className={styles.footer__menuItem}>
                            <a href="/">Правила</a>
                        </li>
                        <li className={styles.footer__menuItem}>
                            <a href="/">Пользовательское соглашение</a>
                        </li>
                        <li className={styles.footer__menuItem}>
                            <a href="/">Помощь и контакты</a>
                        </li>
                        <li className={styles.footer__menuItem}>
                            <a href="/">Цены</a>
                        </li>
                        <li className={styles.footer__menuItem}>
                            <a href="/">О нас</a>
                        </li>
                    </ul>
                </div>

                <div className={styles.footer__bottom}>
                    <p className={styles.allRights}>
                        Usluge © {new Date().getFullYear()} by MadiSpace
                        <span>All rights reserved</span>
                    </p>
                </div>
            </Container>
        </div>
    );
}
