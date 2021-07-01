import React, { Component } from "react";
import axios from 'axios';
import router from 'next/router'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

// const removeScript = (scriptToremove) => {
//     let allSuspects=document.getElementsByTagName("script");
//     for (let i=allSuspects.length; i>=0; i--){
//         if (allSuspects[i] && allSuspects[i].getAttribute("src")!==null && allSuspects[i].getAttribute("src").indexOf(`${scriptToremove}`) !== -1 ){
//            allSuspects[i].parentNode.removeChild(allSuspects[i])
//         }    
//     }
// }
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valEmail: '',
            valPass: '',
            valDefaultUrl: '',
        }
    }
    
    // componentDidMount(){
    //     if (typeof window !== "undefined") {

    //         const scriptApp = document.createElement('script');
    //         scriptApp.src = "/js/app.js";
    //         scriptApp.async = false;

    //         const scriptChart = document.createElement('script');
    //         scriptChart.src = "/vendors/chartjs/Chart.min.js";
    //         scriptChart.async = false;

    //         const scriptApex = document.createElement('script');
    //         scriptApex.src = "/vendors/apexcharts/apexcharts.min.js";
    //         scriptApex.async = false;

    //         const scriptDashboard = document.createElement('script');
    //         scriptDashboard.src = "/js/pages/dashboard.js";
    //         scriptDashboard.async = false;

    //         document.body.appendChild(scriptApp);
    //         document.body.appendChild(scriptChart);
    //         document.body.appendChild(scriptApex);
    //         document.body.appendChild(scriptDashboard);
    //     }
    // }

    // componentWillUnmount(){
    //     if (typeof window !== "undefined") {
    //         removeScript("/js/app.js");
    //     }
    // }

    render() {
        if (this.props.auth.status == 'NOT LOGIN') {
            router.push('/')
            Swal.fire({
                icon: 'info',
                title: 'Login',
                text: 'Anda belum login',
                showConfirmButton: false,
                timer: 1200
            })
        }
        else {
            return (
                <Layout>
                    <div id="app">
                        <Sidebar
                            default={false}
                            activeDashboard={true}
                        />
                        <div id="main">
                            <Navbar></Navbar>
                            <div className="main-content container-fluid">
                            </div>
                        </div>
                    </div>
                </Layout>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const { auth } = state
    return { auth }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);