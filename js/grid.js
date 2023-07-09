import { enableInteraction, highlightCells, startGameTiles } from './interaction.js';

export function createGrid(gridContainer) {
    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 25; j++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("gridItem");
            gridItem.addEventListener("mouseover", function() {
                const cellIndex = i * 25 + j; // Calculate the cell index
                highlightCells(cellIndex);
            });
            gridContainer.appendChild(gridItem);
        }
    }

    gridContainer.addEventListener("mouseover", function(e) {
        const cell = e.target;
        if (cell.classList.contains("gridItem")) {
            const cellIndex = Array.from(gridContainer.children).indexOf(cell);
            highlightCells(gridContainer, cellIndex);
        }
    });

    startGameTiles(gridContainer);

    enableInteraction(gridContainer);
}

