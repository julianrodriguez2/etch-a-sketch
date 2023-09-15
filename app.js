const gridContainer = document.getElementById("grid-container");
const squareButton = document.getElementById('square-button');
const clearButton = document.getElementById('clear-button');
const eraserButton = document.getElementById('eraser-button');
const colorPicker = document.getElementById('colorpicker');

let newColor = document.getElementById("colorpicker").value;
let currSize = 0;
let mouseDown = false;


colorPicker.addEventListener('input', (e) => {
    newColor = e.target.value;
});

// We use these events on the document to ensure that mouseDown status is accurate
document.addEventListener('mousedown', () => { mouseDown = true; });
document.addEventListener('mouseup', () => { mouseDown = false; });

function createGrid(number) {
    currSize = number;
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    gridContainer.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${number}, 1fr)`;

    for (let i = 0; i < number * number; i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid");

        gridSquare.addEventListener('mouseenter', function(e) {
            if (mouseDown) changeColor(e);
        });
        gridSquare.addEventListener('mousedown', function(e) {
            e.preventDefault();  // Prevent the default drag-and-drop behavior
            changeColor(e);
        });

        gridContainer.appendChild(gridSquare);
    }
}

function changeColor(e) {
    e.target.style.backgroundColor = newColor;
}

squareButton.addEventListener('click', function() {
    let gridSize = parseInt(prompt("Please enter the grid size in pixels (Less than 100):"), 10);
    if (isNaN(gridSize) || gridSize === null || gridSize > 100) {
        alert("Grid size not changed due to invalid input.");
        return;
    }
    createGrid(gridSize);
});

eraserButton.addEventListener('click', function(){
    newColor = 'white';
});

clearButton.addEventListener('click', function() {
    createGrid(currSize);
});

window.onload = function() {
    createGrid(16);
};
