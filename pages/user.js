import React, { Component } from "react";
import axios from 'axios';
import router from 'next/router'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoggedIn,setRefreshToken,Logout } from '../redux/actions/authActions';
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Table from '../components/table';
import Link from 'next/link';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header:[],
            dataAll:[],
            dataListRuangan:[],
            expiredTokenLama:false,
            statusTokenBaru:false,
            tokenBaru:''
        }
    }

    handleRefreshToken = async () => {
        try {
            let params = {
                id: this.props.auth.id,
            }
            let res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "refresh/token",params,{
                headers:{
                    "content-type":"application/json"
                },
                crossdomain: true
            })
    
            if (res.data.statusCode == '000') {
                this.setState({
                    statusTokenBaru:true,
                    tokenBaru:res.data.accessToken
                })
                this.insertLoginData(res.data.accessToken);
            }
            else {
                alert(res.data.message)
            }
        } catch(err) {
            if (err.message.includes("403") === true)
            {
                this.handleLogout()
            } else {
                console.log(err.message);
            }
        }
    }

    insertLoginData = (responseJson) => {
        let authData = {
            id:this.props.auth.id,
            nama: this.props.auth.nama,
            email: this.props.auth.email,
            token: responseJson,
        };
        this.props.setLoggedIn(authData);
    }

    insertRefreshData = (responseJson) => {
        let refreshData = {
            id:this.props.auth.id,
            nama: this.props.auth.nama,
            email: this.props.auth.email,
            token: this.props.auth.token,
            status_token: responseJson
        };
        this.props.setRefreshToken(refreshData);
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
    
    componentDidMount(){
        this.setState({
            header:[
                {
                    title: 'Nama User', field: 'nama_user',
                    headerStyle: {
                      backgroundColor: '#5a8dee',
                    }
                },
                {
                    title: 'Email User', field: 'email_user',
                    headerStyle: {
                      backgroundColor: '#5a8dee',
                    }
                }
            ]
        })
        this.handleDatas()
    }

    componentDidUpdate(prevProps){
        if (this.props.auth.status_token !== prevProps.auth.status_token) {
            this.handleRefreshToken()
            this.handleDatas()
        }
    }

    handleDatas = async () => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            let res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "masterUser",{
                headers:{
                    "Authorization":"Bearer "+token
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.setState({
                    dataAll: res.data.data.map((item,id) => ({
                        id: item._id,
                        nama_user: item.userName,
                        email_user: item.userEmail
                    }))
                })
            }
            else {
                alert(res.data.message)
            }
        } catch(err) {
            if (err.message.includes("403") === true)
            {   
                this.insertRefreshData("TOKEN REFRESH");
            } else {
                console.log(err.message);
            }
        }
    }

    handleSaveData = async (data1,data2,data3) => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            let params = {
                nama_user: data1,
                email_user: data2,
                password_user: data3
            }
            let res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "masterUser",params,{
                headers:{
                    "Authorization":"Bearer "+token,
                    "content-type":"application/json"
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.handleDatas()
                Swal.fire({
                    icon: 'success',
                    title: 'Save Master User',
                    text: 'Berhasil',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
            else {
                alert(res.data.message)
            }
        } catch(err) {
            if (err.message.includes("403") === true)
            {   
                alert('Silahkan refresh halaman & ulangi kembali prosesnya.')
                this.handleRefreshToken()
            } else {
                console.log(err.message);
            }
        }
    }

    handleEditData = async (id,data1,data2,data3) => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            let params = {
                nama_user: data1,
                email_user: data2,
                password_user: data3
            }
            let res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "masterUser/" + id,params,{
                headers:{
                    "Authorization":"Bearer "+token,
                    "content-type":"application/json"
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.handleDatas()
                Swal.fire({
                    icon: 'success',
                    title: 'Edit Master User',
                    text: 'Berhasil',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
            else {
                alert(res.data.message)
            }
        } catch(err) {
            if (err.message.includes("403") === true)
            {   
                alert('Silahkan refresh halaman & ulangi kembali prosesnya.')
                this.handleRefreshToken()
            } else {
                console.log(err.message);
            }
        }
    }

    handleDeleteData = async (id) => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            let res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "masterUser/" +id,{
                headers:{
                    "Authorization":"Bearer "+token
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.handleDatas()
                Swal.fire({
                    icon: 'success',
                    title: 'Delete Master User',
                    text: 'Berhasil',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
            else {
                alert(res.data.message)
            }
        } catch(err) {
            if (err.message.includes("403") === true)
            {   
                alert('Silahkan refresh halaman & ulangi kembali prosesnya.')
                this.handleRefreshToken()
            } else {
                console.log(err.message);
            }
        }
    }

    render() {
        let date = new Date();
        let year = date.getFullYear();
        
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
                            activeUser={true}
                        />
                        <div id="main">
                            <Navbar></Navbar>
                            <div className="main-content container-fluid">
                                <div className="page-title">
                                    <div className="row">
                                        <div className="col-12 col-md-6 order-md-1 order-last">
                                            <h3>Data User</h3>
                                        </div>
                                        <div className="col-12 col-md-6 order-md-2 order-first">
                                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item"><Link href="/home"><a href="#">Dashboard</a></Link></li>
                                                    <li className="breadcrumb-item active" aria-current="page">Data User</li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <Table
                                    menu="master_user"
                                    textButton="Tambah User"
                                    textHeaderModalEdit="Edit User"
                                    headerTable={this.state.header}
                                    dataTable={this.state.dataAll}
                                    handleSave={this.handleSaveData}
                                    handleEdit={this.handleEditData}
                                    handleDelete={this.handleDeleteData}
                                />
                            </div>
                            <footer>
                                <div className="footer clearfix mb-0 text-muted">
                                    <div className="float-start">
                                        <p>{year} &copy; Inventori</p>
                                    </div>
                                    <div className="float-end">
                                        <p>Crafted with <span className='text-danger'><i data-feather="heart"></i></span> by <a
                                                href="#">Undefined Team</a></p>
                                    </div>
                                </div>
                            </footer>
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
        setLoggedIn,setRefreshToken,Logout
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(User)