var width = 50;
var height = 10;
var gap_vert = 2;
var gap_hor = 25;
var colors = [Blue, Purple, Green, Yellow, Red, Orange, Cyan, DGray]
var data = [];
var group1 = [];
var rows = 8;
var butt_x = 5 + (2*width + gap_hor)/2 - width/2
var butt_y = 5 + (height + gap_vert) * rows
for ( var i=0; i < rows; i += 1) {
	data.push({"x":5,"y":i*(height+gap_vert)+5, "color": colors[i] });
}
var svg = d3.select("body")
	.append("svg")
	.attr("viewBox", "0 0 " + (2)*(width+gap_hor) + " " + ((rows+1)*(height+gap_vert)+10))
	.attr("width", "100%")
	.attr("height", "100%")

var boxes = svg.selectAll("boxes").data(data).enter()
	.append("rect")
	.attr("x", d => d.x)
	.attr("y", d => d.y)
	.attr("width", width)
	.attr("height", height)
	.attr("stroke", d => d.color)
	.attr("fill", d => d.color)
	.attr("fill-opacity", 0.5)

button = svg.append("g")
	.attr("class", "button")
	.style("cursor", "pointer")
	.on("click", draw_5)
	.on("mouseover", (d,i) => svg.select(".button rect").transition().duration(200).attr("fill-opacity", 0.25))
	.on("mouseout", (d,i) => svg.select(".button rect").transition().duration(200).attr("fill-opacity", 0));
button.append("rect")
	.attr("x", butt_x)
	.attr("y", butt_y)
	.attr("width", width)
	.attr("height", height)
	.attr("stroke", "black")
	.attr("fill", Orange)
	.attr("fill-opacity", 0)
button.append("text")
	.text("Create")
	.attr("font-size", "10px")
	.attr("text-anchor", "middle")
	.attr("alignment-baseline", "central")
	.attr("x", butt_x + 0.5 * width)
	.attr("y", butt_y + .5 * height)


function grab(group) {
	let i = Math.floor(Math.random() * 5);
	group.push(data[i]);

	svg.selectAll('#group1').data(group).enter()
		.append("rect")
		.attr("x", d => d.x)
		.attr("y", d => d.y)
		.attr("width", width)
		.attr("height", height)
		.attr("stroke", d => d.color)
		.attr("fill", d => d.color)
		.attr("fill-opacity", 0.0)
		.attr("id",'group1')
		.transition()
		.duration(1000)
		.attr("x", d => d.x + width + gap_hor)
		.attr("y", (group.length-1) * (height+gap_vert) + 5)
		.attr("fill-opacity", 0.5)
		.delay(group.length*200)
}

function draw_5() {
	// Draws and animates 5 random draws with replacement after removing the existing entries
	group1.length = 0;
	svg.selectAll('#group1').data(group1, d => d.id).exit().remove()
	for (var i = 0; i < rows; i++ ) {
		grab(group1)
	}
}


//var _transitions = [
//{
	//transitionForward: () => draw_5(),
//},
//{
	//transitionForward: () => draw_5(),
//},
//{
	//transitionForward: () => draw_5(),
//},
//]
<!--play()-->
