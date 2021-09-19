import styles from "./Sidebar.module.scss";

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__categoryiesblock}>
                <div className={styles.sidebar__categoryitem}>
                    <button className={styles.sidebarcategory} data-id="{{category.id}}" data-visible="false">
                        Test
                    </button>
                </div>

                <div className={styles.sidebar__categoryitem}>
                    <button className={styles.sidebarcategory} data-id="{{category.id}}" data-visible="false">
                        Test
                    </button>
                </div>

                <div className={styles.sidebar__categoryitem}>
                    <button className={styles.sidebarcategory} data-id="{{category.id}}" data-visible="false">
                        Test
                    </button>
                </div>
            </div>
        </div>
    );
}
