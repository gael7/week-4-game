$(document).ready(function(){
	$("#obiwan").on("click", function () {
		$("#yourchar").html("<h3 class='panel-title'>Your Character</h3>");
		$("#yourcharsel").html("<a class='btn btn-success btn-md player'><div id='obiwan'></div></a>")
		$("#enemies").html("<a class='btn btn-danger btn-md player'><div id='luke'></div></a>");
		$("#enemies").append("<a class='btn btn-danger btn-md player'><div id='sidious'></div></a>");
		$("#enemies").append("<a class='btn btn-danger btn-md player'><div id='maul'></div></a>");
		console.log("Obi-Wan click append");
	});
	$("#luke").on("click", function () {
		$("#yourchar").html("<h3 class='panel-title'>Your Character</h3>");
		$("#yourcharsel").html("<a class='btn btn-success btn-md player'><div id='luke'></div></a>")
		$("#enemies").html("<a class='btn btn-danger btn-md player'><div id='obiwan'></div></a>");
		$("#enemies").append("<a class='btn btn-danger btn-md player'><div id='sidious'></div></a>");
		$("#enemies").append("<a class='btn btn-danger btn-md player'><div id='maul'></div></a>");
		console.log("Luke click");
	});
	$("#sidious").on("click", function () {
		$("#yourchar").html("<h3 class='panel-title'>Your Character</h3>");
		$("#yourcharsel").html("<a class='btn btn-success btn-md player'><div id='sidious'></div></a>")
		$("#enemies").html("<a class='btn btn-danger btn-md player'><div id='obiwan'></div></a>");
		$("#enemies").append("<a class='btn btn-danger btn-md player'><div id='luke'></div></a>");
		$("#enemies").append("<a class='btn btn-danger btn-md player'><div id='maul'></div></a>");
		console.log("Sidious click");
	});
	$("#maul").on("click", function () {
		$("#yourchar").html("<h3 class='panel-title'>Your Character</h3>");
		$("#yourcharsel").html("<a class='btn btn-success btn-md player'><div id='maul'></div></a>")
		$("#enemies").html("<a class='btn btn-danger btn-md player'><div id='obiwan'></div></a>");
		$("#enemies").append("<a class='btn btn-danger btn-md player'><div id='luke'></div></a>");
		$("#enemies").append("<a class='btn btn-danger btn-md player'><div id='sidious'></div></a>");
		console.log("Maul click");
	});
});