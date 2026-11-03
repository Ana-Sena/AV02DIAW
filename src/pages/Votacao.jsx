import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import {
  listarNaRoca,
  listarForaDaRoca,
  registrarVoto,
} from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao((quantidade) => quantidade + 1);
  }

  return (
    <main className="pagina votacao">
      <section>
        <h1>Quem deve deixar A Fazenda?</h1>
        <p>Vote para eliminar um dos participantes da roça. Você pode votar quantas vezes quiser.</p>

        <div className="grade-roca">
          {naRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
              onVotar={handleVotar}
            />
          ))}
        </div>

        <div role="status">
          {ultimoVoto !== null && (
            <p className="mensagem-voto">
              Voto registrado para eliminar <strong>{ultimoVoto.nome}</strong>!
              {' '}Você já votou {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'} nesta página.
              {' '}<Link to="/resultado">Ver parcial</Link>
            </p>
          )}
        </div>
      </section>

      <section className="demais-peoes">
        <h2>Demais peões</h2>
        <p>Estes participantes estão fora da roça e não podem receber votos.</p>
        <div className="grade-participantes">
          {foraDaRoca.map((participante) => (
            <ParticipanteCard key={participante.id} participante={participante} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
