import "../styles/globals.scss";
import "../styles/normalize.scss";
import type { AppContext, AppProps } from "next/app";
import { store } from "../src/store";
import { Provider, useDispatch } from "react-redux";
import Container from "../src/components/Container";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Sidebar from "../src/components/Sidebar";
import Popup from "../src/popups/Popup";
import styles from "../styles/pages/BaseTemplate.module.scss";
import { useEffect } from "react";
import { TokensService } from "../src/services/TokensService";
import { AuthAPI, AuthRefreshTokenAPIData } from "../src/api/AuthAPI";
import axios from "axios";
import { JWT_AUTH_HEADER_PREFIX } from "../config";
import { UserAPI, UserInfoAPIData } from "../src/api/UserAPI";
// import { UserActionCreator } from "../src/store/actionCreators/userActionCreator";
// import { GetServerSideProps } from "next";

function MyApp({ Component, pageProps }: AppProps) {
    // const dispatch = useDispatch();
    useEffect(() => {
        const refreshToken = TokensService.getRefreshToken();
        if (refreshToken) authUser(refreshToken);
    }, []);

    async function authUser(refreshToken: string) {
        console.log("AUTH_USER");
        if (!(await getAccessTokenAndWriteInAxiosHeader(refreshToken))) return;
        const userInfo = await getUserInfo();
        console.log(userInfo);
        // dispatch(UserActionCreator.setUserInfo(userInfo as UserInfoAPIData));
    }

    async function getAccessTokenAndWriteInAxiosHeader(refreshToken: string): Promise<boolean> {
        const result = await AuthAPI.refreshToken({ refresh: refreshToken });

        if (result.status !== 200) {
            console.log(result);
            return false;
        }

        const accessToken = (result.data as AuthRefreshTokenAPIData).access;
        axios.defaults.headers.common["Authorization"] = `${JWT_AUTH_HEADER_PREFIX} ${accessToken}`;
        return true;
    }

    async function getUserInfo() {
        const result = await UserAPI.getCurrenUserInfo();

        if (result.status !== 200) {
            console.log(result);
            return undefined;
        }

        return result.data as UserInfoAPIData;
    }

    return (
        <Provider store={store}>
            <Popup />
            <Header />
            <main>
                <Container>
                    <div className={styles.flex__container}>
                        <Sidebar />
                        <div className={styles.page_body}>
                            <Component {...pageProps} />
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </Provider>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    console.log("Token", TokensService.getRefreshToken());

    // const appProps = await UserAPI.getCurrenUserInfo();
    const appProps = {};

    return { ...appProps };
};

export default MyApp;
