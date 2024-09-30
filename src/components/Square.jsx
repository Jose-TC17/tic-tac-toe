// cuadrado del tablero

export const Square = ({ children, isSelected, updateTable, index }) => {
    const className = `square ${isSelected ? "is-selected" : ""}`;

    // aqui es donde cambiamos el estado
    const handleClick = () => {
        updateTable(index);
    };

    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>

    );
};
