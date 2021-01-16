import React, { Fragment, useEffect } from "react";

const Cancion = ({ letra, cancion, guardarCancion }) => {
  useEffect(() => {
    if (cancion.length === 0) return;

    const Capitalize = (palabra) => {
      return palabra[0].toUpperCase() + palabra.slice(1);
    };

    guardarCancion(Capitalize(cancion));
  }, [cancion]);

  if (letra.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <h2>{cancion}</h2>
      <p className="letra">{letra}</p>
    </Fragment>
  );
};

export default Cancion;
