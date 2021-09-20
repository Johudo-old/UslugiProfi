import type { NextPage } from "next";
import React from "react";
import Catalog from "../src/components/Catalog";
import PageWrapper from "../src/components/PageWrapper";

const HomePage: NextPage = () => {
    return (
        <PageWrapper>
            <Catalog />
        </PageWrapper>
    );
};

export default HomePage;
