import React, { useState, useEffect } from 'react';
import './ModalOrden.css';

export default function ModalOrden({ isOpen, closeModal, selectedTable, menuItems, saveOrder }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setSelectedItems([]);
      setTotal(0);
    }
  }, [isOpen]);

  const addItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    setTotal(total + item.price);
  };

  const handleSaveOrder = () => {
    // Llamar a la función saveOrder pasando los platos seleccionados
    saveOrder(selectedItems);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ordenar para Mesa {selectedTable}</h2>

        {/* Lista de platos para seleccionar */}
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id} className="menu-item">
              {item.name} - S/ {item.price.toFixed(2)}
              <button onClick={() => addItem(item)}>Añadir</button>
            </li>
          ))}
        </ul>

        {/* Tabla de platos añadidos */}
        <h3>Orden actual</h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>Plato</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="order-total">
          <strong>Total: S/ {total.toFixed(2)}</strong>
        </div>

        {/* Botones de acción */}
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSaveOrder}>
            Guardar Orden
          </button>
          <button className="close-btn" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
