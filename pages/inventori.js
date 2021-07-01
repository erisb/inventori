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

class Inventori extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header:[],
            dataAll:[],
            dataListUnit:[],
            dataListKategori:[],
            dataListBarang:[],
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
                    title: 'Barang', field: 'inv_barang',
                    headerStyle: {
                      backgroundColor: '#5a8dee',
                    }
                },
                {
                    title: 'Merk Barang', field: 'inv_merk',
                    headerStyle: {
                      backgroundColor: '#5a8dee',
                    }
                },
                {
                    title: 'Unit', field: 'inv_unit',
                    headerStyle: {
                      backgroundColor: '#5a8dee',
                    }
                },
                {
                    title: 'Ruangan', field: 'inv_ruangan',
                    headerStyle: {
                      backgroundColor: '#5a8dee',
                    }
                },
                {
                    title: 'Kondisi', field: 'inv_kondisi',
                    headerStyle: {
                      backgroundColor: '#5a8dee',
                    }
                },
                {   title: 'Foto', field: 'inv_foto', 
                    render: rowData => <img src={rowData.inv_foto} style={{cursor: "pointer"}} className="zoom"/> 
                }
            ]
        })
        this.handleDatas()
        this.handleListUnit()
        this.handleListKategori()
        this.handleListBarang()
    }

    componentDidUpdate(prevProps){
        if (this.props.auth.status_token !== prevProps.auth.status_token) {
            this.handleRefreshToken()
            this.handleDatas()
            this.handleListUnit()
            this.handleListKategori()
            this.handleListBarang()
        }
    }

    handleDatas = async () => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            let res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "inventori",{
                headers:{
                    "Authorization":"Bearer "+token
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.setState({
                    dataAll: res.data.data.map((item,id) => ({
                        id: item._id,
                        inv_unit: item.invUnit === null ? '' : item.invUnit.locationName,
                        inv_unit_id: item.invUnit === null ? '' : item.invUnit._id,
                        inv_unit_ruangan:item.invUnit === null ? '' : item.invUnit.locationRoom,
                        inv_ruangan:item.invRoom,
                        inv_kategori_barang: item.invCategoryItem === null || item.invCategoryItem === undefined ? item.invItem.itemCategory : item.invCategoryItem,
                        inv_barang: item.invItem === null ? '' : item.invItem.itemName,
                        inv_barang_id: item.invItem === null ? '' : item.invItem._id,
                        inv_ukuran: item.invSize,
                        inv_merk:item.invMerk,
                        inv_total:item.invTotal,
                        inv_foto:item.invFoto,
                        inv_kondisi:item.invCondition,
                        inv_keterangan:item.invNote,
                        inv_status:item.invStatus
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

    handleSaveData = async (data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11) => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            const data = new FormData();
            data.append('unit_inventori', data1)
            data.append('ruangan_inventori', data2)
            data.append('kategori_barang_inventori', data3)
            data.append('barang_inventori', data4)
            data.append('ukuran_inventori', data5)
            data.append('merk_inventori', data6)
            data.append('total_inventori', data7)   
            data.append('foto_inventori', data8)
            data.append('kondisi_inventori', data9)
            data.append('keterangan_inventori', data10)
            data.append('status_inventori', data11)

            let res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "inventori",data,{
                headers:{
                    "Authorization":"Bearer "+token,
                    'Content-Type': 'multipart/form-data'
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.handleDatas()
                Swal.fire({
                    icon: 'success',
                    title: 'Save Inventori',
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

    handleEditData = async (id,data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11) => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            const data = new FormData();
            data.append('unit_inventori', data1)
            data.append('ruangan_inventori', data2)
            data.append('kategori_barang_inventori', data3)
            data.append('barang_inventori', data4)
            data.append('ukuran_inventori', data5)
            data.append('merk_inventori', data6)
            data.append('total_inventori', data7)   
            data.append('foto_inventori', data8)
            data.append('kondisi_inventori', data9)
            data.append('keterangan_inventori', data10)
            data.append('status_inventori', data11)

            let res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "inventori/" + id,data,{
                headers:{
                    "Authorization":"Bearer "+token
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.handleDatas()
                Swal.fire({
                    icon: 'success',
                    title: 'Edit Inventori',
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
            let res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "inventori/" +id,{
                headers:{
                    "Authorization":"Bearer "+token
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.handleDatas()
                Swal.fire({
                    icon: 'success',
                    title: 'Delete Inventori',
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

    handleListUnit = async () => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            let res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "masterLokasi",{
                headers:{
                    "Authorization":"Bearer "+token
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.setState({
                    dataListUnit: res.data.data.map((item,id) => ({
                        id: item._id,
                        nama_unit: item.locationName,
                        data_ruangan:item.locationRoom,
                        detil_unit: item.locationDetail,
                        keterangan:item.note
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

    handleListBarang = async () => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            
            let res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "masterBarang",{
                headers:{
                    "Authorization":"Bearer "+token
                },
                crossdomain: true
            })
            
            if (res.data.statusCode == '000') {
                this.setState({
                    dataListBarang: res.data.data.map((item,id) => ({
                        id: item._id,
                        id_kategori_barang: item.itemCategory === null || item.itemCategory === undefined ? '' : item.itemCategory._id,
                        nama_barang: item.itemName,
                        merk_barang: item.itemMerk,
                        detil_barang: item.itemDetail,
                        keterangan:item.note
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

    handleListKategori = async () => {
        try {
            let token = this.state.statusTokenBaru === false ? this.props.auth.token : this.state.tokenBaru;
            let res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "masterKategori",{
                headers:{
                    "Authorization":"Bearer "+token
                },
                crossdomain: true
            })

            if (res.data.statusCode == '000') {
                this.setState({
                    dataListKategori: res.data.data.map((item,id) => ({
                        id: item._id,
                        nama_kategori: item.categoryName
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
                            activeInventori={true}
                        />
                        <div id="main">
                            <Navbar></Navbar>
                            <div className="main-content container-fluid">
                                <div className="page-title">
                                    <div className="row">
                                        <div className="col-12 col-md-6 order-md-1 order-last">
                                            <h3>Data Inventori</h3>
                                        </div>
                                        <div className="col-12 col-md-6 order-md-2 order-first">
                                            <nav aria-label="breadcrumb" className='breadcrumb-header'>
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item"><Link href="/home"><a href="#">Dashboard</a></Link></li>
                                                    <li className="breadcrumb-item active" aria-current="page">Data Inventori</li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <Table
                                    menu="inventori"
                                    textButton="Tambah Inventori"
                                    textHeaderModalEdit="Edit Inventori"
                                    headerTable={this.state.header}
                                    dataTable={this.state.dataAll}
                                    handleSave={this.handleSaveData}
                                    handleEdit={this.handleEditData}
                                    handleDelete={this.handleDeleteData}
                                    dataUnit={this.state.dataListUnit}
                                    dataBarang={this.state.dataListBarang}
                                    dataKategori={this.state.dataListKategori}
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

export default connect(mapStateToProps, mapDispatchToProps)(Inventori)