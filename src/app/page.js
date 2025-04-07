"use client";

import { useState, useEffect } from 'react';

// Función para obtener los datos desde la API (usando Random User Generator)
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
        padding: '20px',
        backgroundColor: '#f4f6f9', // Fondo gris claro
        minHeight: '100vh',
        color: '#333',
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '2rem', color: '#333' }}>Usuarios</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Correo Electrónico</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.login.uuid}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {user.name.first} {user.name.last}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {user.location.city}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handlePreviousPage}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Anterior
        </button>
        <span style={{ padding: '10px' }}>Página {page}</span>
        <button
          onClick={handleNextPage}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}