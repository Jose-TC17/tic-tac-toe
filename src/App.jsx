// importando los useState
import { useState } from "react";
// importando canvas confetti
import confetti from "canvas-confetti";

// importando square
import { Square } from "./components/Square";

// importando los estilos de css
import "./Index.css";
// importando constantes
import { Turns, checkEndGame } from "./constants";
// importando checkwinner
import { checkWinner } from "./logic/Table";

import { WinnerModal } from "./components/WinnerModal.jsx";
import { resetGameStorage, saveGameToStorage } from "./logic/storage/index.js";

function App() {
    // dibujando el tablero
    const [table, setTable] = useState(() => {
        const tableFromStorage = window.localStorage.getItem("table");
        if (tableFromStorage) return JSON.parse(tableFromStorage);
        return Array(9).fill(null);
    });

    // creando el turno del usuario
    const [turn, setTurn] = useState(() => {
        const turnsLocalStorage = window.localStorage.getItem("turn");
        return turnsLocalStorage ?? Turns.X;
    });

    // null cuando nadie gano y false cuando empataron
    const [winner, setWinner] = useState(null);

    const resetGame = () => {
        setTable(Array(9).fill(null));
        setTurn(Turns.X);
        setWinner(null);

        // borrando localstorage
        resetGameStorage();
    };

    // funcion para actualizar el turno del jugador
    const updateTable = (index) => {
        // verificar si una casilla es vacias o no
        if (table[index] || winner) return;

        // agregando "x" o "o"
        const newTable = [...table];
        newTable[index] = turn;
        setTable(newTable);

        // cambiar el turno
        const newTurn = turn === Turns.X ? Turns.O : Turns.X;
        setTurn(newTurn);

        // guardar la partida
        saveGameToStorage(
            {
                table: newTable,
                turn: newTurn,
            }[(table, turn)]
        );

        // revisar si hay un ganador
        const newWinner = checkWinner(newTable);
        if (newWinner) {
            confetti();
            setWinner(newWinner);
        } else if (checkEndGame(newTable)) {
            // verificar si hay un empate
            setWinner(false);
        }
    };

    return (
        <main className="board">
            <h1>Tik Tac Toe</h1>
            <button onClick={resetGame}>Reiniciar Juego</button>
            <section className="game">
                {table.map((square, index) => {
                    return (
                        <Square key={index} index={index} updateTable={updateTable}>
                            {square}
                        </Square>
                    );
                })}
            </section>

            {/* seccion del turno */}
            <section className="turn">
                <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
                <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
            </section>

            <WinnerModal winner={winner} resetGame={resetGame} />
        </main>
    );
}

export default App;
