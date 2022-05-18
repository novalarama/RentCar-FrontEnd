import { useState, useEffect } from "react";
import axios from "axios";

export default function SewaMobil() {
  if (!localStorage.getItem(`token-rental`)) {
    window.location = `./login`;
  }

  let [pelanggan, setPelanggan] = useState([]);
  let [mobil, setMobil] = useState([]);

  let [selectedPelanggan, setSelectedPelanggan] = useState("");
  let [selectedMobil, setSelectedMobil] = useState(null);
  let [selectedFirstDate, setSelectedFirstDate] = useState("");
  let [selectedLastDate, setSelectedLastDate] = useState("");

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
      .then((result) => {
        setPelanggan(result.data.Pelanggan);
      })
      .catch((error) => console.log(error));
  };

  let getMobil = () => {
    let endpoint = `http://localhost:8000/mobil`;
    axios
      .get(endpoint, authorization)
      .then((result) => {
        setMobil(result.data.Mobil);
      })
      .catch((error) => console.log(error));
  };

  let simpanSewa = () => {
    if (window.confirm(`Are you sure want to save this data?`)) {
      let karyawan = JSON.parse(localStorage.getItem(`karyawan-rental`));
      let id = karyawan.id_karyawan;

      // let biayaSewa = selectedMobil.biaya_sewa;
      // let dif =
      //   (selectedLastDate.getTime() - selectedFirstDate.getTime()) /
      //   (1000 * 3600 * 24);
      // let totalBayar = dif * biayaSewa;

      let endpoint = `http://localhost:8000/sewa`;
      let request = {
        id_mobil: selectedMobil,
        id_karyawan: id,
        id_pelanggan: selectedPelanggan,
        tgl_sewa: selectedFirstDate,
        tgl_kembali: selectedLastDate
        // total_bayar: totalBayar,
      };

      /** sending data */
      axios
        .post(endpoint, request, authorization)
        .then((result) => {
          alert(result.data.message);
          window.location = "./sewa";
        })
        .catch((error) => console.log(error));
    }
  };

  let setDataMobil = (item) => {
    setSelectedMobil(item);
  };

  useEffect(() => {
    getPelanggan();
    getMobil();
  }, []);

  return (
    <div className="container-fluid text-white">
      <div className="card-header" style={{ background: `#001845` }}>
        <h4 className="text-white">Form Sewa</h4>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <div className="row my-3">
              <div className="col-2 mt-2">Pilih Pelanggan</div>
              <div className="col-10">
                <select
                  className="form-control border-primary text-white"
                  style={{ backgroundColor: "#001d3d" }}
                  onChange={(ev) => setSelectedPelanggan(ev.target.value)}
                  value={selectedPelanggan}
                >
                  <option value="">--- List Pelanggan ---</option>
                  {pelanggan.map((item) => (
                    <option
                      value={item.id_pelanggan}
                      key={`key${item.id_pelanggan}`}
                    >
                      {item.nama_pelanggan}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-2 mt-2">Tgl Sewa</div>
              <div className="col-10">
                <input
                  type="date"
                  className="form-control border-primary text-white"
                  style={{ backgroundColor: "#001d3d" }}
                  onChange={(ev) => setSelectedFirstDate(ev.target.value)}
                  value={selectedFirstDate}
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-2 mt-2">Pilih Mobil</div>

              <div className="col-10">
                <select
                  className="form-control border-primary text-white"
                  style={{ backgroundColor: "#001d3d" }}
                  onChange={(ev) => setSelectedMobil(ev.target.value)}
                  value={selectedMobil}
                >
                  <option value="">--- List Mobil ---</option>
                  {mobil.map((item) => (
                    <option
                      value={item.id_mobil}
                      key={`key${item.id_mobil}`}
                    >
                      {item.merk} - {item.nomor_mobil}
                    </option>
                  ))}
                </select>
                {/* <img
                  src={}
                  alt="Gambar Mobil"
                  className="rounded-3 my-3 mx-auto"
                  style={{ width: `50%` }}
                /> */}
              </div>
            </div>
            <div className="row my-3">
              <div className="col-2 mt-2">Tgl Kembali</div>
              <div className="col-10">
                <input
                  type="date"
                  className="form-control border-primary text-white"
                  style={{ backgroundColor: "#001d3d" }}
                  onChange={(ev) => setSelectedLastDate(ev.target.value)}
                  value={selectedLastDate}
                />
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>

        <button className="btn btn-primary" onClick={() => simpanSewa()}>
          <span className="fa fa-check"></span> Simpan
        </button>
      </div>
    </div>
  );
}
