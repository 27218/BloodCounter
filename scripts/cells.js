import names from "./names.js";
import {addToHistory} from "./history.js";



// fill cells
const template = name => `<div class="cells__item">
	<img ondragstart="return false" src="images/${name}.png" alt="${name}">
	<span class="cells__name">${name}</span>

	<div class="numberInput">
		<button class="numberInput__dec">-</button>
		<input class="numberInput__input" type="number" inputmode="numeric" min="0" value="0">
		<button class="numberInput__inc">+</button>
	</div>
</div>`;

names.map(name => cells.insertAdjacentHTML("beforeend", template(name)));
const inputs = [...cells.querySelectorAll(".numberInput__input")];



// clicks
function updateHeader() {
	let count = inputs.reduce((a, b) => a + +b.value, 0);
	controlPanel.innerText = `Панель управления (клеток: ${count})`;
}
function updateOpacity(input) {
	input.parentNode.parentNode.style.opacity = input.value == 0 ? .5 : 1;
}
function updateGraphics() {
	updateHeader();
	inputs.map(updateOpacity);
}


function playSound() {
	if(soundsToggle.checked) new Audio("sound/click.mp3").play();
}



// add listeners
function handleOnclick(input, increase) {
	let value = input.value;
	increase ? input.stepUp() : input.stepDown();
	
	let valueChanged = input.value != value;
	if(!valueChanged) return;

	updateHeader();
	updateOpacity(input);
	addToHistory(input, value);

	playSound();
}
function handleOnchange(input) {
	updateHeader();
	updateOpacity(input);
	addToHistory(input, input.previousValue || 0);

	input.previousValue = input.value;
}

document.querySelectorAll(".cells__item").forEach(cells__item => {
	let numberInput        = cells__item.querySelector(".numberInput");
	let numberInput__input = cells__item.querySelector(".numberInput__input");
	let numberInput__inc   = cells__item.querySelector(".numberInput__inc");
	let numberInput__dec   = cells__item.querySelector(".numberInput__dec");

	cells__item.onclick = e => e.path.includes(numberInput) || handleOnclick(numberInput__input, true);
	numberInput__inc.onclick = e => handleOnclick(numberInput__input, true);
	numberInput__dec.onclick = e => handleOnclick(numberInput__input, false);

	numberInput__input.onchange = e => handleOnchange(numberInput__input);
});



export {inputs, updateGraphics};