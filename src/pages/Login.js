import { useState } from "react"; // untuk menyimpan inputan
import axios from "axios"; // digunakan untuk transfer data dari frontend ke backend
export default function Login() {
  // define state to store username
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let loginProcess = (ev) => {
    ev.preventDefault(); //
    // akses ke backend untuk proses login
    // method : POST
    // endpoint : http://localhost:8000/user/auth
    // request : username and password
    // response : logged and token

    //prepare request
    let request = {
      username: username,
      password: password,
    };
    // prepare alamat
    let endpoint = `http://localhost:8000/karyawan/auth`;
    // sending data
    axios
      .post(endpoint, request)
      .then((response) => {
        // response.data.(apa yang ingin diambil)
        if (response.data.logged === true) {
          let token = response.data.token;
          // disimpan di local storage
          localStorage.setItem(`token-rental`, token);
          let dataKaryawan = JSON.stringify(response.data.dataKaryawan);
          localStorage.setItem(`karyawan-rental`, dataKaryawan);
          alert("Login Successfull");
          window.location = "./karyawan";
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container content d-flex h-100 justify-content-center align-items-center mt-5">
      <div
        className="content col-sm-6 mt-5 rounded-3 shadow p-3 mb-5 rounded"
        style={{ backgroundColor: "#001845" }}
      >
        <div className="card-header bg-transparent text-light text-center mt-3 mb-3">
          <h1>
            <b>OKRent</b>
          </h1>
          <strong className="text-light mb-5">Admin</strong>
        </div>
        <div className="card-body text-white">
          <form onSubmit={(ev) => loginProcess(ev)}>
            Username
            <input
              type="text"
              className="form-control border-primary text-white mt-2 mb-4 rounded-pill"
              value={username}
              placeholder="Username"
              onChange={(ev) => setUsername(ev.target.value)}
              style={{ backgroundColor: "#001d3d" }}
            />
            Password
            <input
              type="password"
              className="form-control border-primary text-white mt-2 mb-5 rounded-pill"
              value={password}
              placeholder="Masukkan Password"
              onChange={(ev) => setPassword(ev.target.value)}
              autoComplete="false"
              style={{ backgroundColor: "#001d3d" }}
            />
            <button
              className="form-control btn btn-block btn-primary mb-1 shadow p-3 mb-5 rounded-pill"
              type="submit"
            >
              <b className="text-white">Sign In</b>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
