import React, { useState } from "react";
import "./App.css";

interface Service {
  id: number;
  name: string;
  price: number;
}

const servicesData: Service[] = [
  { id: 1, name: "Багаж 10 кг", price: 500 },
  { id: 2, name: "Выбор места у окна", price: 300 },
  { id: 3, name: "Питание на борту", price: 700 },
  { id: 4, name: "Wi-Fi на борту", price: 400 },
];

const App: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const addService = (service: Service) => {
    setSelectedServices((prev) => [...prev, service]);
  };

  const removeService = (id: number) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== id));
  };

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const isSelected = (id: number) => selectedServices.some((s) => s.id === id);

  return (
    <div className="container">
      <h1>Дополнительные услуги</h1>
      <div className="services-list">
        {servicesData.map((service) => (
          <div key={service.id} className="service-item">
            <div>
              <strong>{service.name}</strong>
              <p>{service.price} ₽</p>
            </div>
            {isSelected(service.id) ? (
              <button onClick={() => removeService(service.id)}>Удалить</button>
            ) : (
              <button onClick={() => addService(service)}>Добавить</button>
            )}
          </div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="summary">
          <h2>Итого</h2>
          <ul>
            {selectedServices.map((s, idx) => (
              <li key={idx}>
                {s.name} — {s.price} ₽
              </li>
            ))}
          </ul>
          <p>
            <strong>Общая сумма: {totalPrice} ₽</strong>
          </p>
          <button className="checkout-btn">Оформить заказ</button>
        </div>
      )}
    </div>
  );
};

export default App;
