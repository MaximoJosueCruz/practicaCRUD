import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Create = () => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [motor, setMotor] = useState("");
  const [aceleracion, setAceleracion] = useState("");
  const [precio, setPrecio] = useState(0.0);
  const navigate = useNavigate();

  const vehiculoCollection = collection(db, "vehiculos");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(vehiculoCollection, {
      marca: marca,
      modelo: modelo,
      motor: motor,
      aceleracion: aceleracion,
      precio: precio
    });
    navigate("/");
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h1>Create Vehiculo</h1>
            <form onSubmit={store}>
              <div className="mb-3">
                <label className="form-label">Marca</label>
                <input
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Modelo</label>
                <input
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Motor</label>
                <input
                  value={motor}
                  onChange={(e) => setMotor(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Aceleracion</label>
                <input
                  value={aceleracion}
                  onChange={(e) => setAceleracion(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  type="number"
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Store
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
