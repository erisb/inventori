import Head from "next/head";
import { useEffect } from 'react';

export default function LayoutLogin(props) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const scriptFeather = document.createElement('script');
            scriptFeather.src = "/js/feather-icons/feather.min.js";
            scriptFeather.async = false;

            const scriptApp = document.createElement('script');
            scriptApp.src = "/js/app.js";
            scriptApp.async = false;

            const scriptMain = document.createElement('script');
            scriptMain.src = "/js/main.js";
            scriptMain.async = false;

            document.body.appendChild(scriptFeather);
            document.body.appendChild(scriptApp);
            document.body.appendChild(scriptMain);
            return () => {
                document.body.removeChild(scriptFeather);
                document.body.removeChild(scriptApp);
                document.body.removeChild(scriptMain);
            }
        }
    }, []);
    return (
        <div>
            <Head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Inventori</title>
            </Head>
            <div id="auth">
                {props.children}
            </div>
        </div>
    );
}