import React from "react"
import {Link} from "react-router-dom"
import "../App.css"

export default function Navbar(props){
    let Logout = () =>{
        localStorage.removeItem("token-rental")
        localStorage.removeItem("karyawan-rental")
        window.location = "/login"
    }

    return(
        <div className="navbar navbar-expand-lg bg-transparent navbar-dark" style={{fontFamily:"Plus Jakarta Display"}}>
            <div className="container" style={{background:"023e8a"}}>
            <div className="col-4 mx-2">
                    <a className="navbar-brand">
                        <b>OKRent</b>
                    </a>
            </div>

            <div className="col-6 d-flex justify-content-center">
                    
                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
 
                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link id="daftarSewa" to="/sewa" className="nav-link">
                                Daftar Sewa
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link  id="mobil" to="/mobil" className="nav-link">
                                Mobil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link  id="pelanggan" to="/pelanggan" className="nav-link">
                                Pelanggan
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link id="karyawan" to="/karyawan" className="nav-link">
                                Karyawan
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-2">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                            <button className="btn btn-primary rounded-pill shadow text-light bg-transparent" type="submit" onClick={() => Logout()}>
                                <span className="fa-solid fa-right-from-bracket"></span> Logout
                            </button>
                        </li>
                </ul>
            </div>
            </div>        
        </div>
    )
}