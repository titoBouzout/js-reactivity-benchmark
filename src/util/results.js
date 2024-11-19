const { writeFileSync } = require("fs");
const results = require(process.cwd() + "/results.json");

const testsGroup = Object.groupBy(results, (item) => item.test);
const fwGroup = Object.groupBy(results, (item) => item.framework);

const colors = {
	SolidJS: "#2c4f7c",
	Oby: "#74741d",
	pota: "#4d3057",
};

function color(fw) {
	if (!colors[fw]) {
		colors[fw] =
			"#" +
			((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0") +
			"44";
	}
	return colors[fw];
}

function keyForLink(key) {
	return "l" + key.replace(/[^a-z0-9]/gi, "");
}

let table = `
	<style>
		* {
			font-family: arial;
			color: white;
			background: rgb(30 31 33);
			padding: 4px;
			white-space: nowrap;
		}
	</style>
	<h1>${new Date()}</h1>
`;

// totals

table += `<div class="group">
			<h3>Totals</h3>
		`;
for (const [key, rows] of Object.entries(fwGroup)) {
	table += `<div>${key} - ${rows.reduce((x, c) => +c.time + x, 0)}</div>`;
}
table += `</div>`;

// results
for (const [key, rows] of Object.entries(testsGroup)) {
	table += `
		<div class="group">
			<h3 id="${keyForLink(key)}">
				<a href="#${keyForLink(key)}">${key}</a>
			</h3>
	`;
	rows.sort((a, b) => a.time - b.time);
	for (const row of rows) {
		table += `
			<div style="width:${row.time}px;background:${color(row.framework)}">
				${row.framework} - ${row.time}
			</div>
		`;
	}
	table += `</div>`;
}

const name = `results-${Date.now()}.html`;
writeFileSync(name, table);

console.log();
console.log(`See ${name} for results`);
