const cellElements = document.querySelectorAll("[data-cell]");
const table = document.querySelector("[data-table]");
const textWinElement = document.querySelector("[data-textwin-msg]");
const textWin = document.querySelector("[data-textwin]")
const restartButton = document.querySelector("[data-restart-button]")

let isCircleTurn;

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true});
    };

    setTableHoverClass();
    textWin.classList.remove("show-textwin")
};

const endGame = (isDraw) => {
    if (isDraw) {
        textWinElement.innerText = "Empate"
    } else {
        textWinElement.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!"
    };

    textWin.classList.add ("show-textwin");
};

const checkForWin = (currentPlayer) => {
    return combinations.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setTableHoverClass = () => {
    table.classList.remove("circle")
    table.classList.remove("x")

    if (isCircleTurn) {
        table.classList.add("circle");
    } else {
        table.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setTableHoverClass();
};

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);

    const isDraw = checkForDraw();
    if (isWin) {
        endGame(false)
    } else if (isDraw){
        endGame(true)
    } else {
        swapTurns();
    }
};

    startGame();

    restartButton.addEventListener("click", startGame);

