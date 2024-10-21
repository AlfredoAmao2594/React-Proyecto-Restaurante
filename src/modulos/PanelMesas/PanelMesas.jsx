import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importamos SweetAlert2
import "./PanelMesas.css";
import ModalOrden from "./modals/ModalOrden/ModalOrden";
import ModalPedido from "./modals/ModalPedido/ModalPedido";
import { Link } from "react-router-dom";

const PanelMesas = () => {
  const [mesas, setMesas] = useState([
    { id: 1, isOccupied: false },
    { id: 2, isOccupied: false },
    { id: 3, isOccupied: false },
    { id: 4, isOccupied: false },
    { id: 5, isOccupied: false },
    { id: 6, isOccupied: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  const menuItems = [
    { id: 1, name: "Pizza", price: 8.99 },
    { id: 2, name: "Pasta", price: 7.99 },
    { id: 3, name: "Ensalada", price: 5.99 },
  ];

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");

    if (!storedUsername) {
      Swal.fire({
        title: "Ingrese su nombre",
        input: "text",
        inputLabel: "Nombre",
        inputPlaceholder: "Escriba su nombre aquí",
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!value) {
            return "Debe ingresar su nombre";
          }
        },
      }).then((result) => {
        if (result.value) {
          setUsername(result.value);
          sessionStorage.setItem("username", result.value);
        }
      });
    } else {
      setUsername(storedUsername); 
    }
  }, []);

  const openModal = (id) => {
    const mesa = mesas.find((mesa) => mesa.id === id);
    setSelectedTable(id);

    if (mesa.isOccupied) {
      setIsOrderModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOrderModalOpen(false);
  };

  const saveOrder = (orderItems) => {
    setMesas((prevMesas) =>
      prevMesas.map((mesa) =>
        mesa.id === selectedTable
          ? { ...mesa, isOccupied: true, orders: orderItems }
          : mesa
      )
    );
    closeModal();
  };

  const finalizeOrder = () => {
    setMesas((prevMesas) =>
      prevMesas.map((mesa) =>
        mesa.id === selectedTable
          ? { ...mesa, isOccupied: false, orders: [] }
          : mesa
      )
    );
    closeModal();
  };

  if (!username) {
    return null;
  }

  return (
    <div className="panel-mesas">
      <Link to="/platillos">
        <button className="btn-redireccion">Ver Platillos</button>
      </Link>
      <p>Bienvenido, {username}</p>
      <div className="header">
        <h1 className="title">Mesas del Restaurante</h1>
      </div>
      <div className="mesa-container">
        {mesas.map((mesa) => (
          <div
            key={mesa.id}
            className={`mesa ${mesa.isOccupied ? "occupied" : "available"}`}
            onClick={() => openModal(mesa.id)}
          >
            <div className="mesa-top">
              <span className="mesa-number">{mesa.id}</span>
            </div>
            <div className="mesa-base"></div>
            <div className="mesa-status">
              {mesa.isOccupied ? "Ocupada" : "Disponible"}
            </div>
          </div>
        ))}
      </div>

      <ModalOrden
        isOpen={isModalOpen}
        closeModal={closeModal}
        selectedTable={selectedTable}
        menuItems={menuItems}
        saveOrder={saveOrder}
      />

      <ModalPedido
        isOpen={isOrderModalOpen}
        closeModal={closeModal}
        selectedTable={selectedTable}
        orders={mesas.find((mesa) => mesa.id === selectedTable)?.orders || []}
        finalizeOrder={finalizeOrder}
      />
    </div>
  );
};

export default PanelMesas;
