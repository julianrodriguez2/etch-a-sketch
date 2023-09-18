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

        if (showGridLines) {
            gridSquare.classList.add('grid-lines');
        }

        gridSquare.addEventListener('mouseenter', function(e) {
            if (mouseDown) changeColor(e);
        });
        gridSquare.addEventListener('mousedown', function(e) {
            e.preventDefault();
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
    newColor = '#F8F9FA';
});

clearButton.addEventListener('click', function() {
    createGrid(currSize);
});

const lineButton = document.getElementById('line-button');
let showGridLines = false;

lineButton.addEventListener('click', function() {
    toggleGridLines();
});

function toggleGridLines() {
    const gridElements = document.querySelectorAll('.grid');
    
    if (showGridLines) {
        gridElements.forEach(element => {
            element.classList.remove('grid-lines');
        });
        showGridLines = false;
        lineButton.textContent = "Show Grid Lines";
    } else {
        gridElements.forEach(element => {
            element.classList.add('grid-lines');
        });
        showGridLines = true;
        lineButton.textContent = "Hide Grid Lines";
    }
}


window.onload = function() {
    createGrid(16);
};
