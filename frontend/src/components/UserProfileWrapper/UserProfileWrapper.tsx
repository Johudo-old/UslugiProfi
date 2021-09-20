import { useRouter } from "next/dist/client/router";
import React from "react";
import Avatar from "../Avatar";
import { UserProfileWrapperProps } from "./UserProfileWrapperProps";
import styles from "./UserProfileWrapper.module.scss";
import Button from "../Button";
import { useSelector } from "react-redux";
import { IState } from "../../store";

export default function UserProfileWrapper(props: UserProfileWrapperProps) {
    const router = useRouter();

    const userState = useSelector((state: IState) => state.user);

    const navigationList = [
        {
            url: `/profile/`,
            title: "Мои объявления",
        },
        {
            url: `/profile/favorites-ads/`,
            title: "Избранные объявления",
        },
        {
            url: `/profile/create-ad/`,
            title: "Разместить объявление",
        },
        {
            url: `/profile/edit/`,
            title: "Настройки профиля",
        },
    ];

    function getName() {
        if (userState?.name || userState?.surname) return `${userState?.name} ${userState?.surname}`.trim();
        else return userState?.email || "unknown";
    }

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
                    src={userState?.avatar || undefined}
                    alt={getName()}
                    className={styles.userInfo__avatar}
                />

                <div className={styles.userInfo__text}>
                    <div className={styles.userInfo__name}>{getName()}</div>
                    <div className={styles.userInfo__registerData}>
                        на сайте с {userState?.create_date.split("-").reverse().join(".")}
                    </div>
                    <div className={styles.userInfo__adsCount}>
                        Объявлений: <span>2</span>
                    </div>
                    {userState?.phone ? <div className={styles.userInfo__phone}>{userState?.phone}</div> : undefined}
                    {getName() !== userState?.email ? (
                        <div className={styles.userInfo__email}>{userState?.email}</div>
                    ) : undefined}
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
