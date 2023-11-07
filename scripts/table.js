import names from "./names.js";
import {calculate} from "./calculate.js";



// create table
const table = document.querySelector(".table tbody"),
	  tableHeader = document.querySelector(".table thead");

names.map(name => table.insertAdjacentHTML("beforeend", `<tr>
	<td></td>
	<td>${name}</td>
	<td>123</td>
	<td>16.5%</td>
</tr>`));

function mergeRows(index, span, text) {
	table.children[index].children[0].rowSpan = span;
	table.children[index].children[0].innerHTML = text;
	while(--span) table.children[index + span].children[0].style.display = "none";
}
mergeRows(1, 5, `Клетки нейтрофи&shy;льного ряда<span id="neutCells">(123)</span>`);
mergeRows(12, 5, `Клетки эритроид&shy;ного ряда<span id="erythCells">(123)</span>`);



function updateTable(values) {
	let data = calculate(values);

	tableHeader.querySelector("span").innerText = `(${data.totalSum})`; // Сумма

	table.querySelectorAll("td:nth-child(3)").forEach((elem, i) => { // Кол-во
		elem.innerText = data.table[i][1];
	});
	table.querySelectorAll("td:nth-child(4)").forEach((elem, i) => { // %
		let percent = elem.innerText = data.table[i][2];
		elem.innerText = `${percent.toFixed(2)}%`;
	});

	// Суммы рядов
	neutCells.innerText = `(${data.neutSum})`;
	erythCells.innerText = `(${data.erythSum})`;

	// Индексы
	ISN.innerText = data.ISN.toFixed(2);
	ISE.innerText = data.ISE.toFixed(2);
}

export {updateTable};