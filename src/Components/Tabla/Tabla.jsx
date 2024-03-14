import React from 'react';
import './Tabla.css';

const data = [
  { nombre: 'Maria Chopo', sexo: 'Mujer', señal: 'Cicatriz en la mejilla', hora: '08:45 AM' },
  { nombre: 'Carlos hopa', sexo: 'Hombre', señal: 'Tatuaje en el antebrazo', hora: '09:12 AM' },
  { nombre: 'Maria Pérez', sexo: 'Mujer', señal: 'Cicatriz en la mejilla', hora: '08:45 AM' },
  { nombre: 'Carlos López', sexo: 'Hombre', señal: 'Tatuaje en el antebrazo', hora: '09:12 AM' },
  { nombre: 'Maria Pérez', sexo: 'Mujer', señal: 'Cicatriz en la mejilla', hora: '08:45 AM' },
  { nombre: 'Carlos López', sexo: 'Hombre', señal: 'Tatuaje en el antebrazo', hora: '09:12 AM' },
];

const Tabla = () => (
  <div>
    <input type="text" placeholder="Buscar..." />
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Sexo</th>
          <th>Señal particular</th>
          <th>Hora de entrada</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.nombre}</td>
            <td>{item.sexo}</td>
            <td>{item.señal}</td>
            <td>{item.hora}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button>Agregar Información</button>
    <button>Eliminar Seleccionado</button>
  </div>
);

export default Tabla;
