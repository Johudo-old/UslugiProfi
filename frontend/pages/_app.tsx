import "../styles/globals.scss";
import "../styles/normalize.scss";
import type { AppInitialProps } from "next/app";
import { wrapper } from "../src/store/store";
import App from "next/app";
import AuthWrapper from "../src/components/AuthWrapper";

class MyApp extends App<AppInitialProps> {
    public render() {
        const { Component, pageProps } = this.props;
        return (
            <AuthWrapper>
                <Component {...pageProps} />
            </AuthWrapper>
        );
    }
}

export default wrapper.withRedux(MyApp);
