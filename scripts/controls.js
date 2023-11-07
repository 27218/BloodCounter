import {inputs, updateGraphics} from "./cells.js";
import {updateTable} from "./table.js";
import {updateChart} from "./chart.js";
import {undo10, resetHistory} from "./history.js";



undoButton.onclick = () => undo10();

resetButton.onclick = () => {
	inputs.map(x => x.value = '0');
	updateGraphics();
	resetHistory();
}

resultButton.onclick = () => {
	let sectionHidden = document.querySelectorAll(".section--hidden");
	sectionHidden.forEach(x => x.style.display = "block"); // show

	window.scroll({
		top: result.getBoundingClientRect().top + window.scrollY - 70,
		behavior: "smooth"
	});

	let values = inputs.map(x => +x.value);
	updateTable(values);
	updateChart(values);

	sectionHidden.forEach(x => x.style.opacity = 1); // fade
}

zenToggle.oninput = () => {
	cells.classList.toggle("cells--zen");
}