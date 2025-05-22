
//Card.js
import './Card.css';

function Card({ iconClass, number, label, className }) {
  return (
    <div className="card">
      <div className={`card-icon ${className}`}>
        <span className={`las ${iconClass}`}></span>
      </div>
      <div className="card-info">
        <h2>{number}</h2>
        <small>{label}</small>
      </div>
    </div>
  );
}

export default Card;
