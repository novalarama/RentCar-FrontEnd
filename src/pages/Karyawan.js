import { useState, useEffect } from "react";
import axios from "axios";
import { Toast, Modal } from "bootstrap";
import Navbar from "../component/Navbar";
export default function Karyawan() {
  if (!localStorage.getItem(`token-rental`)) {
    window.location = `./login`;
  }

  let [karyawan, setKaryawan] = useState([]);
  let [action, setAction] = useState("");
  let [message, setMessage] = useState("");
  let [modal, setModal] = useState(null);
  let [idKaryawan, setIdKaryawan] = useState(0);
  let [namaKaryawan, setNamaKaryawan] = useState("");
  let [alamatKaryawan, setAlamatKaryawan] = useState("");
  let [kontakKaryawan, setKontakKaryawan] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [ubahPassword, setUbahPassword] = useState(true);

  let token = localStorage.getItem("token-rental");

  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let showToast = (message) => {
    let myToast = new Toast(document.getElementById(`myToast`), {
      autohide: true,
    });
    /** perintah utk mengisi state 'message */
    setMessage(message);

    /** show Toast */
    myToast.show();
  };

  let getKaryawan = () => {
    let endpoint = `http://localhost:8000/karyawan`;

    axios
      .get(endpoint, authorization)
      .then((result) => {
        setKaryawan(result.data.Karyawan);
      })
      .catch((error) => console.log(error));
  };

  let tambahKaryawan = () => {
    // display modal
    modal.show();

    // mengosongkan inputan form nya
    setIdKaryawan(0);
    setNamaKaryawan("");
    setAlamatKaryawan("");
    setKontakKaryawan("");
    setUsername("");
    setPassword("");
    setAction("insert");
  };

  let editKaryawan = (item) => {
    // display modal
    modal.show();

    // isi form sesuai data yg dipilih
    setIdKaryawan(item.id_karyawan);
    setNamaKaryawan(item.nama_karyawan);
    setAlamatKaryawan(item.alamat_karyawan);
    setKontakKaryawan(item.kontak_karyawan);
    setUsername(item.username);
    setPassword(item.password);
    setAction(`edit`);
  };

  let simpanKaryawan = (event) => {
    event.preventDefault();
    // close modal
    modal.hide();
    if (action === "insert") {
      let endpoint = `http://localhost:8000/karyawan`;
      let request = {
        nama_karyawan: namaKaryawan,
        alamat_karyawan: alamatKaryawan,
        kontak_karyawan: kontakKaryawan,
        username: username,
        password: password,
      };

      // send data
      axios
        .post(endpoint, request, authorization)
        .then((response) => {
          showToast(response.data.message);
          // refresh data pelanggaran
          getKaryawan();
        })
        .catch((error) => console.log(error));
    } else if (action === "edit") {
      let endpoint = `http://localhost:8000/karyawan/${idKaryawan}`;
      let request = {
        nama_karyawan: namaKaryawan,
        alamat_karyawan: alamatKaryawan,
        kontak_karyawan: kontakKaryawan,
        username: username,
        password: ubahPassword === true ? "password" : "password",
      };

      // sending data utk update pelanggaran
      axios
        .put(endpoint, request, authorization)
        .then((response) => {
          showToast(response.data.message);
          // refresh data pelanggaran
          getKaryawan();
        })
        .catch((error) => console.log(error));
    }
  };

  let hapusKaryawan = (item) => {
    if (window.confirm(`Are you sure want to delete this data?`)) {
      let endpoint = `http://localhost:8000/karyawan/${item.id_karyawan}`;

      //sending data
      axios
        .delete(endpoint, authorization)
        .then((response) => {
          showToast(response.data.message);
          getKaryawan();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    let modal = new Modal(document.getElementById("modal-karyawan"));
    setModal(modal);
    getKaryawan();
  }, []);

  return (
    <div>
      <div
        className="container rounded"
        style={{ fontFamily: "Plus Jakarta Display" }}
      >
        {/* start component toast untuk menggantikan alert*/}
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1 }}
        >
          <div className="toast bg-light" id="myToast">
            <div className="toast-header bg-primary text-white">
              <strong>Message</strong>
            </div>
            <div className="toast-body">{message}</div>
          </div>
        </div>

        <Navbar />
        {/* <div className="card m-2"> */}
        <div
          className="card-header rounded-3 bg-transparent"
          style={{ background: `#001845` }}
        >
          <div className="row">
            <div className="col-lg-10">
              <h2 className="text-white mx-2 my-2 p-2">
                <b>DaftarKaryawan </b>
              </h2>
            </div>
            <div className="col-lg-2">
              <button
                className="btn btn-primary shadow justify-content-end mx-auto my-3 rounded-pill p-2"
                onClick={() => tambahKaryawan()}
              >
                <span className="fa fa-plus"></span>Tambah Karyawan
              </button>
            </div>
          </div>
        </div>
        <div className="card-body container">
          <ul className="list-group">
            {karyawan.map((item) => (
              <li
                className="list-group-item rounded-3"
                style={{ background: `#002855` }}
              >
                <div className="row">
                  <div className="col-1 text-white mx-auto ">
                    <h2>{item.id_karyawan}</h2>
                  </div>
                  <div className="col-10 text-white">
                    <div className="row">
                      <div className="col-lg-4 text-white">
                        <small>Nama</small>
                        <h5>{item.nama_karyawan}</h5>
                      </div>
                      <div className="col-lg-2 text-white">
                        <small>Username</small>
                        <h5>{item.username}</h5>
                      </div>
                      <div className="col-lg-2 text-white">
                        <small>Alamat</small>
                        <h5>{item.alamat_karyawan}</h5>
                      </div>
                      <div className="col-lg-2 text-white">
                        <small>Telepon</small>
                        <h5>{item.kontak_karyawan}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-1">
                    <div className="row">
                      <div className="col-lg-12 text-white">
                        <small>Action</small>
                        <br />
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => editKaryawan(item)}
                        >
                          <span className="fa fa-edit"></span>
                        </button>
                        <button
                          className="btn btn-sm btn-danger mx-2"
                          onClick={() => hapusKaryawan(item)}
                        >
                          <span className="fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="modal" id="modal-karyawan">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header bg-success">
                  <h4 className="text-white">Form Karyawan</h4>
                </div>
                <div className="modal-body">
                  <form onSubmit={(ev) => simpanKaryawan(ev)}>
                    Nama
                    <input
                      type="text"
                      className="form-control mb-2"
                      required
                      onChange={(e) => setNamaKaryawan(e.target.value)}
                      value={namaKaryawan}
                    />
                    Alamat
                    <input
                      type="text"
                      className="form-control mb-2"
                      required
                      onChange={(e) => setAlamatKaryawan(e.target.value)}
                      value={alamatKaryawan}
                    />
                    Telepon
                    <input
                      type="text"
                      className="form-control mb-2"
                      required
                      onChange={(e) => setKontakKaryawan(e.target.value)}
                      value={kontakKaryawan}
                    />
                    Username
                    <input
                      type="text"
                      className="form-control mb-2"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                    Password
                    <input
                      type="text"
                      className={`form-control mb-2 ${
                        ubahPassword ? `` : `d-none`
                      }`}
                      required={ubahPassword}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <button
                      type="button"
                      className={`btn btn-dark btn-sm ${
                        ubahPassword ? `d-none` : ``
                      }`}
                      onClick={() => setUbahPassword(true)}
                    >
                      Click to change password
                    </button>
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
    </div>
  );
}
