export default function UnauthorizedPage() {
  return (
    <div style={{ maxWidth: 500, margin: "80px auto", padding: 24, textAlign: "center" }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Acceso no autorizado</h1>
      <p>Tu cuenta no tiene permisos para administrar este sitio.</p>
      <p style={{ marginTop: 16 }}>
        <a href="/">Volver al sitio</a>
      </p>
    </div>
  );
}
