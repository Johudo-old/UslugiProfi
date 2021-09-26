import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AnnouncementAPI } from "../../src/api/AnnouncementAPI";
import PageWrapper from "../../src/components/PageWrapper";
import { wrapper } from "../../src/store";
import { Announcement } from "../../src/types/Announcement";
import { AuthStartUp } from "../../src/utils/AuthStartUp";

const AnnouncementPage: NextPage<AnnouncementPageProps> = (props: AnnouncementPageProps) => {
    const router = useRouter();

    return <PageWrapper>{props.announcement.name}</PageWrapper>;
};

AnnouncementPage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
    const announcementResult = await AnnouncementAPI.getAnnouncementById(Number(context.query.announcement_id));

    return { announcement: announcementResult.data } as AnnouncementPageProps;
});

type AnnouncementPageProps = { announcement: Announcement };

export default AnnouncementPage;
