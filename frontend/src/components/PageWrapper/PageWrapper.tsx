import React from "react";
import Popup from "../../popups/Popup";
import Container from "../Container";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { PageWrapperProps } from "./PageWrapperProps";
import styles from "./PageWrapper.module.scss";

export default function PageWrapper(props: PageWrapperProps) {
    return (
        <>
            <Popup />
            <Header />
            <main>
                <Container>
                    <div className={styles.flex__container}>
                        <Sidebar />
                        <div className={styles.page_body}>{props.children}</div>
                    </div>
                </Container>
            </main>
            <Footer />
        </>
    );
}
