import { useState } from 'react';
import { wrapper } from "../redux/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import router from 'next/router'
import Loader from '../components/layout_loader';
import "../styles/css/choices.min.css";
import "../styles/css/bootstrap.css";
import "../styles/css/style.css";
import "../styles/css/Chart.min.css";
import "../styles/css/perfect-scrollbar.css";
import "../styles/css/app.css";
import '../styles/css/font-awesome.min.css';


function MyApp({ Component, pageProps }) {
    let [loading, setLoading] = useState(false);
    router.events.on('routeChangeStart',() => {
        setLoading(true)
    })
    router.events.on('routeChangeComplete',() => {
        setLoading(false)
    })
    const store = useStore((state) => state);
    return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Loader loading={loading} />
        {loading === false ? <Component {...pageProps} /> : ''}
    </PersistGate>
    );
}

export default wrapper.withRedux(MyApp);