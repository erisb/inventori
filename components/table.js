import React, { Component } from "react";
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialTable from "material-table";


class Table extends Component {
    constructor(props) {
        super(props);
        this.fileInputAdd = React.createRef(),
        this.fileInputEdit = React.createRef(),
        this.state = {
            valNamaRuangan:'',
            valDetilRuangan:'',
            valKeteranganRuangan:'',
            valIdRuangan:'',
            valNamaUnit:'',
            valOrderUnit:0,
            valDetilUnit:'',
            valKeteranganUnit:'',
            valIdUnit:'',
            valListRuanganUnit:[],
            dataRooms: [],
            valKategoriBarang:'',
            valNamaBarang:'',
            valDetilBarang:'',
            valKeteranganBarang:'',
            valIdBarang:'',
            valMerkBarang:'',
            valIdInventori:'',
            valKategoriInventori:'',
            valBarangInventori:'',
            valMerkInventori:'',
            valUkuranInventori:'',
            valUnitInventori:'',
            valRuanganInventori:'',
            valTotalInventori:'',
            valFotoInventori:'',
            valKondisiInventori:'',
            valKeteranganInventori:'',
            valStatusInventori:'',
            dataRoomsInventori:[],
            valNamaUser:'',
            valEmailUser:'',
            valPasswordUser:'',
            valIdUser:'',
            valIdKategori:'',
            valNamaKategori:'',
            valDetilKategori:''
        }
    }

    handleOpenModalSave = () => {
        document.getElementById("btnModalSave").click()
        document.getElementById("formSave").reset()
    }

    handleCloseModalSave = () => {
        document.getElementById("closeModalSave").click()
        this.setState({
            valNamaRuangan:'',
            valDetilRuangan:'',
            valKeteranganRuangan:'',
            valIdRuangan:'',
            valNamaUnit:'',
            valOrderUnit:0,
            valDetilUnit:'',
            valKeteranganUnit:'',
            valIdUnit:'',
            valListRuanganUnit:[],
            dataRooms: [],
            valKategoriBarang:'',
            valNamaBarang:'',
            valDetilBarang:'',
            valKeteranganBarang:'',
            valIdBarang:'',
            valMerkBarang:'',
            valIdInventori:'',
            valKategoriInventori:'',
            valBarangInventori:'',
            valMerkInventori:'',
            valUkuranInventori:'',
            valUnitInventori:'',
            valRuanganInventori:'',
            valTotalInventori:'',
            valFotoInventori:'',
            valKondisiInventori:'',
            valKeteranganInventori:'',
            valStatusInventori:'',
            dataRoomsInventori:[],
            valNamaUser:'',
            valEmailUser:'',
            valPasswordUser:'',
            valIdUser:'',
            valIdKategori:'',
            valNamaKategori:'',
            valDetilKategori:''
        })
    }

    handleCloseModalEdit = () => {
        document.getElementById("closeModalEdit").click()
        this.setState({
            valNamaRuangan:'',
            valDetilRuangan:'',
            valKeteranganRuangan:'',
            valIdRuangan:'',
            valNamaUnit:'',
            valOrderUnit:0,
            valDetilUnit:'',
            valKeteranganUnit:'',
            valIdUnit:'',
            valListRuanganUnit:[],
            dataRooms: [],
            valKategoriBarang:'',
            valNamaBarang:'',
            valDetilBarang:'',
            valKeteranganBarang:'',
            valIdBarang:'',
            valMerkBarang:'',
            valIdInventori:'',
            valKategoriInventori:'',
            valBarangInventori:'',
            valMerkInventori:'',
            valUkuranInventori:'',
            valUnitInventori:'',
            valRuanganInventori:'',
            valTotalInventori:'',
            valFotoInventori:'',
            valKondisiInventori:'',
            valKeteranganInventori:'',
            valStatusInventori:'',
            dataRoomsInventori:[],
            valNamaUser:'',
            valEmailUser:'',
            valPasswordUser:'',
            valIdUser:'',
            valIdKategori:'',
            valNamaKategori:'',
            valDetilKategori:''
        })
    }

    handleShowModalEditRuangan(id,nama,detil,keterangan){
        document.getElementById("btnModaledit").click()
        this.setState({
            valIdRuangan:id,
            valNamaRuangan:nama,
            valDetilRuangan:detil,
            valKeteranganRuangan:keterangan
        })
    }

