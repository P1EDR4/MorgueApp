import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoTriangleLeft, GoTriangleRight } from 'react-icons/go';
import './Tabla.css';
import Clock from '../Dashboard/Clock';


const Tabla = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    sexo: '',
    seña: '',
    hora: '' // Eliminaremos este campo
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [modifyData, setModifyData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api-morgueapp.onrender.com/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Agregar fondo
  useEffect(() => {
    document.body.classList.add('tabla-background');

    // Quitar fondo cuando se cambia
    return () => {
      document.body.classList.remove('tabla-background');
    };
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    if (!formData.nombre || !formData.apellidos || !formData.sexo || !formData.seña) {
      alert("Los campos están vacíos. Por favor, complete todos los campos.");
      return; 
    }
  
    try {
      const hours = Clock.getHours();
      const minutes = Clock.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
  
      const formattedHour = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  
      if (modifyData) {
        await axios.put(`https://api-morgueapp.onrender.com/${modifyData._id}`, { ...formData, hora: formattedHour });
        setModifyData(null);
      } else {
        await axios.post('https://api-morgueapp.onrender.com', { ...formData, hora: formattedHour });
      }
      setFormData({
        nombre: '',
        apellidos: '',
        sexo: '',
        seña: ''
      });
      setShowAddForm(false);
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
        await axios.delete(`https://api-morgueapp.onrender.com/${id}`);
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
        apellidos: selectedItem.apellidos,
        sexo: selectedItem.sexo,
        seña: selectedItem.seña
      });
      setModifyData(selectedItem);
      setShowAddForm(true);
    } catch (error) {
      console.error('Error al modificar elemento:', error);
    }
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPageNumber = Math.min(currentPage, totalPages);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.hora.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="button-search-container">
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="tabla-icon">
            <g>
              <path
                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
              ></path>
            </g>
          </svg>
          <input
            className="input"
            type="search"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="button-container">
          <button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancelar' : 'Agregar Información'}
          </button>
          <button onClick={handleModifySelected}>Modificar Seleccionado</button>
          <button onClick={handleDeleteSelected}>Eliminar Seleccionado</button>
        </div>
      </div>
      {showAddForm && (
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
            name="apellidos"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={handleChange}
          />
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
          >
            <option value="">Sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <input
            type="text"
            name="seña"
            placeholder="Seña particular"
            value={formData.seña}
            onChange={handleChange}
          />
          {/* Eliminamos el campo de entrada de hora y lo reemplazamos con la hora actual */}
          <input
            type="text"
            name="hora"
            placeholder="Hora de entrada (automático)"
            value={`${Clock.getHours()}:${Clock.getMinutes()} ${Clock.getPeriod()}, ${Clock.getDay()}, ${Clock.getDate()}`}
            disabled
          />

          <button type="submit">Agregar Información</button>
        </form>
      )}
      <Clock /> {/* Muestra el reloj aquí */}
      <table>
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Sexo</th>
            <th>Seña particular</th>
            <th>Hora de entrada</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={e => handleCheckboxChange(e, item._id)}
                  checked={selectedItems.includes(item._id)}
                />
              </td>
              <td>{item.nombre}</td>
              <td>{item.apellidos}</td>
              <td>{item.sexo}</td>
              <td>{item.seña}</td>
              <td>{item.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <GoTriangleLeft
          className="icon-left"
          onClick={prevPage}
          disabled={currentPage === 1}
        />
        <GoTriangleRight
          className="icon-right"
          onClick={nextPage}
          disabled={indexOfLastItem >= data.length}
        />
        <div className="page-info">Página {currentPageNumber} de {totalPages}</div>
      </div>
    </div>
  );
};

export default Tabla;
