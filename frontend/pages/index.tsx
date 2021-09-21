import type { NextPage, NextPageContext } from "next";
import React from "react";
import { AnnouncementAPI } from "../src/api/AnnouncementAPI";
import Catalog from "../src/components/Catalog";
import PageWrapper from "../src/components/PageWrapper";
import { wrapper } from "../src/store";
import { Announcement } from "../src/types/Announcement";
import { AuthStartUp } from "../src/utils/AuthStartUp";

const HomePage: NextPage<HomePageProps> = (props: HomePageProps) => {
    return (
        <PageWrapper>
            <Catalog announcements={props.announcements} />
        </PageWrapper>
    );
};

HomePage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
    const getAnnouncementsResult = await AnnouncementAPI.getAnnouncements();

    return { announcements: getAnnouncementsResult.data } as HomePageProps;
});

type HomePageProps = { announcements: Array<Announcement> };

export default HomePage;
