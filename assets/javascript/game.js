var game = {
	playerAvailable: [
	{
		name: "Obi-Wan Kenobi",
		pic: "assets/images/obiwan.jpg",
		hP: "120",
		aP: 8,
		cP: 15,
		iD: "obiwan",
	},
	{
		name: "Luke Skywalker",
		pic: "assets/images/luke.png",
		hP: "100",
		aP: 10,
		cP: 20,
		iD: "luke",
	},
	{
		name: "Darth Sidious",
		pic: "assets/images/sidious.png",
		hP: "150",
		aP: 6,
		cP: 25,
		iD: "sidious",
	},
	{
		name: "Darth Maul",
		pic: "assets/images/maul.jpg",
		hP: "180",
		aP: 9,
		cP: 20,
		iD: "maul",
	}
	],
	yourPlayer: [],
	enemiesAvailable:[],
	yourEnemy: [],
	currentBattle: [],
	currentAttack: [],
	createPlayers: function(){
		for (a=0; a<game.playerAvailable.length; a++){
		$("#yourcharsel").append("<a class='btn btn-success btn-md player' id='" +game.playerAvailable[a].iD+ "'><p id='name'>" + game.playerAvailable[a].name +"</p><img id='pic' src='"+ game.playerAvailable[a].pic +"'><p id='healthPoints'>" + game.playerAvailable[a].hP +"</p></a>");
		}
	},

	createEnemiesAvailable: function(charInd){
		for (c=0; c<game.playerAvailable.length; c++){
			if (charInd===game.playerAvailable[c].iD){
				$("#yourcharsel").html("<a class='btn btn-success btn-md player' id='" +game.playerAvailable[c].iD+ "'><p id='name'>" + game.playerAvailable[c].name +"</p><img id='pic' src='"+ game.playerAvailable[c].pic +"'><p id='healthPoints'>" + game.playerAvailable[c].hP +"</p></a>");	
				console.log("Character Selected:"+charInd);
				game.yourPlayer.push(game.playerAvailable[c]);
				console.log(game.yourPlayer);
				}else {
					$("#enemies").append("<a class='btn btn-danger btn-md enemy' id='"+game.playerAvailable[c].iD+"'><p id='name'>" + game.playerAvailable[c].name +"</p><img id='pic' src='"+ game.playerAvailable[c].pic +"'><p id='healthPoints'>" + game.playerAvailable[c].hP +"</p></a>");
					game.enemiesAvailable.push(game.playerAvailable[c]);
					console.log(game.enemiesAvailable);
				}
		}
	},

	afterSel: function(){
		$("#yourchar").html("<h3 class='panel-title'>Your Character</h3>");
	},

	createEnemy: function(charInd, charInd2){
		$("#enemies").html("");
		console.log("Player Selected: "+charInd);
		console.log("Enemy Selected: "+charInd2);
		for (d=0; d<game.enemiesAvailable.length; d++){
			if (charInd2===game.enemiesAvailable[d].iD){
				$("#enemy").html("<a class='btn btn-success btn-md defender' id='" +game.enemiesAvailable[d].iD+ "'><p id='namee'>" + game.enemiesAvailable[d].name +"</p><img id='pic' src='"+ game.enemiesAvailable[d].pic +"'><p id='healthPointse'>" + game.enemiesAvailable[d].hP +"</p></a>");
				game.yourEnemy.push(game.enemiesAvailable[d]);
			} else if(charInd!==charInd2){
				$("#enemies").append("<a class='btn btn-danger btn-md enemy' id='"+game.enemiesAvailable[d].iD+"'><p id='name'>" + game.enemiesAvailable[d].name +"</p><img id='pic' src='"+ game.enemiesAvailable[d].pic +"'><p id='healthPoints'>" + game.enemiesAvailable[d].hP +"</p></a>");
				
			}
		}
		game.currentBattle.push(game.yourPlayer[0]);
		game.currentBattle.push(game.yourEnemy[0]);
		console.log(game.currentBattle[0].name+" Vs "+game.currentBattle[1].name);
	},
	attackSequence: function(){		
		$("#messages").html("<p>You attacked "+ game.currentBattle[1].name +" for "+ game.currentBattle[0].aP+" damage.</p>"+"<p>"+game.currentBattle[1].name + " attacked you back for " + game.currentBattle[1].cP+".</p>");
	}
}

$(document).ready(function(){
	game.createPlayers();

	$(".player").on("click", function (event) {
		var charInd = $(this).attr("id");
		console.log(charInd);
		game.createEnemiesAvailable(charInd);
		game.afterSel();
			$(".enemy").on("click", function (event) {
				console.log("createenemy");
				var charInd2 = $(this).attr("id");
				console.log(charInd2);
				game.createEnemy(charInd, charInd2);
					$("#attackbutton").on("click", function(){
						console.log("attack button used");
						game.attackSequence();
				});
			});			
				
});

	

	
	
});