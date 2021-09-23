import styles from "./Catalog.module.scss";
import CatalogItem from "./CatalogItem/CatalogItem";
import { CatalogProps } from "./CatalogProps";

export default function Catalog(props: CatalogProps) {
    return (
        <ul className={styles.maincatalog}>
            {Array.isArray(props.announcements) && props.announcements.length > 0
                ? props.announcements.map((item, index) => <CatalogItem item={item} key={"catalog__item__" + index} />)
                : "Список пуст"}
        </ul>
    );
}
