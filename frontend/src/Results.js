import React from 'react';
import { useLocation } from 'react-router-dom';
import TuristicPointCard from './components/TuristicPointCard.js';

const Results = () => {
  const location = useLocation();
  const { resultado } = location.state || {}; // Acessa o estado passado pelo Link

  if (!resultado || !resultado.roteiro) {
    console.error(resultado);
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Resultados</h1>
      <hr className="custom-line" />
      <p>Confira as recomendações de pontos turísticos para sua trilha</p>
      {resultado.roteiro.map((point, index) => (
        <TuristicPointCard
          key={index}  // É sempre uma boa prática passar uma chave única ao mapear arrays
          number={index + 1} // Passa o índice + 1 como prop
          name={point.nome} // Ajuste para usar a propriedade correta
          description={point.descricao} // Ajuste para usar a propriedade correta
          rating={point.avaliacao} // Ajuste para usar a propriedade correta
          distance={point.distancia} // Certifique-se de que essa propriedade existe
          estimade_time_in_minutes={point.tempo_estimado} // Ajuste para usar a propriedade correta
          link_rota={point.link_rota} // Certifique-se de que essa propriedade existe
        />
      ))}
    </div>
  );
};

export default Results;