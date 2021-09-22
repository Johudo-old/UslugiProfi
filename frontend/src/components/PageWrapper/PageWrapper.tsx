import React, { createRef, useEffect, useRef, useState } from "react";
import Popup from "../../popups/Popup";
import Container from "../Container";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { PageWrapperProps } from "./PageWrapperProps";
import styles from "./PageWrapper.module.scss";

export default function PageWrapper(props: PageWrapperProps) {
    const headerRef = useRef<HTMLDivElement>();
    const footerRef = useRef<HTMLDivElement>();

    const [mainMinHeight, setMainMinHeight] = useState<string>("0px");

    useEffect(() => {
        if (headerRef.current?.offsetHeight && footerRef.current?.offsetHeight) {
            setMainMinHeight(
                `calc(100vh - ${headerRef.current?.offsetHeight}px - ${footerRef.current?.offsetHeight}px)`
            );
            return;
        }

        if (headerRef.current?.offsetHeight) {
            setMainMinHeight(`calc(100vh - ${headerRef.current?.offsetHeight}px`);
            return;
        }

        if (footerRef.current?.offsetHeight) {
            setMainMinHeight(`calc(100vh - ${footerRef.current?.offsetHeight}px)`);
            return;
        }

        setMainMinHeight(`0px`);
    }, [headerRef, footerRef]);

    return (
        <div className={styles.app}>
            <Popup />
            <Header ref={(header) => (headerRef.current = header)} />
            <main
                className={styles.main}
                style={{
                    minHeight: mainMinHeight,
                }}
            >
                <Container>
                    <div className={styles.flex__container}>
                        <Sidebar />
                        <div className={styles.page_body}>{props.children}</div>
                    </div>
                </Container>
            </main>
            <Footer ref={(footer) => (footerRef.current = footer)} />
        </div>
    );
}
