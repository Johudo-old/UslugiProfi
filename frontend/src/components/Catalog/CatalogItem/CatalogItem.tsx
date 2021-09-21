import styles from "../Catalog.module.scss";
import { CatalogItemProps } from "./CatalogItemProps";

export default function CatalogItem(props: CatalogItemProps) {
    return (
        <li className={styles.catalogitem}>
            <a href="/" className={styles.catalogitem__link}>
                <div className={styles.catalogitem__imagewrapper}>
                    <img src={props.item.image} alt={props.item.name} className={styles.catalogitem__image} />
                </div>
                <h3 className={styles.catalogitem__title}>{props.item.name}</h3>
                <p className={styles.catalogitem__description}>{props.item.description}</p>
            </a>

            <div className={styles.catalogitem__details}>
                <div className={styles.catalogitem__ratingblock}>
                    <span
                        className={[styles.catalogitem__ratingitem, styles.catalogitem__ratingitem__checked]
                            .join(" ")
                            .trim()}
                    ></span>
                    <span
                        className={[styles.catalogitem__ratingitem, styles.catalogitem__ratingitem__checked]
                            .join(" ")
                            .trim()}
                    ></span>
                    <span
                        className={[styles.catalogitem__ratingitem, styles.catalogitem__ratingitem__checked]
                            .join(" ")
                            .trim()}
                    ></span>
                    <span
                        className={[styles.catalogitem__ratingitem, styles.catalogitem__ratingitem__checked]
                            .join(" ")
                            .trim()}
                    ></span>
                    <span className={styles.catalogitem__ratingitem}></span>
                </div>
                <p className={styles.catalogitem__commentscount}>12 комментариев</p>
            </div>
        </li>
    );
}
