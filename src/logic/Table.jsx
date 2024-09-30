// importando constantes
import { winner_combos } from "../constants";

// verificar ganador
export const checkWinner = (TableToCheck) => {
    // recorriendo winner_combos
    for (const combo of winner_combos){
        // a b c simula a los tres elementos de cada array
        const [a, b, c] = combo;
        // verificando si "x" o "o" son iguales respetando los combos
        if (
            TableToCheck[a] === TableToCheck[b] &&
            TableToCheck[b] === TableToCheck[c]
        ){
            // resultado si hay un combo (si hay un ganador)
            return TableToCheck[a];
        }
    }
    // resultado si no hay un combo (si no hay un ganador)
    return null
}