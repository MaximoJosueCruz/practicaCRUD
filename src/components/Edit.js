import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Edit = () => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [motor, setMotor] = useState("");
  const [aceleracion, setAceleracion] = useState("");
  const [precio, setPrecio] = useState(0.0);
  const navigate = useNavigate();
  const { id } = useParams();


  const update = async (e) => {
    e.preventDefault();
    const vehiculo = doc(db, "vehiculos", id);
    const data = { marca: marca, modelo: modelo, motor: motor, aceleracion: aceleracion, precio: precio };
    await updateDoc(vehiculo, data);
    navigate("/");
  };

  const getVehiculoById = async (id) => {
    const vehiculo = doc(db, "vehiculos", id);
    const docSnap = await getDoc(vehiculo);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setMarca(docSnap.data().marca);
      setModelo(docSnap.data().modelo);
      setMotor(docSnap.data().motor);
      setAceleracion(docSnap.data().aceleracion);
      setPrecio(docSnap.data().precio);
    } else {
      console.log("Vehiculo no encontrado");
    }
  };

  useEffect(() => {
    getVehiculoById(id);
  }, []);

  return (
    <>
      <div>
        <div>
          <div>
            <h1>Edit vehiculo</h1>
            <form onSubmit={update}>
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
