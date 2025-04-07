"use client";

import { useState, useEffect } from 'react';

// Función para obtener los datos desde la API (Random User Generator)
export async function getData() {
  const res = await fetch('https://randomuser.me/api/?results=2500');
  const data = await res.json();
  return data.results;
}

export default function Home() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Usamos useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setUsers(data);
    };
    fetchData();
  }, []);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  // Datos de la página actual
  const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '40px',
        background: 'linear-gradient(135deg, #007BFF 0%, #4CAF50 100%)', // Gradiente de colores corporativos
        color: '#fff',  // Color de texto blanco para contraste con el fondo
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#fff', marginBottom: '20px' }}>
        Usuarios Corporativos
      </h1>

      {/* Tabla de usuarios */}
      <div style={{ width: '90%', overflowX: 'auto', marginTop: '20px' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#007BFF', color: '#fff', fontWeight: 'bold' }}>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Nombre</th>
              <th style={tableHeaderStyle}>Correo Electrónico</th>
              <th style={tableHeaderStyle}>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: '#f7f7f7',  // Color de fondo más suave para las filas
                  textAlign: 'left',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}  // Cambio de color al pasar el mouse
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#f7f7f7')}
              >
                <td style={tableCellStyle}>{user.login.uuid}</td>
                <td style={tableCellStyle}>
                  {user.name.first} {user.name.last}
                </td>
                <td style={tableCellStyle}>{user.email}</td>
                <td style={tableCellStyle}>{user.location.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handlePreviousPage}
          style={paginationButtonStyle}
        >
          Anterior
        </button>
        <span style={{ padding: '10px', fontSize: '1.2rem', color: '#fff' }}>Página {page}</span>
        <button
          onClick={handleNextPage}
          style={paginationButtonStyle}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Estilos para la tabla
const tableHeaderStyle = {
  padding: '12px 20px',
  borderBottom: '2px solid #ddd',
  textAlign: 'center',
  backgroundColor: '#007BFF',
  color: '#fff',
  fontSize: '1rem',
};

const tableCellStyle = {
  padding: '12px 20px',
  borderBottom: '1px solid #ddd',
  textAlign: 'center',
  color: '#333',  // Color de texto en las celdas
};

// Estilos para los botones de paginación
const paginationButtonStyle = {
  padding: '10px 20px',
  margin: '5px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: '1rem',
};
