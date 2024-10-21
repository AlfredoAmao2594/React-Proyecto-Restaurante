import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFech";
import "./PlatosDeComida.css";
import { useState } from "react";

const PlatosDeComida = () => {
  const { categories, loading, error } = useFetch();
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return(
    <div>
      <p>Bienvenido, {username}</p>
      <Link to="/">
          <button className="btn-redireccion">Regresar al Panel de Mesas</button>
        </Link>
      <h1>Categorías de Comida</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.idCategory} className="category-card">
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <h2>{category.strCategory}</h2>
            <p>{category.strCategoryDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatosDeComida;
