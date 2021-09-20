import { NextPageContext } from "next";
import React from "react";
import PageWrapper from "../../src/components/PageWrapper";
import UserProfileWrapper from "../../src/components/UserProfileWrapper";
import { wrapper } from "../../src/store";
import { AuthStartUp } from "../../src/utils/AuthStartUp";

function UserProfileFavoriteAdsPage() {
    return (
        <PageWrapper>
            <UserProfileWrapper>
                <div>UserProfileFavoriteAdsPage</div>
            </UserProfileWrapper>
        </PageWrapper>
    );
}

UserProfileFavoriteAdsPage.getInitialProps = wrapper.getInitialPageProps(
    (store) => async (context: NextPageContext) => {
        await AuthStartUp(store, context);
    }
);

export default UserProfileFavoriteAdsPage;
