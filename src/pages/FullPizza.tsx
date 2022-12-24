import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

type PizzaType = {
  imageUrl: string;
  title: string;
  price: number;
};

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<PizzaType>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://638bb8ec7220b45d2295a761.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении данных");
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>"Загрузка..."</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>от {pizza.price} ₽</h4>
      <Link to="/" className="button button--outline button--add go-back-btn">
        <span>Назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
