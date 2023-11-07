import names from "./names.js";

let sum = arr => arr.reduce((a, b) => a + b);

function calculate(values) {
	let totalSum = sum(values);

	// Суммы рядов
	let neutSum = sum(values.slice(1, 1+5));
	let erythSum = sum(values.slice(12, 12+5));

	// Индексы
	let ISN = (values[1] + values[2] + values[3]) / (values[4] + values[5]);
	let ISE = (values[15] + values[16]) / erythSum;

	return {
		totalSum, neutSum, erythSum,
		myelokaryocytes: +myelokaryocytes.value,
		ISN, ISE,
		
		table: values.map((count, i) => [names[i], count, count/totalSum * 100])
	}
}

export {calculate};