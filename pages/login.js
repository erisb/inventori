import React, { Component } from "react";
import axios from 'axios';
import router from 'next/router'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoggedIn } from '../redux/actions/authActions';
import Layout from '../components/layout_login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valEmail: '',
            valPass: '',
        }
    }

    componentDidMount(){
        if (this.props.auth.status == 'SUCCESS') {
            Swal.fire({
                icon: 'info',
                title: 'Login',
                text: 'Anda sudah login',
                showConfirmButton: false,
                timer: 1200
            })
        }
    }

    handleLogin = async () => {
        try {
            if (this.state.valEmail != '' && this.state.valPass != '') {
                let params = {
                    email_user: this.state.valEmail,
                    password_user: this.state.valPass
                }
                let res = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'login',params,{
                    headers:{
                        "content-type":"application/json"
                    },
                    crossdomain: true
                })
                if (res.data.statusCode == '000') {
                    
                    this.insertLoginData(res.data.data[0]);
                    router.push('/home')
                    Swal.fire({
                        icon: 'success',
                        title: 'Login',
                        text: 'Berhasil',
                        showConfirmButton: false,
                        timer: 1200
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login',
                        text: res.data.message,
                    })
                }

            } else if ((this.state.valEmail == '' && this.state.valPass != '') || (this.state.valEmail == '' && this.state.valPass == '')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login',
                    text: 'Email Harus Diisi!!!',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login',
                    text: 'Password Harus Diisi!!!',
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    insertLoginData = (responseJson) => {
        let authData = {
            id:responseJson._id,
            nama: responseJson.userName,
            email: responseJson.userEmail,
            token: responseJson.accessToken,
        };
        this.props.setLoggedIn(authData);
    }

    showPassword = (e) => {
        e.preventDefault();
        let x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    pressEnter = (el) =>{
        if (el.keyCode === 13) {
            document.getElementById("loginSubmit").click();
        }
    }

    showPassword = (e) => {
        e.preventDefault();
        let x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    render() {
        let view;
        if (this.props.auth.status == 'SUCCESS') {
            router.push("/home")
        } else {
           view = (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-12 mx-auto">
                        <div className="card pt-4">
                            <div className="card-body">
                                <div className="text-center mb-5">
                                    <h3>Login</h3>
                                    <p>Silahkan Login Terlebih Dahulu Guys.</p>
                                </div>
                                <div className="form-group position-relative has-icon-left">
                                    <label htmlFor="username">Email</label>
                                    <div className="position-relative">
                                        <input type="email" className="form-control" name="email" id="email" onChange={event => this.setState({ valEmail: event.target.value })} onKeyUp={this.pressEnter} autoFocus />
                                        <div className="form-control-icon">
                                            <i data-feather="user"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group position-relative has-icon-left">
                                    <div className="clearfix">
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="position-relative">
                                        <input type="password" className="form-control" name="password" id="password" onChange={event => this.setState({ valPass: event.target.value })} onKeyUp={this.pressEnter} /><a onClick={this.showPassword}><i className="fa fa-eye fa-fw" style={{ color: "#20b2aa", paddingRight: "20px", marginTop: "-25px", zIndex: "2", position: "relative", float: "right"}}></i></a>
                                        <div className="form-control-icon">
                                            <i data-feather="lock"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix">
                                    <button type="submit" className="btn btn-primary float-end" id="loginSubmit" onClick={this.handleLogin}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           )
        }
        
        return (
            <Layout>
                {view}
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    const { auth } = state
    return { auth }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setLoggedIn,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);