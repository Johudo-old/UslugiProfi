import React from "react";
import Catalog from "../../../src/components/Catalog";
import UserProfileWrapper from "../../../src/components/UserProfileWrapper";

export default function UserProfilePage() {
    return (
        <UserProfileWrapper>
            <Catalog />
        </UserProfileWrapper>
    );
}
