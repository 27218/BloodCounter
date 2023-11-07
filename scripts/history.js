import {inputs, updateGraphics} from "./cells.js";



let history = []; // [[input, previousValue], ...]

function addToHistory(input, previousValue) {
	history.push([input, previousValue]);
}

function undo10() {
	let actions = history.splice(-10).reverse();
	actions.map(([input, previousValue]) => input.value = previousValue);
	updateGraphics();
}

function resetHistory() {
	history = [];
}



export {addToHistory, undo10, resetHistory};