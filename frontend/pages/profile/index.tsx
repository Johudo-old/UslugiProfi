import { NextPageContext } from "next";
import React from "react";
import Catalog from "../../src/components/Catalog";
import PageWrapper from "../../src/components/PageWrapper";
import UserProfileWrapper from "../../src/components/UserProfileWrapper";
import { wrapper } from "../../src/store";
import { AuthStartUp } from "../../src/utils/AuthStartUp";

function UserProfilePage() {
    return (
        <PageWrapper>
            <UserProfileWrapper>
                <Catalog />
            </UserProfileWrapper>
        </PageWrapper>
    );
}

UserProfilePage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
});

export default UserProfilePage;