    handleShowModalEditUnit(id,nama,order,detil,keterangan,ruangan){
        document.getElementById("btnModaledit").click()
        document.getElementById("formEdit").reset()
        this.setState({
            valIdUnit:id,
            valNamaUnit:nama,
            valOrderUnit:order,
            valDetilUnit:detil,
            valKeteranganUnit:keterangan,
            valListRuanganUnit:ruangan
        })
        ruangan.map((value, index) => {
            this.state.dataRooms.push(value.nameRoom);
        })
    }

    handleShowModalEditBarang(id,kategori,nama,merk,detil,keterangan){
        document.getElementById("btnModaledit").click()
        this.setState({
            valIdBarang:id,
            valKategoriBarang:kategori,
            valNamaBarang:nama,
            valMerkBarang:merk,
            valDetilBarang:detil,
            valKeteranganBarang:keterangan
        })
    }

    handleShowModalEditInventori(id,kategori_barang,barang,merk,ukuran,unit,unitRuangan,ruangan,total,foto,kondisi,keterangan,status){
        document.getElementById("btnModaledit").click()
        this.setState({
            valIdInventori:id,
            valKategoriInventori:kategori_barang,
            valBarangInventori:barang,
            valMerkInventori:merk,
            valUkuranInventori:ukuran,
            valUnitInventori:unit,
            dataRoomsInventori:unitRuangan,
            valRuanganInventori:ruangan,
            valTotalInventori:total,
            valFotoInventori:foto,
            valKondisiInventori:kondisi,
            valKeteranganInventori:keterangan,
            valStatusInventori:status
        })
    }

    handleShowModalEditUser(id,nama,email,password){
        document.getElementById("btnModaledit").click()
        this.setState({
            valIdUser:id,
            valNamaUser:nama,
            valEmailUser:email,
            valPasswordUser:password
        })
    }

    handleShowModalEditKategori(id,nama,detil){
        document.getElementById("btnModaledit").click()
        this.setState({
            valIdKategori:id,
            valNamaKategori:nama,
            valDetilKategori:detil
        })
    }

    handleSaveData = () => {
        document.getElementById("formSave").reset()
        if (this.props.menu === 'master_ruangan') {
            this.props.handleSave(this.state.valNamaRuangan,this.state.valDetilRuangan,this.state.valKeteranganRuangan)
            document.getElementById("closeModalSave").click()
        } else if (this.props.menu === 'master_unit') {
            this.props.handleSave(this.state.valNamaUnit,this.state.valListRuanganUnit,this.state.valOrderUnit,this.state.valDetilUnit,this.state.valKeteranganUnit)
            document.getElementById("closeModalSave").click()
        } else if (this.props.menu === 'master_barang') {
            this.props.handleSave(this.state.valKategoriBarang,this.state.valNamaBarang,this.state.valMerkBarang,this.state.valDetilBarang,this.state.valKeteranganBarang)
            document.getElementById("closeModalSave").click()
        } else if (this.props.menu === 'inventori') {
            this.props.handleSave(this.state.valUnitInventori,this.state.valRuanganInventori,this.state.valKategoriInventori,this.state.valBarangInventori,this.state.valUkuranInventori,this.state.valMerkInventori,this.state.valTotalInventori,this.state.valFotoInventori,this.state.valKondisiInventori,this.state.valKeteranganInventori,this.state.valStatusInventori)
            document.getElementById("closeModalSave").click()
        } else if (this.props.menu === 'master_user') {
            this.props.handleSave(this.state.valNamaUser,this.state.valEmailUser,this.state.valPasswordUser)
            document.getElementById("closeModalSave").click()
        } else if (this.props.menu === 'master_kategori_barang') {
            this.props.handleSave(this.state.valNamaKategori,this.state.valDetilKategori)
            document.getElementById("closeModalSave").click()
        } else {
            console.log("Tidak ada action")
        }
    }

