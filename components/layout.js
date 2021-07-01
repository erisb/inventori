import Head from "next/head";
import { useEffect } from 'react';

export default function Layout(props) {

    useEffect(() => {
        if (typeof window !== "undefined") {

            const scriptFeather = document.createElement('script');
            scriptFeather.src = "/js/feather-icons/feather.min.js";
            scriptFeather.async = false;

            const scriptScroll = document.createElement('script');
            scriptScroll.src = "/vendors/perfect-scrollbar/perfect-scrollbar.min.js";
            scriptScroll.async = false;

            const scriptApp = document.createElement('script');
            scriptApp.src = "/js/app.js";
            scriptApp.async = false;

            const scriptMain = document.createElement('script');
            scriptMain.src = "/js/main.js";
            scriptMain.async = false;

            document.body.appendChild(scriptFeather);
            document.body.appendChild(scriptScroll);
            document.body.appendChild(scriptApp);
            document.body.appendChild(scriptMain);
        
            return () => {
                document.body.removeChild(scriptFeather);
                document.body.removeChild(scriptScroll);
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
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Head>
            {props.children}
        </div>
    );
}