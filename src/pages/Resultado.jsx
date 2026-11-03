import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(obterVotos);
  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Tem certeza de que deseja zerar a votação?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina resultado">
      <h1>Parcial da eliminação</h1>
      <p>Total de votos computados: <strong>{total}</strong></p>

      {total === 0 ? (
        <div className="resultado-vazio">
          <p>Ainda não há votos registrados. Seja o primeiro a votar!</p>
          <Link to="/votacao" className="botao botao-principal">Votar agora</Link>
        </div>
      ) : (
        <div className="placar">
          {resultado.map((participante, indice) => (
            <article
              key={participante.id}
              className={indice === 0 ? 'placar-item placar-lider' : 'placar-item'}
            >
              <img src={participante.foto} alt={participante.nome} className="placar-foto" />
              <div className="placar-info">
                <h2>{participante.nome}</h2>
                {indice === 0 && <span className="selo-lider">Sairia hoje</span>}
                <p>
                  <strong>
                    {participante.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%
                  </strong>
                  {' '}({participante.votos} votos)
                </p>
                <div
                  className="barra"
                  role="progressbar"
                  aria-label={`Percentual de votos de ${participante.nome}`}
                  aria-valuenow={participante.percentual}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="barra-preenchida" style={{ width: `${participante.percentual}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="resultado-acoes">
        <button type="button" className="botao" onClick={handleZerar}>Zerar votação</button>
      </div>
    </main>
  );
}

export default Resultado;