    handleEditData = () => {
        if (this.props.menu === 'master_ruangan') {
            this.props.handleEdit(this.state.valIdRuangan,this.state.valNamaRuangan,this.state.valDetilRuangan,this.state.valKeteranganRuangan)
            document.getElementById("closeModalEdit").click()
        } else if (this.props.menu === 'master_unit') {
            this.props.handleEdit(this.state.valIdUnit,this.state.valNamaUnit,this.state.valListRuanganUnit,this.state.valOrderUnit,this.state.valDetilUnit,this.state.valKeteranganUnit)
            document.getElementById("closeModalEdit").click()
        } else if (this.props.menu === 'master_barang') {
            this.props.handleEdit(this.state.valIdBarang,this.state.valKategoriBarang,this.state.valNamaBarang,this.state.valMerkBarang,this.state.valDetilBarang,this.state.valKeteranganBarang)
            document.getElementById("closeModalEdit").click()
        } else if (this.props.menu === 'inventori') {
            this.props.handleEdit(this.state.valIdInventori,this.state.valUnitInventori,this.state.valRuanganInventori,this.state.valKategoriInventori,this.state.valBarangInventori,this.state.valUkuranInventori,this.state.valMerkInventori,this.state.valTotalInventori,this.state.valFotoInventori,this.state.valKondisiInventori,this.state.valKeteranganInventori,this.state.valStatusInventori)
            document.getElementById("closeModalEdit").click()
        } else if (this.props.menu === 'master_user') {
            this.props.handleEdit(this.state.valIdUser,this.state.valNamaUser,this.state.valEmailUser,this.state.valPasswordUser)
            document.getElementById("closeModalEdit").click()
        } else if (this.props.menu === 'master_kategori_barang') {
            this.props.handleEdit(this.state.valIdKategori,this.state.valNamaKategori,this.state.valDetilKategori)
            document.getElementById("closeModalEdit").click()
        } else {
            console.log("Tidak ada action")
        }
    }

    confirmDelete(el) {
        Swal.fire({
            title: 'Hapus',
            text: "Yakin Mau DiHapus?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Tidak'
        })
        .then((result) => {
            if (result.isConfirmed) {
                this.props.handleDelete(el);
            }
        })
    };

    handleCheckBoxRoom = (e) => {
        let id = e.target.id;
        if (document.getElementById(id).checked == true) {
            this.state.valListRuanganUnit.push({ nameRoom: document.getElementById(id).value })
        } else {
            this.state.valListRuanganUnit.some(room => { if (room.nameRoom === document.getElementById(id).value) this.state.valListRuanganUnit.splice(this.state.valListRuanganUnit.indexOf(room), 1) });
        }
    }

    handleFile = () => {
        let elInput = document.getElementById("inv_foto");
        if (this.fileInputAdd.current != undefined && this.fileInputAdd.current.click != undefined) {
            this.fileInputAdd.current.click();
            if (this.fileInputAdd.current.files[0]) {
                this.setState({ valFotoInventori: this.fileInputAdd.current.files[0] });
                // elInput.value = this.fileInput.current.files[0].name;
                // document.getElementById("image-preview").style.display = "block";
                // let oFReader = new FileReader();
                // oFReader.readAsDataURL(this.fileInput.current.files[0]);
                // oFReader.onload = function (oFREvent) {
                //     document.getElementById("image-preview").src = oFREvent.target.result;
                // };
            }
        }
    };

    handleFileEdit = () => {
        let elInput = document.getElementById("edit_inv_foto");
        if (this.fileInputEdit.current != undefined && this.fileInputEdit.current.click != undefined) {
            this.fileInputEdit.current.click();
            if (this.fileInputEdit.current.files[0]) {
                this.setState({ valFotoInventori: this.fileInputEdit.current.files[0] });
                // elInput.value = this.fileInput.current.files[0].name;
                // document.getElementById("image-preview").style.display = "block";
                // let oFReader = new FileReader();
                // oFReader.readAsDataURL(this.fileInput.current.files[0]);
                // oFReader.onload = function (oFREvent) {
                //     document.getElementById("image-preview").src = oFREvent.target.result;
                // };
            }
        }
    };

