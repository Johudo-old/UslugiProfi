import Container from "../Container";
import Logo from "../Logo";
import styles from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { PopupActionCreator } from "../../store/actionCreators/PopupActionCreator";
import { PopupTypeEnum } from "../../popups/Popup/PopupTypeEnum";

export default function Header() {
    const dispatch = useDispatch();

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.header__top}>
                    <a href="/" className={styles.header__logowrapper}>
                        <Logo type="default" className={styles.header__logo} />
                    </a>
                </div>

                <div className={styles.header__bottom}>
                    <div className={[styles.header__links, styles.header__links__desktop].join(" ").trim()}>
                        <div className={styles.login__links}>
                            <a href="/profile/1" className={[styles.login, styles.open__login_popup].join(" ").trim()}>
                                Профиль
                            </a>
                            <span> | </span>
                            <button
                                className={[styles.login, styles.open__login_popup].join(" ").trim()}
                                onClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login))}
                            >
                                Войти
                            </button>
                            <span> | </span>
                            <button
                                className={[styles.signup, styles.open__register_popup].join(" ").trim()}
                                onClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.register))}
                            >
                                Регистрация
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.header__search__desktop}>
                    <form className={styles.header__search_form}>
                        <input
                            className={styles.search_input}
                            type="search"
                            name="search"
                            placeholder="Поиск по объявлениям"
                        />
                        <button className={styles.white_btn} type="submit">
                            Искать
                        </button>
                    </form>
                </div>
            </Container>
        </div>
    );
}
