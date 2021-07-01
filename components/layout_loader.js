import Head from "next/head";
import BeatLoader from "react-spinners/BeatLoader";

const color = {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '250px',
    width:'30%',
    borderColor: '#5A8DEE',
    color: '#5A8DEE',
    textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center'
}
export default function LayoutLoader(props) {
    return (
        <div style={{display:props.loading === true ? 'block' : 'none'}}>
            <Head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Inventori</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Head>
            <div id="app">
                <div id="main">
                    <div className="main-content container-fluid">
                        <BeatLoader loading={props.loading} css={color} size={20} margin={2}/>
                    </div>
                </div>
            </div>
        </div>
    );
}