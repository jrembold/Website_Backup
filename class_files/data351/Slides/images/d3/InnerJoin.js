var width = 70;
var height = 30;
var data = [];
var start = 401
var count = start;
var target = 503;
var rows = 10
var cols = 16

tab1x = 0
tab2x = 3 * width
res_start_y = 6*height
res_row = 1

tab1 = [
	{"row":0, "col":0, "value": "Name"},
	{"row":1, "col":0, "value": "Matt"},
	{"row":2, "col":0, "value": "Lisa"},
	{"row":3, "col":0, "value": "Jeff"},
	{"row":4, "col":0, "value": "Sarah"},

	{"row":0, "col":1, "value": "Friends"},
	{"row":1, "col":1, "value": 300},
	{"row":2, "col":1, "value": 500},
	{"row":3, "col":1, "value": 600},
	{"row":4, "col":1, "value": 400},
]
tab2 = [
	{"row":0, "col":0, "value": "Name"},
	{"row":1, "col":0, "value": "Matt"},
	{"row":2, "col":0, "value": "Lisa"},
	{"row":3, "col":0, "value": "Sarah"},
	{"row":4, "col":0, "value": "Sarah"},

	{"row":0, "col":1, "value": "Friends"},
	{"row":1, "col":1, "value": 500},
	{"row":2, "col":1, "value": 200},
	{"row":3, "col":1, "value": 100},
	{"row":4, "col":1, "value": 300},
]

res = [
	{"row":0, "col":0, "value": "Facebook.Name"},
	{"row":0, "col":1, "value": "Facebook.Friends"},
	{"row":0, "col":2, "value": "LinkedIn.Name"},
	{"row":0, "col":3, "value": "LinkedIn.Friends"},
]

var svg = d3.select("body")
	.append("svg")
	.attr("viewBox", "-200 -30 " + 750 + " " + 500)
	.attr('border', 'thin solid red')
	.attr("width", "100%")
	.attr("height", "100%")

svg.append("text")
	.attr('x', width)
	.attr('y', -5)
	.attr('text-anchor', 'middle')
	.text('Facebook')
svg.append("text")
	.attr('x', tab2x + width)
	.attr('y', -5)
	.attr('text-anchor', 'middle')
	.text('LinkedIn')

var b1s = svg.selectAll("boxes").data(tab1).enter()
	.append("rect")
	.attr("x", d => d.col * width)
	.attr("y", d => d.row * height)
	.attr("width", width)
	.attr("height", height)
	.attr("stroke", "black")
	.attr("fill-opacity", 0)

var l1s = svg.selectAll("labels").data(tab1).enter()
	.append("text")
	.attr("x", d => d.col*width+width/2)
	.attr("y", d => d.row*height+height/2-2)
	.text(d => d.value)
	.attr("text-anchor", "middle")
	.attr("font-size", "1em")
	.attr("fill", 'black')
	.attr("alignment-baseline", "mathematical")

var b2s = svg.selectAll("boxes").data(tab2).enter()
	.append("rect")
	.attr("x", d => d.col * width + 210)
	.attr("y", d => d.row * height)
	.attr("width", width)
	.attr("height", height)
	.attr("stroke", "black")
	.attr("fill-opacity", 0)

var l2s = svg.selectAll("labels").data(tab2).enter()
	.append("text")
	.attr("x", d => d.col*width+210+width/2)
	.attr("y", d => d.row*height+height/2-2)
	.text(d => d.value)
	.attr("text-anchor", "middle")
	.attr("font-size", "1em")
	.attr("fill", 'black')
	.attr("alignment-baseline", "mathematical")

svg.selectAll("boxes").data(res).enter()
	.append("rect")
	.attr("x", d => d.col * width + width/2)
	.attr("y", d => d.row * height + res_start_y)
	.attr("width", width)
	.attr("height", height)
	.attr("stroke", "black")
	.attr("fill-opacity", 0)

svg.selectAll("labels").data(res).enter()
	.append("text")
	.attr("x", d => d.col*width+width)
	.attr("y", d => d.row*height+height/2-2 + res_start_y)
	.text(d => d.value)
	.attr("text-anchor", "middle")
	.attr("font-size", "0.5em")
	.attr("fill", 'black')
	.attr("alignment-baseline", "mathematical")

function light(r1,c1,r2,c2) {
	k1 = b1s.filter(d => d.row == r1 & d.col == c1)
	k2 = b2s.filter(d => d.row == r2 & d.col == c2)
	v1 = tab1.filter( d => d.row == r1 & d.col == c1)[0].value
	v2 = tab2.filter( d => d.row == r2 & d.col == c2)[0].value
	b1s.transition().attr('fill-opacity', 0).attr('fill', 'white')
	b2s.transition().attr('fill-opacity', 0).attr('fill', 'white')
	k1.transition().attr('fill-opacity', 0.5).attr('fill', 'yellow')
	k2.transition().attr('fill-opacity', 0.5).attr('fill', 'yellow')
	if (v1 == v2) {
		k1.transition().delay(500).attr('fill', 'green').attr('fill-opacity', 0.5)
		k2.transition().delay(500).attr('fill', 'green').attr('fill-opacity', 0.5)
		setTimeout(() => move(r1, r2), 750)
	} else {
		k1.transition().delay(500).attr('fill', 'red').attr('fill-opacity', 0.5)
		k2.transition().delay(500).attr('fill', 'red').attr('fill-opacity', 0.5)
	}
}

function move(row1, row2) {
	br1 = b1s.filter(d => d.row == row1)
	lr1 = l1s.filter(d => d.row == row1)
	br2 = b2s.filter(d => d.row == row2)
	lr2 = l2s.filter(d => d.row == row2)

	br1.clone('deep').transition().duration(1000).attr('fill-opacity',0).attr('transform', `translate(${width/2}, 0)`).attr('y', res_start_y + res_row * height)
	lr1.clone('deep').transition().duration(1000).attr('transform', `translate(${width/2}, 0)`).attr('y', res_start_y + res_row * height + height / 2 - 2)
	br2.clone('deep').transition().duration(1000).attr('fill-opacity',0).attr('transform', `translate(-${width/2}, 0)`).attr('y', res_start_y + res_row * height)
	lr2.clone('deep').transition().duration(1000).attr('transform', `translate(-${width/2}, 0)`).attr('y', res_start_y + res_row * height + height / 2 - 2)
	res_row = res_row + 1
}

function generate_transitions() {
	let trans = []
	let index_val = 1
	for ( let r1=1; r1 < 5 ; r1++) {
		for ( let r2=1; r2 < 5; r2++) {
			console.log(r1, r2)
			trans.push({transitionForward: () => light(r1,0,r2,0), index: index_val});
			index_val++;
		}
	}
	console.log(trans)
	return trans

}

var _transitions = generate_transitions()

