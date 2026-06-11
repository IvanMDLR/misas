function Mensaje({ rol, texto }) {
  const claseCSS =
    rol === "usuario"
      ? "msg-usuario"
      : "msg-ia";

  const nombreCaja =
    rol === "usuario"
      ? "USUARIO"
      : "IA MASTER";

  return (
    <div className={claseCSS}>
      <b>{nombreCaja}</b>
      <br />
      {texto}
    </div>
  );
}

export default Mensaje;