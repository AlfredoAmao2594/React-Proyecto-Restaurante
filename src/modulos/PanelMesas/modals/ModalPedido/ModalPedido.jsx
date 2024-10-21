import React from 'react';
import './ModalPedido.css';

export default function ModalPedido({ isOpen, closeModal, selectedTable, orders, finalizeOrder }) {
  if (!isOpen) return null;

  const total = orders.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Pedido para Mesa {selectedTable}</h2>

        {/* Tabla de platos añadidos */}
        <h3>Platos ordenados</h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>Plato</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="order-total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>

        {/* Botones de acción */}
        <div className="modal-actions">
          <button className="finalize-btn" onClick={finalizeOrder}>
            Finalizar Orden
          </button>
          <button className="close-btn" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
