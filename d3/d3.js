var random = d3.random.normal(.5,.1),
		data = d3.range(800).map(function(){return [random(),random()];});

var margin = {top:10,right:10,bottom:20,left:40},
		width = 960 - margin.right - margin.left,
		height=500 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0,width]);
var y = d3.scale.linear().range([height,0]);

var svg = d3.select("body").append("svg").attr("width",width+margin.right+margin.left).attr("height",height+margin.top+margin.bottom).append("g").attr("transform","translate("+margin.left+","+margin.top+")");//draw from (margin.left , margin.top)
svg.append("g").attr("class","x axis").attr("transform","translate(0,"+height+")").call(d3.svg.axis().scale(x).orient("bottom"));//horizontal axis
svg.append("g").attr("class","y axis").call(d3.svg.axis().scale(y).orient("left"));//vertical axis
var circle = svg.append("g").selectAll("circle").data(data).enter().append("circle").attr("transform",function(d){return "translate("+x(d[0])+","+y(d[1])+")";}).attr("r",3.5);//create circle

svg.append("g").attr("class","brush").call(d3.svg.brush().x(x).y(y).on("brushstart",brushstart).on("brush",brushmove).on("brushend",brushend));

function brushstart(){
	svg.classed("selecting",true);
}
function brushmove(){
	var e = d3.event.target.extent();
	circle.classed("selected",function(d){
		return e[0][0] <= d[0]&&d[0]<=e[1][0]&&e[0][1]<=d[1]&&d[1]<=e[1][1];
	});
}
function brushend(){
	svg.classed("selecting",!d3.event.target.empty());
}
