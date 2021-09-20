import React from "react";
import Catalog from "../../src/components/Catalog";
import PageWrapper from "../../src/components/PageWrapper";
import UserProfileWrapper from "../../src/components/UserProfileWrapper";

export default function UserProfilePage() {
    return (
        <PageWrapper>
            <UserProfileWrapper>
                <Catalog />
            </UserProfileWrapper>
        </PageWrapper>
    );
}
