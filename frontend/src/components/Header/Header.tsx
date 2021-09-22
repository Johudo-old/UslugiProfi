import Container from "../Container";
import Logo from "../Logo";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { PopupActionCreator } from "../../store/actionCreators/PopupActionCreator";
import { PopupTypeEnum } from "../../popups/Popup/PopupTypeEnum";
import { IState } from "../../store";
import React from "react";
import Button from "../Button";
import Input from "../Input";
import { UserActionCreator } from "../../store/actionCreators/UserActionCreator";

function Header(props: any, ref: React.ForwardedRef<any>) {
    const dispatch = useDispatch();

    const userState = useSelector((state: IState) => state.user.userInfo);

    return (
        <header className={styles.header} ref={ref}>
            <Container>
                <div className={styles.header__top}>
                    <a href="/" className={styles.header__logoWrapper}>
                        <Logo type="default" className={styles.header__logo} />
                    </a>
                </div>

                <div className={styles.header__bottom}>
                    <div className={[styles.header__links].join(" ").trim()}>
                        {userState ? (
                            <>
                                <a href="/profile/" className={[styles.link, styles.coloredLink].join(" ").trim()}>
                                    {userState.email}
                                </a>
                                <button className={styles.link} onClick={() => dispatch(UserActionCreator.logout())}>
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className={[styles.link, styles.coloredLink].join(" ").trim()}
                                    onClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login))}
                                >
                                    Войти
                                </button>
                                <button
                                    className={styles.link}
                                    onClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.register))}
                                >
                                    Регистрация
                                </button>
                            </>
                        )}
                    </div>

                    <form className={styles.header__searchForm}>
                        <Input className={styles.searchInput} type="text" placeholder="Поиск по объявлениям" />
                        <Button className={styles.searchButton} type="submit">
                            Искать
                        </Button>
                    </form>
                </div>
            </Container>
        </header>
    );
}

export default React.forwardRef(Header);
