const gridContainer = document.getElementById("grid-container");
const squareButton = document.getElementById('square-button');

function createGrid(number){
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    gridContainer.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${number}, 1fr)`;
    for (let i = 0; i < number * number; i++){
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid");

        gridSquare.addEventListener("mouseover", () => {
            gridSquare.style.backgroundColor = "black";
        });

        gridContainer.appendChild(gridSquare);
    }
}

squareButton.addEventListener('click', function() {
    let gridSize = prompt("Please enter the grid size in pixels (Less than 100):");
    if (gridSize === null || gridSize > 100){
        alert("Grid size not changed due to invalid input.");
        return;
    }
    createGrid(gridSize);
});

window.onload = function() {
    createGrid(16);
};