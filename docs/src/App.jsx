import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // Lee el archivo estático public/productos.json (funciona en local y en GitHub Pages)
  const API_URL = `${import.meta.env.BASE_URL}productos.json`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar los productos');
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al cargar los productos:', err);
        setError(true);
        setCargando(false);
      });
  }, []);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary mb-2">
            <i className="bi bi-box-seam me-2"></i>Catálogo de Productos
          </h1>
          <p className="lead text-secondary">
            Gestión de inventario consultada desde el backend Flask (SQLAlchemy) + React
          </p>
          <hr className="w-25 mx-auto border-primary border-2 opacity-50" />
        </div>

        {/* Estado de Carga */}
        {cargando && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando productos...</span>
            </div>
          </div>
        )}

        {/* Estado de Error */}
        {error && (
          <div className="text-center py-4">
            <div className="alert alert-danger shadow-sm d-inline-block" role="alert">
              <h5 className="alert-heading fw-bold mb-1">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>Error de carga
              </h5>
              <p className="mb-0">
                No se pudo cargar el archivo <code>productos.json</code>.
              </p>
            </div>
          </div>
        )}

        {/* Grid de Productos */}
        {!cargando && !error && (
          <div className="row g-4 justify-content-center">
            {productos.length === 0 ? (
              <div className="col-12 text-center">
                <div className="alert alert-info shadow-sm" role="alert">
                  No se encontraron productos.
                </div>
              </div>
            ) : (
              productos.map((prod) => (
                <div className="col-md-4 col-sm-6" key={prod.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-4">
                    <div className="card-body d-flex flex-column p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-dark rounded-pill px-3 py-2">
                          ID: {prod.id}
                        </span>
                        <span className="badge bg-info-subtle text-info-emphasis rounded-pill px-3 py-2 border border-info-subtle">
                          {prod.categoria_nombre || `Categoría ${prod.categoria_id}`}
                        </span>
                      </div>

                      <h5 className="card-title fw-bold text-dark mb-2">{prod.nombre}</h5>
                      <p className="card-text text-muted flex-grow-1 small">
                        {prod.descripcion || 'Sin descripción disponible.'}
                      </p>

                      <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                        <h4 className="fw-bold text-success mb-0">
                          ${Number(prod.precio).toLocaleString('es-CO')}
                        </h4>
                        <span className="badge bg-light text-secondary border">
                          <i className="bi bi-stack me-1"></i>Min: {prod.stock_min}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;