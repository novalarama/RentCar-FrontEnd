import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";
import { Modal } from "bootstrap";
import Navbar from "../component/Navbar";
export default function Pelanggan() {
  if (!localStorage.getItem(`token-rental`)) {
    window.location = `./login`;
  }
  let [pelanggan, setPelanggan] = useState([]);

  let [idPelanggan, setIdPelanggan] = useState("");
  let [nama, setNama] = useState("");
  let [alamat, setAlamat] = useState("");
  let [kontak, setKontak] = useState("");

  let [action, setAction] = useState("");
  let [message, setMessage] = useState("");
  let [modal, setModal] = useState(null);

  /** get token from local storage */
  let token = localStorage.getItem(`token-rental`);

  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let getPelanggan = () => {
    let endpoint = `http://localhost:8000/pelanggan`;

    axios
      .get(endpoint, authorization)
      .then((response) => {
        setPelanggan(response.data.Pelanggan);
      })
      .catch((error) => console.log(error));
  };

  /** create function to show Toast */
  let showToast = (message) => {
    let myToast = new Toast(document.getElementById(`myToast`), {
      autohide: true,
    });
    /** perintah utk mengisi state 'message */
    setMessage(message);

    /** show Toast */
    myToast.show();
  };

  let tambahPelanggan = () => {
    // display modal
    modal.show();

    // mengosongkan inputan form nya
    setIdPelanggan(0);
    setNama("");
    setAlamat("");
    setKontak("");
    setAction("insert");
  };

  let editPelanggan = (item) => {
    // display modal
    modal.show();

    // isi form sesuai data yg dipilih
    setIdPelanggan(item.id_pelanggan);
    setNama(item.nama_pelanggan);
    setAlamat(item.alamat_pelanggan);
    setKontak(item.kontak);
    setAction(`edit`);
  };

  let hapusPelanggan = (item) => {
    if (window.confirm(`Are you sure want to delete this data?`)) {
      let endpoint = `http://localhost:8000/pelanggan/${item.id_pelanggan}`;

      //sending data
      axios
        .delete(endpoint, authorization)
        .then((response) => {
          showToast(response.data.message);
          getPelanggan();
        })
        .catch((error) => console.log(error));
    }
  };

  let simpanData = (event) => {
    event.preventDefault();
    // close modal
    modal.hide();
    if (action === "insert") {
      let endpoint = `http://localhost:8000/pelanggan`;
      let request = {
        nama_pelanggan: nama,
        alamat_pelanggan: alamat,
        kontak: kontak,
      };

      // send data
      axios
        .post(endpoint, request, authorization)
        .then((response) => {
          showToast(response.data.message);
          // refresh data pelanggaran
          getPelanggan();
        })
        .catch((error) => console.log(error));
    } else if (action === "edit") {
      let endpoint = `http://localhost:8000/pelanggan/${idPelanggan}`;
      let request = {
        nama_pelanggan: nama,
        alamat_pelanggan: alamat,
        kontak: kontak,
      };

      // sending data utk update pelanggaran
      axios
        .put(endpoint, request, authorization)
        .then((response) => {
          showToast(response.data.message);
          // refresh data pelanggaran
          getPelanggan();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    let myModal = new Modal(document.getElementById(`modal-pelanggan`));
    setModal(myModal);
    getPelanggan();
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
      <div>
      </div>
      {/* <div className="row card"> */}
      <Navbar />
      <div
          className="card-header rounded-3 bg-transparent"
          style={{ background: `#001845` }}
        >
          <div className="row">
            <div className="col-lg-10">
              <h2 className="text-white mx-2 my-2 p-2">
                <b>Daftar Pelanggan </b>
              </h2>
            </div>
            <div className="col-lg-2">
              <button
                className="btn btn-primary shadow justify-content-end mx-auto my-3 rounded-pill p-2"
                onClick={() => tambahPelanggan()}
              >
                <span className="fa fa-plus"></span>Tambah Pelanggan
              </button>
            </div>
          </div>
        </div>
      <div className="row mx-0 my-3" style={{ background: `#002855` }}>
        {pelanggan.map((item) => (
          <div className="col-6 ">
            <div className="card-body" style={{ background: `#002855` }}>
              <ul className="list-group  list-group-flush">
                <li
                  className="list-group-item rounded-pill d-flex justify-content-around"
                  key={`key${item.id_pelanggan}`}
                  style={{ background: `#001845` }}
                >
                  <div className="row align-items-center">
                    <div className="col-10 text-white">
                      <div className="row">
                        <div className="col-lg-4 text-white">
                          <small>Nama</small>
                          <h5>{item.nama_pelanggan}</h5>
                        </div>
                        <div className="col-lg-3 text-white">
                          <small>Alamat</small>
                          <h5>{item.alamat_pelanggan}</h5>
                        </div>
                        <div className="col-lg-3 text-white">
                          <small>Telepon</small>
                          <h5>{item.kontak}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="row">
                        <div className="col-lg-12 text-white">
                          <small>Action</small>
                          <br />
                          <button
                            className="btn btn-sm btn-warning ms-1 me-2 "
                            onClick={() => editPelanggan(item)}
                          >
                            <span className="fa fa-edit"></span>
                          </button>
                          <button
                            className="btn btn-sm btn-danger ms-1 my-2"
                            onClick={() => hapusPelanggan(item)}
                          >
                            <span className="fa fa-trash"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ))}

        <div className="modal" id="modal-pelanggan">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-success">
                <h4 className="text-white">Form Siswa</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => simpanData(ev)}>
                  Nama
                  <input
                    type="text"
                    className="form-control mb-2"
                    required
                    onChange={(e) => setNama(e.target.value)}
                    value={nama}
                  />
                  Alamat
                  <input
                    type="text"
                    className="form-control mb-2"
                    required
                    onChange={(e) => setAlamat(e.target.value)}
                    value={alamat}
                  />
                  Telepon
                  <input
                    type="text"
                    className="form-control mb-2"
                    required
                    onChange={(e) => setKontak(e.target.value)}
                    value={kontak}
                  />

                  <br />
                  <button type="submit" className="btn btn-outline-success">
                    <span className="fa fa-check"></span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
