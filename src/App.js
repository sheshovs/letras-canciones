import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";

import axios from "axios";

function App() {
  //definir el state
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [cancion, guardarCancion] = useState("");
  const [info, guardarInfo] = useState({});
  const [error, guardarError] = useState(false);
  const [errorCancion, actualizarErrorCancion] = useState(false);
  const [errorArtista, actualizarErrorArtista] = useState(false);

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, info] = await Promise.all([axios(url), axios(url2)]).catch(
        (error) => {
          guardarError(true);
        }
      );
      guardarError(false);
      guardarCancion(cancion);

      if (letra.data.lyrics === "") {
        actualizarErrorCancion(true);
      } else {
        actualizarErrorCancion(false);
        guardarLetra(letra.data.lyrics);
      }

      if (info.data.artists === null) {
        actualizarErrorArtista(true);
      } else {
        actualizarErrorArtista(false);
        guardarInfo(info.data.artists[0]);
      }
    };

    consultarApiLetra();
  }, [busquedaletra]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6">
            {errorArtista ? (
              <p id="error-artista" className="alert alert-primary text-center">
                No se encontró información del artista
              </p>
            ) : (
              <Info info={info} />
            )}
          </div>
          <div className="col-md-6">
            {errorCancion ? (
              <p id="error-cancion" className="alert alert-primary text-center">
                No se encontró la letra de la canción
              </p>
            ) : (
              <Cancion
                letra={letra}
                cancion={cancion}
                guardarCancion={guardarCancion}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
