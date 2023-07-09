import { createGrid } from "./grid.js";
import {enableInteraction} from "./interaction.js";

window.onload = function() {
    const gridContainer = document.getElementById("gridContainer");

    createGrid(gridContainer);
    enableInteraction(gridContainer);
};
