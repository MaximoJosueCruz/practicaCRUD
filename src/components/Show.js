import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const Show = () => {
  //Configuración de hooks
  const [vehiculos, SetVehiculos] = useState([]);

  //Referencia a la BD de firebase
  const vehiculoCollection = collection(db, "vehiculos");

  //Función para mostrar todos los docs
  const getVehiculos = async () => {
    const data = await getDocs(vehiculoCollection);
    //console.log(data.docs);
    SetVehiculos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //console.log(vehiculos);
  };

  //Función para eliminar un doc
  const deleteVehiculo = async (id) => {
    const vehiculoDoc = doc(db, "vehiculos", id);
    await deleteDoc(vehiculoDoc);
    getVehiculos();
  };

  //Función para confirmación para Sweet Alert 2
  const confirmDelete = (id) => {
    mySwal
      .fire({
        title: "¿Quieres eliminar este vehiculo?",
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Si, quiero eliminarlo",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteVehiculo(id);
          Swal.fire("Eliminado", "Tu vehiculo ha sido eliminado", "success");
        }
      });
  };
  //Usamos useEffect
  useEffect(() => {
    getVehiculos();
  }, []);

  //Retorno
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap2">
              <Link to="/create" className="btn btn-secondary mt-2 mb-2">
                Create
              </Link>
            </div>

            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Motor</th>
                  <th>Aceleracion</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {vehiculos.map((vehiculo) => (
                  <tr key={vehiculo.id}>
                    <td>{vehiculo.marca}</td>
                    <td>{vehiculo.modelo}</td>
                    <td>{vehiculo.motor}</td>
                    <td>{vehiculo.aceleracion}</td>
                    <td>{vehiculo.precio}</td>
                    <td>
                      <Link
                        to={`/edit/${vehiculo.id}`}
                        className="btn btn-light mx-2"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(vehiculo.id);
                        }}
                        className="btn btn-danger mx-2"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
