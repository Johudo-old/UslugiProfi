import styles from "./Catalog.module.scss";
import CatalogItem from "./CatalogItem/CatalogItem";

export default function Catalog() {
    return (
        <ul className={styles.maincatalog}>
            <CatalogItem />
            <CatalogItem />
            <CatalogItem />
            <CatalogItem />
            <CatalogItem />
            <CatalogItem />
        </ul>
    );
}
