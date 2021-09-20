import { NextPageContext } from "next";
import React from "react";
import Input from "../../src/components/Input";
import PageWrapper from "../../src/components/PageWrapper";
import Textarea from "../../src/components/Textarea";
import UserProfileWrapper from "../../src/components/UserProfileWrapper";
import { wrapper } from "../../src/store";
import { AuthStartUp } from "../../src/utils/AuthStartUp";
import styles from "../../styles/pages/UserProfileCreateAdPage.module.scss";

function UserProfileCreateAdPage() {
    return (
        <PageWrapper>
            <UserProfileWrapper>
                <Input type="text" placeholder="Название" className={styles.page__element} />
                <Textarea placeholder="Описание" className={styles.page__element} />
                <Input type="text" placeholder="Адрес" className={styles.page__element} />
            </UserProfileWrapper>{" "}
        </PageWrapper>
    );
}

UserProfileCreateAdPage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
});

export default UserProfileCreateAdPage;
