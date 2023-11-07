import {inputs} from "./cells.js";
import {calculate} from "./calculate.js";



function download(text, filaneme) {
	let a = document.createElement('a');
	let url = URL.createObjectURL(new Blob([text]));
	a.setAttribute("href", url);
	a.setAttribute("download", filaneme);
	a.click();
	URL.revokeObjectURL(url)
}

downloadButton.onclick = () => {
	let values = inputs.map(x => +x.value);
	let data = calculate(values);
	console.log(data);

	let text = "Название Кол-во %\n";
	text += data.table.map(x => `${x[0]}\t${x[1]}\t${x[2]}%`).join('\n');

	text += `\n\nВсего клеток: ${data.totalSum}`;
	text += `\nСумма клеток нейтрофильного ряда: ${data.neutSum}`;
	text += `\nСумма клеток эритроидного ряда: ${data.erythSum}`;

	text += `\n\nМиелокариоциты: ${data.myelokaryocytes}`;
	text += `\nИСН: ${data.ISN}`;
	text += `\nИСЭ: ${data.ISE}`;

	download(text, "BloodCounter_table.txt");
}