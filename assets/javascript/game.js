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
	currentAttack: 0,
	currentHp: 0,
	currentOpponentH: 0,
	notAvailableOponnent: [],

	playSequence: function(){
		game.createPlayers();
			$(".player").on("click", function (event) {
				var charInd = $(this).attr("id");
				game.selectPlayer(charInd);
				$(".enemy").on("click", function (event) {
					var charInd2 = $(this).attr("id");
					game.selectEnemy(charInd, charInd2);
					$("#attackbutton").on("click", function(event){
						game.attackSequence();
					});
				});				
			});
	},
	createPlayers: function(){
		for (a=0; a<game.playerAvailable.length; a++){
		$("#yourcharsel").append("<a class='btn btn-success btn-md player' id='" +game.playerAvailable[a].iD+ "'><p id='name'>" + game.playerAvailable[a].name +"</p><img id='pic' src='"+ game.playerAvailable[a].pic +"'><p id='healthPoints'>" + game.playerAvailable[a].hP +"</p></a>");
		}
	},
	selectPlayer:function(charInd){
		console.log(charInd);
		game.createEnemiesAvailable(charInd);
		game.afterSel();
	},
	selectEnemy:function(charInd, charInd2){
		game.createEnemy(charInd, charInd2);
		game.createBattle();
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
				console.log(game.yourEnemy);
			} else if(charInd!==charInd2){
				$("#enemies").append("<a class='btn btn-danger btn-md enemy' id='"+game.enemiesAvailable[d].iD+"'><p id='name'>" + game.enemiesAvailable[d].name +"</p><img id='pic' src='"+ game.enemiesAvailable[d].pic +"'><p id='healthPoints'>" + game.enemiesAvailable[d].hP +"</p></a>");	
				console.log("Enemy available to battle: " + game.enemiesAvailable[d].iD);
			}
		}	
	},

	createBattle: function(){
		game.currentBattle[0]=game.yourPlayer[0];
		console.log(game.currentBattle[1]);
		game.currentBattle[1]=game.yourEnemy[0];
		console.log(game.currentBattle[0].name+" Vs "+ game.currentBattle[1].name);
		game.currentAttack=0;
		game.currentHp=game.currentBattle[0].hP;
		game.currentOpponentH= game.currentBattle[1].hP;
		$("#yourcharsel").html("<a class='btn btn-success btn-md player' id='" +game.currentBattle[0].iD+ "'><p id='name'>" + game.currentBattle[0].name +"</p><img id='pic' src='"+ game.currentBattle[0].pic +"'><p id='healthPoints'>" + game.currentBattle[0].hP +"</p></a>");	
		$("#enemy").html("<a class='btn btn-success btn-md defender' id='" +game.currentBattle[1].iD+ "'><p id='namee'>" + game.currentBattle[1].name +"</p><img id='pic' src='"+ game.currentBattle[1].pic +"'><p id='healthPointse'>" + game.currentBattle[1].hP +"</p></a>");
	},

	attackSequence: function(){
		game.currentAttack=game.currentAttack+game.currentBattle[0].aP;
		console.log("Attack by: "+game.currentAttack);
		game.currentHp=game.currentHp-game.currentBattle[1].cP;
		console.log("Current health: "+ game.currentHp);
		game.currentOpponentH=game.currentOpponentH - game.currentAttack;
		console.log("Opponent health: "+ game.currentOpponentH);
		if(game.currentHp<=0){
			$("#messages").html("<p> You have been defeated... GAME OVER!!!</p>");
			$("#messages").append("<a class='btn btn-info btn-md' id='restart'>Restart</a>");
			$("#restart").on("click",function(event){
				game.restart();
			});
		} else if (game.currentOpponentH<=0) {
				$("#messages").html("<p> You have defeated "+game.currentBattle[1].name+ ", you can choose to fight another enemy.</p>");
				$("#enemy").html(" ");
				game.notAvailableOponnent.push(game.currentBattle[1]);
				game.nextBattle();
			} else{
				$("#messages").html("<p>You attacked "+ game.currentBattle[1].name +" for "+ game.currentAttack +" damage.</p>"+"<p>"+game.currentBattle[1].name + " attacked you back for " + game.currentBattle[1].cP+".</p>");
				$("#enemy").html("<a class='btn btn-success btn-md defender' id='" +game.currentBattle[1].iD+ "'><p id='namee'>" + game.currentBattle[1].name +"</p><img id='pic' src='"+ game.currentBattle[1].pic +"'><p id='healthPointse'>" + game.currentOpponentH +"</p></a>");
			}
		$("#yourcharsel").html("<a class='btn btn-success btn-md player' id='" +game.currentBattle[0].iD+ "'><p id='name'>" + game.currentBattle[0].name +"</p><img id='pic' src='"+ game.currentBattle[0].pic +"'><p id='healthPoints'>" + game.currentHp +"</p></a>");	
	},
	nextBattle: function(){
		console.log("Ready for next battle?");
		$(".enemy").on('click', function(event){
			console.log("Ready for second battle")
			var charInd3=$(this).attr("id");
			game.selectEnemy(game.currentBattle[0].iD, charInd3);
			$("#attackbutton").on("click", function(event){
				game.attackSequence();
			});
		});
	},
	restart: function(){
		$("#yourcharsel").html("");
		$("#enemy").html("");
		$("#enemies").html("");
		$("#messages").html("");
		game.yourPlayer=[];
		game.enemiesAvailable=[];
		game.yourEnemy=[];
		game.currentBattle=[];
		game.currentAttack=0;
		game.currentHp=0;
		game.currentOpponentH=0;
		game.playSequence();
	}
}

$(document).ready(function(){
	game.playSequence();	
});