    showPassword = (e) => {
        e.preventDefault();
        let x = document.getElementById("password_user");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    showPasswordEdit = (e) => {
        e.preventDefault();
        let x = document.getElementById("edit_password_user");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    render() {
        let formSave,formEdit,listRuanganAdd,listRuanganEdit,listUnit,listRuang,listKategori,listBarang;

        if (this.props.menu === 'master_ruangan') {

            formSave =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama Ruangan</label>
                                <input type="text" id="nama_ruangan" className="form-control" placeholder="Nama Ruangan" name="nama_ruangan" onChange={(event) => this.setState({ valNamaRuangan: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Detil Ruangan</label>
                                <textarea type="text" id="detil_ruangan" className="form-control" placeholder="Detil Ruangan" name="detil_ruangan" rows="3" onChange={(event) => this.setState({ valDetilRuangan: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Keterangan</label>
                                <textarea type="text" id="keterangan_ruangan" className="form-control" placeholder="Keterangan" name="keterangan_ruangan" rows="3" onChange={(event) => this.setState({ valKeteranganRuangan: event.target.value })}/>
                            </div>
                        </div>
                    </div>
                </div>
            );

            formEdit =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama Ruangan</label>
                                <input type="text" id="edit_nama_ruangan" className="form-control" placeholder="Nama Ruangan" name="nama_ruangan" defaultValue={this.state.valNamaRuangan} onChange={(event) => this.setState({ valNamaRuangan: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Detil Ruangan</label>
                                <textarea type="text" id="edit_detil_ruangan" className="form-control" placeholder="Detil Ruangan" name="detil_ruangan" rows="3" defaultValue={this.state.valDetilRuangan} onChange={(event) => this.setState({ valDetilRuangan: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Keterangan</label>
                                <textarea type="text" id="edit_keterangan_ruangan" className="form-control" placeholder="Keterangan" name="keterangan_ruangan" rows="3" defaultValue={this.state.valKeteranganRuangan} onChange={(event) => this.setState({ valKeteranganRuangan: event.target.value })}/>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else if (this.props.menu === 'master_unit') {

            listRuanganAdd = this.props.dataRuangan.map((value,index) => {
                return (
                    <div key={index} className="checkbox">
                        <input name={`ruang-${index}`} className='form-check-input' id={`ruang-${index}`} value={value.nama_ruangan} type="checkbox" onChange={(e) => this.state.valListRuanganUnit.push({ nameRoom: e.target.value })}/>
                        <label htmlFor="checkbox2">{value.nama_ruangan}</label>
                    </div>
                    
                );
            });

            listRuanganEdit = this.props.dataRuangan.map((value,index) => {
                return (
                    <div key={index} className="checkbox">
                        <input name={`ruang_edit-${index}`} className='form-check-input' id={`ruang_edit-${index}`} value={value.nama_ruangan} type="checkbox" onClick={this.handleCheckBoxRoom} defaultChecked={this.state.dataRooms.includes(value.nama_ruangan) == true ? "checked" : ""}/>
                        <label htmlFor="checkbox2">{value.nama_ruangan}</label>
                    </div>
                    
                );
            });

            formSave =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama Unit</label>
                                <input type="text" id="nama_unit" className="form-control" placeholder="Nama Unit" name="nama_unit" onChange={(event) => this.setState({ valNamaUnit: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">List Ruangan</label>
                                <div className="form-check">
                                    {listRuanganAdd}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Order Unit</label>
                                <input type="number" id="order_unit" className="form-control" placeholder="Order Unit" name="order_unit" onChange={(event) => this.setState({ valOrderUnit: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Detil Unit</label>
                                <textarea type="text" id="detil_unit" className="form-control" placeholder="Detil Unit" name="detil_unit" rows="3" onChange={(event) => this.setState({ valDetilUnit: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Keterangan</label>
                                <textarea type="text" id="keterangan_unit" className="form-control" placeholder="Keterangan" name="keterangan_unit" rows="3" onChange={(event) => this.setState({ valKeteranganUnit: event.target.value })}/>
                            </div>
                        </div>
                    </div>
                </div>
            );

            formEdit =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama UNit</label>
                                <input type="text" id="edit_nama_unit" className="form-control" placeholder="Nama Unit" name="nama_unit" defaultValue={this.state.valNamaUnit} onChange={(event) => this.setState({ valNamaUnit: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">List Ruangan</label>
                                <div className="form-check">
                                    {listRuanganEdit}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Order Unit</label>
                                <input type="number" id="edit_order_unit" className="form-control" placeholder="Order Unit" name="order_unit" defaultValue={this.state.valOrderUnit} onChange={(event) => this.setState({ valOrderUnit: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Detil Unit</label>
                                <textarea type="text" id="edit_detil_unit" className="form-control" placeholder="Detil Unit" name="detil_unit" rows="3" defaultValue={this.state.valDetilUnit} onChange={(event) => this.setState({ valDetilUnit: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Keterangan</label>
                                <textarea type="text" id="edit_keterangan_unit" className="form-control" placeholder="Keterangan" name="keterangan_unit" rows="3" defaultValue={this.state.valKeteranganUnit} onChange={(event) => this.setState({ valKeteranganUnit: event.target.value })}/>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else if (this.props.menu === 'master_barang') {

            listKategori = this.props.dataKategori.map((value,index) => {
                if (value.id === this.state.valKategoriBarang){
                    return (
                        <option key={index} value={value.id} selected="selected">{value.nama_kategori}</option>
                    );
                } else {
                    return (
                        <option key={index} value={value.id}>{value.nama_kategori}</option>
                    );
                }
            });

            formSave =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Kategori Barang</label>
                                <select className="form-select" name="kategori_barang" id="kategori_barang" onChange={(event) => this.setState({ valKategoriBarang: event.target.value})}>
                                    <option value="">--Pilih Kategori--</option>
                                    {listKategori}
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama Barang</label>
                                <input type="text" id="nama_barang" className="form-control" placeholder="Nama Barang" name="nama_barang" onChange={(event) => this.setState({ valNamaBarang: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Merk Barang</label>
                                <input type="text" id="merk_barang" className="form-control" placeholder="Merk Barang" name="merk_barang" onChange={(event) => this.setState({ valMerkBarang: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Detil Barang</label>
                                <textarea type="text" id="detil_barang" className="form-control" placeholder="Detil Barang" name="detil_barang" rows="3" onChange={(event) => this.setState({ valDetilBarang: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Keterangan</label>
                                <textarea type="text" id="keterangan_barang" className="form-control" placeholder="Keterangan" name="keterangan_barang" rows="3" onChange={(event) => this.setState({ valKeteranganBarang: event.target.value })}/>
                            </div>
                        </div>
                    </div>
                </div>
            );

            formEdit =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Kategori Barang</label>
                                <select className="form-select" name="edit_kategori_barang" id="edit_kategori_barang" onChange={(event) => this.setState({ valKategoriBarang: event.target.value})}>
                                    <option value="">--Pilih Kategori--</option>
                                    {listKategori}
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama Barang</label>
                                <input type="text" id="edit_nama_ruangan" className="form-control" placeholder="Nama Ruangan" name="nama_ruangan" defaultValue={this.state.valNamaBarang} onChange={(event) => this.setState({ valNamaBarang: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Merk Barang</label>
                                <input type="text" id="edit_merk_barang" className="form-control" placeholder="Merk barang" name="merk_barang" defaultValue={this.state.valMerkBarang} onChange={(event) => this.setState({ valMerkBarang: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Detil Barang</label>
                                <textarea type="text" id="edit_detil_barang" className="form-control" placeholder="Detil Barang" name="detil_barang" rows="3" defaultValue={this.state.valDetilBarang} onChange={(event) => this.setState({ valDetilBarang: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Keterangan</label>
                                <textarea type="text" id="edit_keterangan_barang" className="form-control" placeholder="Keterangan" name="keterangan_barang" rows="3" defaultValue={this.state.valKeteranganBarang} onChange={(event) => this.setState({ valKeteranganBarang: event.target.value })}/>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else if (this.props.menu === 'inventori') {

            listBarang = this.props.dataBarang.map((value,index) => {
                if (value.id === this.state.valBarangInventori){
                    return (
                        <option key={index} value={value.id} data-merk={value.merk_barang} data-category={value.id_kategori_barang} selected="selected">{value.nama_barang}</option>
                    );
                } else {
                    return (
                        <option key={index} value={value.id} data-merk={value.merk_barang} data-category={value.id_kategori_barang}>{value.nama_barang}</option>
                    );
                }
            });

            listUnit = this.props.dataUnit.map((value,index) => {
                if (value.id === this.state.valUnitInventori){
                    return (
                        <option key={index} value={value.id} data-ruang={encodeURIComponent(JSON.stringify(value.data_ruangan))} selected="selected">{value.nama_unit}</option>
                    );
                } else {
                    return (
                        <option key={index} value={value.id} data-ruang={encodeURIComponent(JSON.stringify(value.data_ruangan))}>{value.nama_unit}</option>
                    );
                }
            });

            listRuang = this.state.dataRoomsInventori.map((value,index) => {
                return (
                    <option key={index} value={value.nameRoom}>{value.nameRoom}</option>
                );
            });

            formSave =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama Barang</label>
                                <select className="form-select" name="inv_nama_barang" id="inv_nama_barang" onChange={(event) => this.setState({ valBarangInventori: event.target.value, valMerkInventori: event.target.options[event.target.selectedIndex].dataset.merk, valKategoriInventori:event.target.options[event.target.selectedIndex].dataset.category})}>
                                    <option value="0">--Pilih Barang--</option>
                                    {listBarang}
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Merk Barang</label>
                                <input type="text" id="inv_merk_barang" className="form-control" placeholder="Merk Barang" name="inv_merk_barang" defaultValue={this.state.valMerkInventori} disabled="disabled"/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Ukuran Barang</label>
                                <input type="text" id="inv_ukuran_barang" className="form-control" placeholder="Ukuran Barang" name="inv_ukuran_barang" onChange={(event) => this.setState({ valUkuranInventori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Unit</label>
                                <select className="form-select" name="inv_unit" id="inv_unit" onChange={(event) => this.setState({ valUnitInventori: event.target.value, dataRoomsInventori: JSON.parse(decodeURIComponent(event.target.options[event.target.selectedIndex].dataset.ruang))})}>
                                    <option value="0" data-ruang={encodeURIComponent(JSON.stringify([]))}>--Pilih Unit--</option>
                                    {listUnit}
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Ruangan</label>
                                <select className="form-select" name="inv_ruangan" id="inv_ruangan" onChange={(event) => this.setState({ valRuanganInventori: event.target.value})}>
                                    <option value="0">--Pilih Ruangan--</option>
                                    {listRuang}
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Total</label>
                                <input type="text" id="inv_total" className="form-control" placeholder="Total" name="inv_total" onChange={(event) => this.setState({ valTotalInventori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Foto</label>
                                <input type="file" id="inv_foto" className="form-control" placeholder="foto" name="inv_foto" ref={this.fileInputAdd} onChange={this.handleFile}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Kondisi</label>
                                <input type="text" id="inv_kondisi" className="form-control" placeholder="Kondisi" name="inv_kondisi" onChange={(event) => this.setState({ valKondisiInventori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Keterangan</label>
                                <textarea type="text" id="inv_keterangan" className="form-control" placeholder="Keterangan" name="inv_keterangan" rows="3" onChange={(event) => this.setState({ valKeteranganInventori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Status</label>
                                <select className="form-select" name="inv_status" id="inv_status" onChange={(event) => this.setState({ valStatusInventori: event.target.value})}>
                                    <option value="">--Pilih Status--</option>
                                    <option value="Aman">Aman</option>
                                    <option value="Butuh Check">Butuh Check</option>
                                    <option value="Menunggu Vendor">Menunggu Vendor</option>
                                    <option value="Dalam Perbaikan">Dalam Perbaikan</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            );

            formEdit =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama Barang</label>
                                <select className="form-select" name="edit_inv_nama_barang" id="edit_inv_nama_barang" onChange={(event) => this.setState({ valBarangInventori: event.target.value, valMerkInventori: event.target.options[event.target.selectedIndex].dataset.merk,valKategoriInventori:event.target.options[event.target.selectedIndex].dataset.category})}>
                                    <option value="0">--Pilih Barang--</option>
                                    {listBarang}
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Merk Barang</label>
                                <input type="text" id="edit_inv_merk_barang" className="form-control" placeholder="Merk Barang" name="edit_inv_merk_barang" defaultValue={this.state.valMerkInventori} disabled="disabled"/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Ukuran Barang</label>
                                <input type="text" id="edit_inv_ukuran_barang" className="form-control" placeholder="Ukuran Barang" name="edit_inv_ukuran_barang" defaultValue={this.state.valUkuranInventori} onChange={(event) => this.setState({ valUkuranInventori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Unit</label>
                                <select className="form-select" name="edit_inv_unit" id="edit_inv_unit" onChange={(event) => this.setState({ valUnitInventori: event.target.value, dataRoomsInventori: JSON.parse(decodeURIComponent(event.target.options[event.target.selectedIndex].dataset.ruang))})}>
                                    <option value="0">--Pilih Unit--</option>
                                    {listUnit}
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Ruangan</label>
                                <select className="form-select" name="edit_inv_ruangan" id="edit_inv_ruangan" value={this.state.valRuanganInventori} onChange={(event) => this.setState({ valRuanganInventori: event.target.value})}>
                                    <option value="0">--Pilih Ruangan--</option>
                                    {listRuang}
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Total</label>
                                <input type="text" id="edit_inv_total" className="form-control" placeholder="Total" name="edit_inv_total" defaultValue={this.state.valTotalInventori} onChange={(event) => this.setState({ valTotalInventori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Foto</label>
                                <input type="file" id="edit_inv_foto" className="form-control" placeholder="foto" name="edit_inv_foto" defaultValue={this.state.valFotoInventori} ref={this.fileInputEdit} onChange={this.handleFileEdit}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Kondisi</label>
                                <input type="text" id="edit_inv_kondisi" className="form-control" placeholder="Kondisi" name="edit_inv_kondisi" defaultValue={this.state.valKondisiInventori} onChange={(event) => this.setState({ valKondisiInventori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="city-column">Keterangan</label>
                                <textarea type="text" id="edit_inv_keterangan" className="form-control" placeholder="Keterangan" name="edit_inv_keterangan" rows="3" defaultValue={this.state.valKeteranganInventori} onChange={(event) => this.setState({ valKeteranganInventori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Status</label>
                                <select className="form-select" name="edit_inv_status" id="edit_inv_status" value={this.state.valStatusInventori} onChange={(event) => this.setState({ valStatusInventori: event.target.value})}>
                                    <option value="">--Pilih Status--</option>
                                    <option value="Aman">Aman</option>
                                    <option value="Butuh Check">Butuh Check</option>
                                    <option value="Menunggu Vendor">Menunggu Vendor</option>
                                    <option value="Dalam Perbaikan">Dalam Perbaikan</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else if (this.props.menu === 'master_user') {

            formSave =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama User</label>
                                <input type="text" id="nama_user" className="form-control" placeholder="Nama User" name="nama_user" onChange={(event) => this.setState({ valNamaUser: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Email User</label>
                                <input type="email" id="email_user" className="form-control" placeholder="Email User" name="email_user" onChange={(event) => this.setState({ valEmailUser: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Password User</label>
                                <input type="password" id="password_user" className="form-control" placeholder="Password User" name="password_user" onChange={(event) => this.setState({ valPasswordUser: event.target.value })}/><a onClick={this.showPassword}><i className="fa fa-eye fa-fw" style={{ color: "#20b2aa", paddingRight: "20px", marginTop: "-25px", zIndex: "2", position: "relative", float: "right"}}></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            );

            formEdit =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama User</label>
                                <input type="text" id="edit_nama_user" className="form-control" placeholder="Nama User" name="edit_nama_user" defaultValue={this.state.valNamaUser} onChange={(event) => this.setState({ valNamaUser: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Email User</label>
                                <input type="email" id="edit_email_user" className="form-control" placeholder="Email User" name="edit_email_user" defaultValue={this.state.valEmailUser} onChange={(event) => this.setState({ valEmailUser: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="last-name-column">Password User</label>
                                <input type="password" id="edit_password_user" className="form-control" placeholder="Password User" name="edit_password_user" defaultValue={this.state.valPasswordUser} onChange={(event) => this.setState({ valPasswordUser: event.target.value })}/><a onClick={this.showPasswordEdit}><i className="fa fa-eye fa-fw" style={{ color: "#20b2aa", paddingRight: "20px", marginTop: "-25px", zIndex: "2", position: "relative", float: "right"}}></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else if (this.props.menu === 'master_kategori_barang') {

            formSave =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama Kategori</label>
                                <input type="text" id="nama_kategori" className="form-control" placeholder="Nama Kategori" name="nama_kategori" onChange={(event) => this.setState({ valNamaKategori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Detil Kategori</label>
                                <input type="text" id="detil_kategori" className="form-control" placeholder="Detil Kategori" name="detil_kategori" onChange={(event) => this.setState({ valDetilKategori: event.target.value })}/>
                            </div>
                        </div>
                    </div>
                </div>
            );

            formEdit =(
                <div className="form-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Nama Kategori</label>
                                <input type="text" id="edit_nama_kategori" className="form-control" placeholder="Nama Kategori" name="edit_nama_kategori" defaultValue={this.state.valNamaKategori} onChange={(event) => this.setState({ valNamaKategori: event.target.value })}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="first-name-column">Detil Kategori</label>
                                <input type="text" id="edit_detil_kategori" className="form-control" placeholder="Detil Kategori" name="edit_detil_kategori" defaultValue={this.state.valDetilKategori} onChange={(event) => this.setState({ valDetilKategori: event.target.value })}/>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else {

            formSave='';
            formEdit='';
            
        }

        return (
            <section className="section">
                <div className="card-header">
                    <button className="btn btn-primary round" data-bs-toggle="modal" data-bs-target="#saveData" data-bs-backdrop="false" id="btnModalSave" onClick={this.handleOpenModalSave}>{this.props.textButton}</button>
                    <button className="btn btn-primary round" data-bs-toggle="modal" data-bs-target="#editData" data-bs-backdrop="false" id="btnModaledit" style={{display:"none"}}></button>
                </div>
                <div className="card">
                    <div className="card-body">
                        <MaterialTable
                            columns={this.props.headerTable}
                            data={this.props.dataTable}
                            actions={[
                                {
                                  icon: 'edit',
                                  tooltip: 'Ubah',
                                  onClick: (event, rowData) => this.props.menu === 'master_ruangan' ? this.handleShowModalEditRuangan(rowData.id,rowData.nama_ruangan,rowData.detil_ruangan,rowData.keterangan) : this.props.menu === 'master_unit' ? this.handleShowModalEditUnit(rowData.id,rowData.nama_unit,rowData.order_unit,rowData.detil_unit,rowData.keterangan,rowData.data_ruangan) : this.props.menu === 'master_barang' ? this.handleShowModalEditBarang(rowData.id,rowData.id_kategori_barang,rowData.nama_barang,rowData.merk_barang,rowData.detil_barang,rowData.keterangan) : this.props.menu === 'inventori' ? this.handleShowModalEditInventori(rowData.id,rowData.inv_kategori_barang,rowData.inv_barang_id,rowData.inv_merk,rowData.inv_ukuran,rowData.inv_unit_id,rowData.inv_unit_ruangan,rowData.inv_ruangan,rowData.inv_total,rowData.inv_foto,rowData.inv_kondisi,rowData.inv_keterangan,rowData.inv_status) : this.props.menu === 'master_user' ? this.handleShowModalEditUser(rowData.id,rowData.nama_user,rowData.email_user,rowData.password_user) : this.props.menu === 'master_kategori_barang' ? this.handleShowModalEditKategori(rowData.id,rowData.nama_kategori,rowData.detil_kategori) : console.log("Tidak ada Action")
                                },
                                {
                                  icon: 'delete',
                                  tooltip: 'Hapus',
                                  onClick: (event, rowData) => this.confirmDelete(rowData.id)
                                }
                            ]}
                            options={{
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    backgroundColor: '#5a8dee',
                                }
                            }}
                            title=""
                        />
                    </div>
                </div>

                <div className="modal fade text-left" id="saveData" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel33" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h4 className="modal-title white" id="myModalLabel33">{this.props.textButton}</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" id="closeModalSave" onClick={this.handleCloseModalSave}>
                                    <i data-feather="x"></i>
                                </button>
                            </div>
                            
                            <div className="modal-body">
                                <form className="modal-body form form-vertical" id="formSave">
                                    {formSave}
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary ml-1 round" onClick={this.handleSaveData}>Submit</button>
                                <button type="reset" className="btn btn-light-secondary round" onClick={(e)=>document.getElementById("formSave").reset()}>Reset</button>
                            </div> 
                            
                        </div>
                    </div>
                </div>

                <div className="modal fade text-left" id="editData" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel33" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h4 className="modal-title white" id="myModalLabel33">{this.props.textHeaderModalEdit}</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" id="closeModalEdit" onClick={this.handleCloseModalEdit}>
                                    <i data-feather="x"></i>
                                </button>
                            </div>
                            
                            <div className="modal-body">
                                <form className="modal-body form form-vertical" id="formEdit">
                                    {formEdit}
                                </form>
                            </div>
                            
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary ml-1 round" onClick={this.handleEditData}>Edit</button>
                                <button type="reset" className="btn btn-light-secondary round">Reset</button>
                            </div> 
                            
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state
    return { auth }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
    },dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Table)