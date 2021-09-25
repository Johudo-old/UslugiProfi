import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CatalogItem.module.scss";
import { CatalogItemProps } from "./CatalogItemProps";

const rating = 3;

export default function CatalogItem(props: CatalogItemProps) {
    return (
        <li className={styles.catalogItem}>
            <a href={"/announcment/" + props.item.id} className={styles.catalogItem__block}>
                <div className={styles.catalogItem__imageWrapper}>
                    <img src={props.item.image} alt={props.item.name} className={styles.catalogItem__image} />
                </div>

                <h3 className={styles.catalogItem__title}>{props.item.name}</h3>
                <p className={styles.catalogItem__description}>{props.item.description}</p>

                <div className={styles.catalogItem__details}>
                    <div className={styles.catalogItem__ratingBlock}>
                        {Array(5)
                            .fill("")
                            .map((item, index) => (
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={[
                                        styles.catalogItem__ratingStar,
                                        index + 1 <= rating ? styles.catalogItem__ratingItemFilled : "",
                                    ]
                                        .join(" ")
                                        .trim()}
                                />
                            ))}
                    </div>
                    <div className={styles.catalogItem__commentsCount}>12 комментариев</div>
                </div>
            </a>
        </li>
    );
}
