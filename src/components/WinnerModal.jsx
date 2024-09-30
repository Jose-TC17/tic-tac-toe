// importando el square
import { Square } from "./Square";

// importando resert game
// eslint-disable-next-line react/prop-types
export function WinnerModal({ winner, resetGame }) {
  /* creando un menú de partida */
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Ganó: ";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <footer>
          {/* boton para reiniciar partida */}
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
