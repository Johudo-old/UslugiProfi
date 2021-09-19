import Input from "../../../src/components/Input";
import Textarea from "../../../src/components/Textarea";
import UserProfileWrapper from "../../../src/components/UserProfileWrapper";
import styles from "../../../styles/pages/UserProfileCreateAdPage.module.scss";

export default function UserProfileCreateAdPage() {
    return (
        <UserProfileWrapper>
            <Input type="text" placeholder="Название" className={styles.page__element} />
            <Textarea placeholder="Описание" className={styles.page__element} />
            <Input type="text" placeholder="Адрес" className={styles.page__element} />
        </UserProfileWrapper>
    );
}
