import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";
import Navbar from "../component/Navbar";

export default function Sewa() {
  if(!localStorage.getItem(`token-rental`)){
    window.location=`./login`
  }
  let [list, setList] = useState([]);
  let [message, setMessage] = useState("")

  let token = localStorage.getItem("token-rental");
  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let getList = () => {
    let endpoint = `http://localhost:8000/sewa`;

    axios
      .get(endpoint, authorization)
      .then((result) => {
        setList(result.data.Sewa);
      })
      .catch((error) => console.log(error));
  };

  let isiData = () => {
    window.location = "./penyewaan";
  };

  let showToast = message => {
    let myToast = new Toast(
      document.getElementById(`myToast`),
        {
          autohide: true
        }
      )
      /** perintah utk mengisi state 'message */
      setMessage(message)

      /** show Toast */
      myToast.show()
  }

  let hapusData = item => {
    if(window.confirm(`Are you sure want to delete this data?`)){
      let endpoint = `http://localhost:8000/sewa/${item.id_sewa}`

      //sending data
      axios.delete(endpoint, authorization)
      .then(response => {
        showToast(response.data.message)
        getList()
      })
      .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="container" style={{ fontFamily: "Plus Jakarta Display" }}>
       {/* start component toast untuk menggantikan alert*/}
       <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1 }}>
        <div className="toast bg-light" id="myToast">
          <div className="toast-header bg-success text-white">
            <strong>Message</strong>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>
      {/* end component toast */}
      <Navbar />
      <div
        className="card-header bg-transparent rounded-3"
        style={{ background: `#001845` }}
      >
        <div className="row">
          <div className="col-lg-10">
            <h2 className="text-white mx-2 my-2">
              <b>List Sewa</b>
            </h2>
          </div>
          <div className="col-lg-2">
            <button
              className="btn btn-primary justify-content-end mx-2 my-2 rounded-pill p-2"
              onClick={() => isiData()}
            >
              <span className="fa fa-plus"></span>Tambah Data
            </button>
          </div>
        </div>
      </div>
      <div className="row mx-0 mt-2 rounded-3"  style={{ background: `#001845` }}>
        {list.map((item) => (
          <ul className="list-group list-group-flush mt-2">
            <li
              className="list-group-item rounded-3"
              key={`key${item.id_sewa}`}
              style={{ background: `#002855` }}
            >
              <div className="row" >
                <div className="col-1 mx-auto align-items-center">
                  <h1 className="text-white">
                    <b>{item.id_sewa}</b>
                  </h1>
                </div>
                <div className="col-10">
                  <div className="row">
                    <div className="col-lg-2 text-white">
                      <small>Pelanggan</small>
                      <h5>{item.pelanggan.nama_pelanggan}</h5>
                    </div>
                    <div className="col-lg-2 text-white">
                      <small>Mobil</small>
                      <h5>{item.mobil.merk}-{item.mobil.nomor_mobil}</h5>
                    </div>
                    <div className="col-lg-2 text-white">
                      <small>Biaya Sewa</small>
                      <h5>{item.total_bayar}</h5>
                    </div>
                    <div className="col-lg-3 text-white">
                      <small>Tanggal Sewa</small>
                      <h5>{item.tgl_sewa}</h5>
                    </div>
                    <div className="col-lg-2 text-white">
                      <small>Tanggal Kembali</small>
                      <h5>{item.tgl_kembali}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="col-lg-12 text-white">
                    <small>Actions</small>
                    <br />
                    <button className="btn btn-danger btn-sm mt-2" onClick={() => hapusData(item)}>
                      <span className="fa fa-trash" ></span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
