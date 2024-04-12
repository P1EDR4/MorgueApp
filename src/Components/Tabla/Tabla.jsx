import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tabla.css';

const Tabla = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    sexo: '',
    seña: '',
    hora: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/'); // Cambia la ruta a la raíz del servidor
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/', formData); // Cambia la ruta a /api
      setFormData({
        nombre: '',
        sexo: '',
        seña: '',
        hora: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedItems.map(async id => {
        await axios.delete(`http://localhost:3001/${id}`); // Cambia la ruta a /api
      }));
      setSelectedItems([]);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar elementos:', error);
    }
  };

  const handleModifySelected = async () => {
    try {
      if (selectedItems.length !== 1) {
        console.error('Por favor, seleccione un único elemento para modificar.');
        return;
      }
      const selectedItemID = selectedItems[0];
      const selectedItem = data.find(item => item._id === selectedItemID);
      if (!selectedItem) {
        console.error('No se encontró el elemento seleccionado en los datos.');
        return;
      }
      setFormData({
        nombre: selectedItem.nombre,
        sexo: selectedItem.sexo,
        seña: selectedItem.seña,
        hora: selectedItem.hora
      });
    } catch (error) {
      console.error('Error al modificar elemento:', error);
    }
  };

  const filteredData = data.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Nombre</th>
            <th>Sexo</th>
            <th>Seña particular</th>
            <th>Hora de entrada</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={e => handleCheckboxChange(e, item._id)}
                  checked={selectedItems.includes(item._id)}
                />
              </td>
              <td>{item.nombre}</td>
              <td>{item.sexo}</td>
              <td>{item.seña}</td>
              <td>{item.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="sexo"
            placeholder="Sexo"
            value={formData.sexo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="seña"
            placeholder="Seña particular"
            value={formData.seña}
            onChange={handleChange}
          />
          <input
            type="text"
            name="hora"
            placeholder="Hora de entrada"
            value={formData.hora}
            onChange={handleChange}
          />
          <button type="submit">Agregar Información</button>
        </form>
        <button onClick={handleDeleteSelected}>Eliminar Seleccionado</button>
        <button onClick={handleModifySelected}>Modificar Seleccionado</button>
      </div>
    </div>
  );
};

export default Tabla;
