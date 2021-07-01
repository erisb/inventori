import React, { Component } from "react";
import axios from 'axios';
import router from 'next/router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Logout } from '../redux/actions/authActions';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout=async(e)=>{
        // e.preventDefault();
        try {
            let params = {
                email_user:this.props.auth.email
            }
            let res = await axios.post(process.env.NEXT_PUBLIC_API_URL+'logout',params,{
                headers:{
                    "content-type":"application/json"
                },
                crossdomain: true
            })
            if (res.data.statusCode == '000')
            {
                this.props.Logout();
                router.push('/')
            }
            else {
                alert(res.data.message)
            }
        } catch(error) {
            console.log(error);
        }
    }

    showToggle=(e)=>{
        e.preventDefault();
        let elementShowToggle = document.getElementsByClassName("dropdown-menu")

        if (elementShowToggle[0].classList.contains("show")) {
            elementShowToggle[0].classList.remove("show")
        } else {
            document.getElementById("child_toggle").classList.add("show");
        }
    }

    render() {
        return (
            <nav className="navbar navbar-header navbar-expand navbar-light">
                <a className="sidebar-toggler" href="#"><span className="navbar-toggler-icon"></span></a>
                <button className="btn navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex align-items-center navbar-light ms-auto">
                        <li className="dropdown">
                            <a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user" onClick={this.showToggle}>
                                <div className="avatar me-1">
                                    <img src="/images/avatar/avatar-s-1.png" alt="" srcSet=""/>
                                </div>
                                <div className="d-none d-md-block d-lg-inline-block">Hi, {this.props.auth.nama}</div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end" id="child_toggle">
                                <a className="dropdown-item" href="#" onClick={this.handleLogout}><i data-feather="log-out"></i> Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state
    return { auth }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        Logout,
    },dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)