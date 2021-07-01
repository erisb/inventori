import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'next/link';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeClassDashboard: this.props.activeDashboard,
            activeClassMaster: this.props.activeMaster,
            activeClassInventori: this.props.activeInventori,
            activeClassUser: this.props.activeUser,
        }
    }

    render() {
        return (
            <div id="sidebar" className='active'>
                <div className="sidebar-wrapper active">
                    <div className="sidebar-header">
                        <h1>Inventori</h1>
                    </div>
                    <div className="sidebar-menu">
                        <ul className="menu">
                            <li className={this.state.activeClassDashboard == true ? "sidebar-item active" : "sidebar-item"}>
                                <Link href="/home"><a href="#" className='sidebar-link'>
                                    <i data-feather="home" width="20"></i>
                                    <span>Dashboard</span>
                                </a></Link>

                            </li>
                            <li className={this.state.activeClassMaster == true ? "sidebar-item  has-sub active" : "sidebar-item  has-sub"}>
                                <a href="#" className='sidebar-link'>
                                    <i data-feather="file-text" width="20"></i>
                                    <span>Data Master</span>
                                </a>

                                <ul className="submenu ">

                                    <li>
                                        <Link href="/master_ruangan"><a href="#">Master Ruang</a></Link>
                                    </li>

                                    <li>
                                        <Link href="/master_unit"><a href="#">Master Unit</a></Link>
                                    </li>

                                    <li>
                                        <Link href="/master_kategori"><a href="#">Master Kategori Barang</a></Link>
                                    </li>

                                    <li>
                                        <Link href="/master_barang"><a href="#">Master Barang</a></Link>
                                    </li>

                                </ul>

                            </li>

                            <li className={this.state.activeClassInventori == true ? "sidebar-item active" : "sidebar-item"}>
                                <Link href="/inventori"><a href="#" className='sidebar-link'>
                                    <i data-feather="file-text" width="20"></i>
                                    <span>Data Inventori</span>
                                </a></Link>
                            </li>

                            <li className={this.state.activeClassUser == true ? "sidebar-item active" : "sidebar-item"}>
                                <Link href="/user"><a href="#" className='sidebar-link'>
                                    <i data-feather="file-text" width="20"></i>
                                    <span>Data Users</span>
                                </a></Link>
                            </li>
                        </ul>
                    </div>
                    <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)