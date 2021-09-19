import styles from "../Catalog.module.scss";

export default function CatalogItem() {
    return (
        <li className={styles.catalogitem}>
            <a href="/" className={styles.catalogitem__link}>
                <div className={styles.catalogitem__imagewrapper}>
                    <img
                        src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202011_GEO_RU?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1613672884000"
                        alt=""
                        className={styles.catalogitem__image}
                    />
                </div>
                <h3 className={styles.catalogitem__title}>item.name</h3>
                <p className={styles.catalogitem__description}>item.description</p>
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
