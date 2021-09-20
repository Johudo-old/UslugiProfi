import "../styles/globals.scss";
import "../styles/normalize.scss";
import type { AppProps } from "next/app";
import { store } from "../src/store";
import { Provider } from "react-redux";
import { wrapper } from "../src/store/store";
import AuthWrapper from "../src/components/AuthWrapper";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AuthWrapper>
                <Component {...pageProps} />
            </AuthWrapper>
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
