import { NextPage, NextPageContext } from "next";
import React from "react";
import { AnnouncementAPI } from "../../src/api/AnnouncementAPI";
import Catalog from "../../src/components/Catalog";
import PageWrapper from "../../src/components/PageWrapper";
import UserProfileWrapper from "../../src/components/UserProfileWrapper";
import { wrapper } from "../../src/store";
import { Announcement } from "../../src/types/Announcement";
import { AuthStartUp } from "../../src/utils/AuthStartUp";

const UserProfilePage: NextPage<UserProfilePageProps> = (props: UserProfilePageProps) => {
    return (
        <PageWrapper>
            <UserProfileWrapper>
                <Catalog announcements={props.announcements} />
            </UserProfileWrapper>
        </PageWrapper>
    );
};

UserProfilePage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);

    const getAnnouncementsResult = await AnnouncementAPI.getAnnouncements({
        user: store.getState().user?.userInfo?.id,
    });

    return { announcements: getAnnouncementsResult.data } as UserProfilePageProps;
});

type UserProfilePageProps = { announcements: Array<Announcement> };

export default UserProfilePage;
