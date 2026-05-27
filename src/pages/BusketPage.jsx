import React from 'react';
import { busket } from '../data/busket';

export default function Busket() {
  return (
    <div className="busket-page">
      <h1 className="busket-header">Корзина</h1>
      <div className="busket-container">
        {busket.length === 0 ? (
          <div className="empty-state">
            Ваша корзина пока что пуста
            <button>В каталог →</button>
          </div>
        ) : (
          <ul className="busket-items">
            {busket.map(course => (
              <li key={course.id} className="busket-item">
                <img src={course.image} alt={course.title} />
                <div className="busket-item-info">
                  <h3 className="busket-item-title">{course.title}</h3>
                  <p className="busket-item-price">${course.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}