var width = 10;
var height = 10;
var gap_vert = 2;
var gap_hor = 25;
var colors = [Blue, Purple, Green, Yellow, Red]
var data = [];
var group1 = [];
var butt_x = 5 + (5*width)/2 - (3*width)/2
var butt_y = 5 + (height + gap_vert) * 5
for ( let i=0; i < 5; i += 1) {
	for (let j=0; j < 5; j++) {
		data.push({
			"x":5+(j*width),
			"y":i*(height+gap_vert)+5, 
			"color": colors[i], 
			"active": true,
			"row": i,
			"feature": j
		});
	}
}
var svg = d3.select("body")
	.append("svg")
	.attr("viewBox", "0 0 " + (2)*(5*width+gap_hor) + " " + (6*(height+gap_vert)+10))
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
	.attr("width", 3*width)
	.attr("height", height)
	.attr("stroke", "black")
	.attr("fill", Orange)
	.attr("fill-opacity", 0)
button.append("text")
	.text("Create")
	.attr("font-size", "10px")
	.attr("text-anchor", "middle")
	.attr("alignment-baseline", "central")
	.attr("x", butt_x + 0.5 * 3*width)
	.attr("y", butt_y + .5 * height)

button2 = svg.append("g")
	.attr("class", "button2")
	.style("cursor", "pointer")
	.on("click", drop_features)
	.on("mouseover", (d,i) => svg.select(".button2 rect").transition().duration(200).attr("fill-opacity", 0.25))
	.on("mouseout", (d,i) => svg.select(".button2 rect").transition().duration(200).attr("fill-opacity", 0));
button2.append("rect")
	.attr("x", butt_x + 5 * width + gap_hor)
	.attr("y", butt_y)
	.attr("width", 3*width)
	.attr("height", height)
	.attr("stroke", "black")
	.attr("fill", Orange)
	.attr("fill-opacity", 0)
button2.append("text")
	.text("Drop")
	.attr("font-size", "10px")
	.attr("text-anchor", "middle")
	.attr("alignment-baseline", "central")
	.attr("x", butt_x + 5 * width + gap_hor + 0.5 * 3*width)
	.attr("y", butt_y + .5 * height)

function grab(group) {
	let i = Math.floor(Math.random() * 5);
	data.forEach(function (d) {if (d.row == i) {group.push(d)}});
	console.log(group)

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
		.attr("x", d => d.x + 5*width + gap_hor)
		.attr("y", (Math.floor(group.length/5)-1) * (height+gap_vert) + 5)
		.attr("fill-opacity", 0.5)
		.delay(group.length/5*200)
}

function draw_5() {
	// Draws and animates 5 random draws with replacement after removing the existing entries
	group1.length = 0;
	svg.selectAll('#group1').data(group1, d => d.id).exit().remove()
	for (var i = 0; i < 5; i++ ) {
		grab(group1)
	}
}

function hide_feature(feature_index) {
	group1.forEach(function(d) {
			if (d.feature == feature_index) {
				d.active = false
			}
		}
	)
	svg.selectAll('#group1').data(group1)
		.transition()
		.duration(1000)
		.filter(d => d.active != true)
		.attr("fill-opacity", 0)
}

function drop_features() {
	var toHide = []
	for (let i=0; i < 5; i++) {
		if (Math.random() > 0.5) {
			toHide.push(i);
		}
	}

	group1.forEach(function(d) {
			d.active = true
		})
	svg.selectAll('#group1').data(group1)
		.attr("fill-opacity", 0.5)
	toHide.forEach(function(d) {hide_feature(d)})
	console.log(toHide)
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
