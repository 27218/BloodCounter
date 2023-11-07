import names from "./names.js";

var chart = new CanvasJS.Chart("chartContainer", {
	// title: {text: "Desktop Search Engine Market Share - 2016"},
	animationEnabled: true,
	animationDuration: 500,

	toolTip: {enabled: false},

	data: [{
		explodeOnClick: false,

		radius: 100,
		innerRadius: 60,

		type: "doughnut", // pie
		startAngle: 240,
		yValueFormatString: ": #", // "##0.00\"%\""
		indexLabel: "{label} {y}",
		dataPoints: []
	}]
});

function resize() {
	let smallScreen = matchMedia('(max-width: 40em)');

	let [r1, r2] = [100, 60];
	if(smallScreen.matches) [r1, r2] = [40, 24];

	chart.options.data[0].radius = r1;
	chart.options.data[0].innerRadius = r2;

	chart.render();
}
window.addEventListener("resize", resize);
resize();



function updateChart(values) {
	chart.options.data[0].dataPoints = names.map((name, i) => ({y: values[i], label: name})).filter(obj => obj.y);
	chart.render();
}

export {updateChart};