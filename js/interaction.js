export function enableInteraction(gridContainer) {
    let scale = 1;
    let isMiddleButtonDown = false;
    let originX, originY, translateX = 0, translateY = 0;

    // Add zoom functionality
    document.addEventListener('wheel', function(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            scale *= 1.1; // scale up by 10%
        } else {
            scale /= 1.1; // scale down by 10%
        }
        scale = Math.min(Math.max(.75, scale), 2); // Restrict scale
        gridContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }, { passive: false });

    // Add pan functionality
    document.addEventListener('mousedown', (e) => {
        // Only start panning if middle button is pressed
        if (e.button === 1) {
            isMiddleButtonDown = true;
            originX = e.clientX;
            originY = e.clientY;
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (e.button === 1) {
            isMiddleButtonDown = false;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMiddleButtonDown) return;
        const deltaX = e.clientX - originX;
        const deltaY = e.clientY - originY;
        translateX += deltaX;
        translateY += deltaY;

        const gridRect = gridContainer.getBoundingClientRect();

        translateX = Math.min(Math.max(translateX, (window.innerWidth - gridRect.width) / 2), -(window.innerWidth - gridRect.width) / 2);
        translateY = Math.min(Math.max(translateY, (window.innerHeight - gridRect.height) / 2), -(window.innerHeight - gridRect.height) / 2);

        gridContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

        originX = e.clientX;
        originY = e.clientY;
    });

    // Disable default browser scroll on middle mouse button
    document.body.onmousedown = function(e) {
        if (e.button === 1) return false;
    }
}


export function highlightCells(gridContainer, index, enabled) {
    if (enabled){
        const previousHighlightedCells = gridContainer.getElementsByClassName("gridItem--highlight");
        Array.from(previousHighlightedCells).forEach(cell => {
            cell.classList.remove("gridItem--highlight");
        });

        const cellsToHighlight = [];
        cellsToHighlight.push(index);

        cellsToHighlight.forEach(cellIndex => {
            gridContainer.children[cellIndex].classList.add("gridItem--highlight");
        });
    }
}

function getSurroundingCells(index) {
    const rowSize = 25;
    const cellsToHighlight = [];
    const rowIndex = Math.floor(index / rowSize);
    const colIndex = index % rowSize;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = rowIndex + i;
            const newCol = colIndex + j;

            if (newRow >= 0 && newRow < rowSize && newCol >= 0 && newCol < rowSize) {
                const newIndex = newRow * rowSize + newCol;
                cellsToHighlight.push(newIndex);
            }
        }
    }

    return cellsToHighlight;
}

export function startGameTiles(gridContainer) {
    const index = 8 * 25 + 12;

    const cellsToHighlight = getSurroundingCells(index);
    cellsToHighlight.push(index);

    let randomIndexTree;
    let randomIndexStone;

    do {
        randomIndexTree = Math.floor(Math.random() * 8);
        randomIndexStone = Math.floor(Math.random() * 8);
    } while (randomIndexStone === randomIndexTree || randomIndexStone === 4 || randomIndexTree === 4)

    console.log("Tree: ", randomIndexTree)
    console.log("Stone: ", randomIndexStone)

    cellsToHighlight.forEach(cellIndex => {
        gridContainer.children[cellIndex].classList.add("gridItem--grass");
    });

    if (randomIndexTree !== 4) {
        gridContainer.children[cellsToHighlight[randomIndexTree]].classList.remove("gridItem--grass");
        gridContainer.children[cellsToHighlight[randomIndexTree]].classList.add("gridItem--tree");
    }

    if (randomIndexStone !== 4 && randomIndexStone !== randomIndexTree) {
        gridContainer.children[cellsToHighlight[randomIndexStone]].classList.remove("gridItem--grass");
        gridContainer.children[cellsToHighlight[randomIndexStone]].classList.add("gridItem--stone");
    }

    gridContainer.children[index].classList.add("gridItem--house");
    gridContainer.children[index].classList.remove("gridItem--grass");
}



export function centerGrid(gridContainer) {
    const gridRect = gridContainer.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const gridWidth = gridRect.width;
    const gridHeight = gridRect.height;

    const offsetX = (windowWidth - gridWidth) / 2;
    const offsetY = (windowHeight - gridHeight) / 2;

    console.log(window.innerWidth/2)
    console.log("X: ", offsetX)

    const translateX = (gridRect.width/2) - (window.innerWidth/2);
    const translateY = offsetY - gridRect.top;

    gridContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${.75})`;
}
