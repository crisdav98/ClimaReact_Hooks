import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {
  // State Principal
  const [ciudad,guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const[error,guardarError] = useState(false);
  const [resultado,guardarResultado] = useState({});

  useEffect(()=>{
    // Prevenir la ejecucuón la primera vez
    if(ciudad ==='' || pais ===''){
      return;
    }
    consultarApi();
    
  },[ciudad,pais])


  // Función  que vamos a pasar a Formulario para obtener los datos del Formulario
  const datosConsulta = datos =>{
    // Validar que ambos campos esten con datos
    if(datos.ciudad ==='' || datos.pais === ''){
      // Un error
      guardarError(true);
      return;
    }else{
      // Guardar los datos que vienen del formulario
      guardarCiudad(datos.ciudad);
      guardarPais(datos.pais);
      guardarError(false);
    }

  }

  // Consultar con la API
  const consultarApi = async () =>{
    const appId = 'eebbf9252172e7e4709e3e2614354ab6';
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // consultar la url
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarResultado(resultado);
  }

  // Cargar un componente condicionalmente
  let componente;
  if(error){
    // hay un error se muestra
    componente = <Error mensaje='Ambos campos son obligatorios'/>
  }else if(resultado.cod === '404'){
    componente = <Error mensaje='La ciudad no existe en el registro'/>
  }else{
    // si no hay errores se muestra el clima
    componente=<Clima resultado = {resultado}/>;
  }
  return (
    <div className="App">
      <Header
        titulo ='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
              datosConsulta = {datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
