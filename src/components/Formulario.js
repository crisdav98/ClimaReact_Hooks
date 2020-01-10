import React, {useState} from "react";

function Formulario({datosConsulta}) {
    // State del Componente
    // Busqueda = state y guardarBusqueda = this.setState({})
    const [busqueda, guardarBusqueda] = useState({
        ciudad:'',
        pais: ''
    })

  // Función que se ejecuta en el onChange para guardar el valor
  const handleChange = e => {
    //cambiar el state
    guardarBusqueda({
        // Siempre se debe de hacer una copia del state
        ...busqueda,
        [e.target.name] : e.target.value
    })
  };

  //Función para consultar el clima
  const consultarClima = e =>{
      e.preventDefault();
      // Pasar hacia el componente principal(App.js) la busqueda del usuario
      datosConsulta(busqueda);
  }

  return (
    <form onSubmit={consultarClima}>
      <div className="input-field col s12">
        <input type="text" name="ciudad" id="ciudad" onChange={handleChange} />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>
      <div className="input-field col s12">
        <select onChange={handleChange} name="pais">
          <option value="">Selecciona un país:</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="ES">España</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="EC">Ecuador</option>
          <option value="CR">Costa Rica</option>
          <option value="PE">Perú</option>
        </select>
      </div>
      <div className="input-field col s12">
        <input type="submit" className="waves-effect waves-light btn-large btn-block yellow accent-4" value="Buscar Clima"/>
      </div>
    </form>
  );
}

export default Formulario;
