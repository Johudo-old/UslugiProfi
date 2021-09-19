import { useRouter } from "next/dist/client/router";
import React from "react";
import Avatar from "../Avatar";
import { UserProfileWrapperProps } from "./UserProfileWrapperProps";
import styles from "./UserProfileWrapper.module.scss";
import Button from "../Button";

export default function UserProfileWrapper(props: UserProfileWrapperProps) {
    const router = useRouter();

    const navigationList = [
        {
            url: `/profile/${router.query.user}/`,
            title: "Мои объявления",
        },
        {
            url: `/profile/${router.query.user}/favorites-ads/`,
            title: "Избранные объявления",
        },
        {
            url: `/profile/${router.query.user}/create-ad/`,
            title: "Разместить объявление",
        },
        {
            url: `/profile/${router.query.user}/edit/`,
            title: "Настройки профиля",
        },
    ];

    return (
        <>
            <div className={styles.adsLifeTime}>
                <div className={styles.adsLifeTime__text}>
                    Ваши объявления будут видны до <span className="adv_end">31.02.21</span>
                </div>
                <Button className={styles.adsLifeTime_button}>Продлить</Button>
            </div>

            <div className={styles.userInfo}>
                <Avatar
                    size="large"
                    src="https://html5css.ru/w3images/avatar2.png"
                    alt="dimazuev11@gmail.com"
                    className={styles.userInfo__avatar}
                />

                <div className={styles.userInfo__text}>
                    <div className={styles.userInfo__name}>Дмитрий Зуев</div>
                    <div className={styles.userInfo__registerData}>на сайте с 28.01.21</div>
                    <div className={styles.userInfo__adsCount}>
                        Объявлений: <span>2</span>
                    </div>
                    <div className={styles.userInfo__phone}>+7 (999) 999-99-99 </div>
                    <div className={styles.userInfo__email}>dimazuev11@gmail.com</div>
                </div>
            </div>

            <ul className={styles.profileNavigationList}>
                {navigationList.map((item, index) => {
                    const routerPath =
                        router.asPath[router.asPath.length - 1] === "/" ? router.asPath : router.asPath + "/";

                    return (
                        <li
                            className={
                                routerPath === item.url
                                    ? styles.profileNavigationList__selectedItem
                                    : styles.profileNavigationList__item
                            }
                            key={`profileNavigationList__item__${index}`}
                        >
                            <a href={item.url}>{item.title}</a>
                        </li>
                    );
                })}
            </ul>

            {props.children}
        </>
    );
}
