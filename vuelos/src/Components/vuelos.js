/* eslint-disable jsx-a11y/anchor-is-valid */
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getVuelos, deleteVuelo, addVuelo } from "../Services/vuelos-services";
import { getAviones } from "../Services/aviones-services";

function Vuelos() {
  const [vuelos, setvuelos] = useState([]);
  const [vuelo, setvuelo] = useState([]);
  const [aviones, setAviones] = useState([]);
  const navigate = useNavigate()
  const Disponibilidad = async (id) => {
    navigate('/disponibilidad/'+id);
    }

  useEffect(() => {
    obtenerVuelos();
    obtenerAviones()
  }, []);

  const obtenerVuelos = async () => {
    setvuelos( await getVuelos());
  }

  const obtenerAviones = async () => {
    setAviones( await getAviones());
  }

  const borrar = async (codigo) => {
    await deleteVuelo(codigo);
    obtenerVuelos();
    }

    const handleChangeVuelo = ((e) => {
      setvuelo(prev => { return { ...prev, [e.target.name]: e.target.value } });
    });

    const handleClickVuelo = ((e) => {
      e.preventDefault();
      addVuelo(vuelo);
      obtenerVuelos();
      });


  return (
    <div>
    <p class="text-center" style={{marginTop: '2%', fontWeight: '500'}}>Administracion de Vuelos</p>

    <table className="table" style={{marginTop: '3%'}}>
        <thead>
        <tr class="table-active">
          <th scope="col">Codigo</th>
          <th scope="col">Aeropuerto Origen</th>
          <th scope="col">Aeropuerto Destino</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Avion</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>  {vuelos.map((vuelos) =>
                  <tr key={vuelos.id}>
                    <th scope="col"><Link to={"" + vuelos.codigo}>{vuelos.codigo}</Link></th>
                    <td >{vuelos.origen_aero.ciudad.nombre}</td>
                    <td >{vuelos.destino_aero.ciudad.nombre}</td>
                    <td >{vuelos.fecha}</td>
                    <td >{vuelos.hora}</td>
                    <td >{vuelos.cod_avion}</td>
                    <td><button className="btn btn-primary" type="button" onClick={() => Disponibilidad(vuelos.codigo)}>Disponibilidad</button></td>
                    <td><button className="btn btn-primary" type="button" onClick={() => borrar(vuelos.codigo)}>Eliminar</button></td>
                    </tr>
        )}
         </tbody>
      </table>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Nuevo Vuelo
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Ingresa los datos para cargar un nuevo vuelo.</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="mb-3">
        <label for="codigoAeropuerto" class="form-label">Codigo Vuelo</label>
        <input type="codigo" class="form-control" id="codigoAvion"  name='codigo' onChange={handleChangeVuelo} />
        <div id="codigoHelp" class="form-text">Debe estar compuesto por 5 letras y ser UNICO.</div>
      </div>
        <div class="mb-3">
            <label for="origen" class="form-label">Aero. Origen</label>
            <input type="Origen" class="form-control" id="Origen"  name='cod_origen_aero' onChange={handleChangeVuelo}/>
        </div>
        <div class="mb-3">
            <label for="destino" class="form-label">Aero. Destino </label>
            <input type="destino" class="form-control" id="destino"  name='cod_destino_aero' onChange={handleChangeVuelo}/>
        </div>
        <div class="mb-3" style={{display:'grid'}}>
            <label for="fecha" class="form-label">Fecha</label>
              <input type="date" id="fecha" name="fecha" style={{height:'140%'}} onChange={handleChangeVuelo}/>
        </div>
        <div class="mb-3" style={{display:'grid', marginTop:'5%'}}>
          <label for="appt">Hora</label>
          <input type="time" id="appt" style={{height:'140%', width:'40%'}}  name='hora' onChange={handleChangeVuelo}/>
        </div>
        <div class="mb-3" >
        <select class="form-select"  name="cod_avion" aria-label="Default select example" onChange={handleChangeVuelo} >
            <option selected> Aviones </option>
            {aviones.map((aviones) =>
          <option key={aviones.codigo} value={aviones.codigo}>{aviones.codigo+' '}{aviones.marca+ ' '}{aviones.modelo}</option>
        )}
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleClickVuelo} >Cargar</button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default Vuelos;