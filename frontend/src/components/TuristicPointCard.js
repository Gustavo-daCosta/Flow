import React from 'react';
import './styles/TuristicPointCard.css'; // Importa o arquivo CSS separado

const TuristicPointCard = ({
  number, // Nova prop para o número
  name,
  description,
  rating,
  distance,
  estimade_time_in_minutes,
  preço,
  link_rota
}) => {
  return (
    <div className="card-response">
      <div className="card-content-response">
        <div className="number-circle-container-response">
          <div className="number-circle-response">{number}</div> {/* Usa a prop number */}
          <div className="vertical-line-response"></div>
        </div>

        <div className="text-content-response">
          <h2 className="title-response">{name}</h2>
          <p className="description-response">{description}</p>
          
          <div className="details-response">
            <div>
              <strong className="rating-label-response">Rating: </strong>
              <span className="rating-value-response">{rating}</span>
            </div>

            <div>
              <strong className="distance-label-response">Distância: </strong>
              <span className="value-response">{distance ? `${distance} km` : 'N/A'}</span>
            </div>

            <div>
              <strong className="travel-time-label-response">Tempo de Deslocamento: </strong>
              <span className="value-response">{estimade_time_in_minutes} minutos</span>
            </div>

            <div>
              <strong className="price-label-response">Preço Estimado: </strong>
              <span className="value-response">{preço}</span>
            </div>
          </div>
          
          <div className="map-link-container-response">
            <a href={link_rota} target="_blank" rel="noopener noreferrer" className="map-link-response">
          {console.log(link_rota)}
              Como chegar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuristicPointCard;