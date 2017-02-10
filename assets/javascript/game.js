var game = {
    //Array for all the available players on the game, with their name, picture, health points
    //attack points, counterattack points and id.
    playerAvailable: [
        {
            name: "Obi-Wan Kenobi",
            pic: "assets/images/obiwan.jpg",
            hP: "120",
            aP: 8,
            cP: 15,
            iD: "obiwan"
        }, {
            name: "Luke Skywalker",
            pic: "assets/images/luke.png",
            hP: "100",
            aP: 10,
            cP: 20,
            iD: "luke"
        }, {
            name: "Darth Sidious",
            pic: "assets/images/sidious.png",
            hP: "150",
            aP: 6,
            cP: 25,
            iD: "sidious"
        }, {
            name: "Darth Maul",
            pic: "assets/images/maul.jpg",
            hP: "180",
            aP: 9,
            cP: 20,
            iD: "maul"
        }
    ],
    //Array for the player you selected.
    yourPlayer: [],
    //Array for the enemies available to battle.
    enemiesAvailable: [],
    //Array for the enemy you selected to battle.
    yourEnemy: [],
    //Array for your player and enemy.
    currentBattle: [],
    //Value of your current attack that would increase each time you attack.
    currentAttack: 0,
    //Value of your current health.
    currentHp: 0,
    //Value of the current health from your enemy.
    currentOpponentH: 0,

    //Function for the play sequence
    playSequence: function() {
        game.createPlayers();
        $(".player").on("click", function(event) {
            var charInd = $(this).attr("id");
            game.selectPlayer(charInd);
            $(".enemy").on("click", function(event) {
                var charInd2 = $(this).attr("id");
                game.selectEnemy(charInd, charInd2);
            });
        });
    },

    //Function that will display the players available.
    createPlayers: function() {
        for (a = 0; a < game.playerAvailable.length; a++) {
            $("#yourcharsel").append("<a class='btn btn-success btn-md player' id='" + game.playerAvailable[a].iD + "'><p id='name'>" + game.playerAvailable[a].name + "</p><img id='pic' src='" + game.playerAvailable[a].pic + "'><p id='healthPoints'>" + game.playerAvailable[a].hP + "</p></a>");
        }
    },

    //Function that will separate your selected character from the other ones.
    selectPlayer: function(charInd) {
        game.createEnemiesAvailable(charInd);
        game.afterSel();
    },

    //Function that will separate your character and the enemy you chose.
    selectEnemy: function(charInd, charInd2) {
        game.createEnemy(charInd, charInd2);
        game.createBattle();
    },

    //Function to display the players available as your enemies after the selection of your character.
    createEnemiesAvailable: function(charInd) {
        for (c = 0; c < game.playerAvailable.length; c++) {
            if (charInd === game.playerAvailable[c].iD) {
                $("#yourcharsel").html("<a class='btn btn-success btn-md player' id='" + game.playerAvailable[c].iD + "'><p id='name'>" + game.playerAvailable[c].name + "</p><img id='pic' src='" + game.playerAvailable[c].pic + "'><p id='healthPoints'>" + game.playerAvailable[c].hP + "</p></a>");
                game.yourPlayer.push(game.playerAvailable[c]);
            } else {
                $("#enemies").append("<a class='btn btn-danger btn-md enemy' id='" + game.playerAvailable[c].iD + "'><p id='name'>" + game.playerAvailable[c].name + "</p><img id='pic' src='" + game.playerAvailable[c].pic + "'><p id='healthPoints'>" + game.playerAvailable[c].hP + "</p></a>");
                game.enemiesAvailable.push(game.playerAvailable[c]);
            }
        }
    },

    //Fuction that changes the heading of the first panel to Your Character after selection.
    afterSel: function() {
        $("#yourchar").html("<h3 class='panel-title'>Your Character</h3>");
    },

    createEnemy: function(charInd, charInd2) {
        $("#enemies").html("");
        for (d = 0; d < game.enemiesAvailable.length; d++) {
            if (charInd2 === game.enemiesAvailable[d].iD) {
                $("#enemy").html("<a class='btn btn-success btn-md defender' id='" + game.enemiesAvailable[d].iD + "'><p id='namee'>" + game.enemiesAvailable[d].name + "</p><img id='pic' src='" + game.enemiesAvailable[d].pic + "'><p id='healthPointse'>" + game.enemiesAvailable[d].hP + "</p></a>");
                game.yourEnemy.push(game.enemiesAvailable[d]);
            } else if (charInd !== charInd2) {
                $("#enemies").append("<a class='btn btn-danger btn-md enemy' id='" + game.enemiesAvailable[d].iD + "'><p id='name'>" + game.enemiesAvailable[d].name + "</p><img id='pic' src='" + game.enemiesAvailable[d].pic + "'><p id='healthPoints'>" + game.enemiesAvailable[d].hP + "</p></a>");
            }
        }
    },

    //Function to setup the battle.
    createBattle: function() {
        game.currentBattle[0] = game.yourPlayer[0];
        game.currentBattle[1] = game.yourEnemy[0];
        if (game.currentHp === 0) {
            $("#yourcharsel").html("<a class='btn btn-success btn-md player' id='" + game.currentBattle[0].iD + "'><p id='name'>" + game.currentBattle[0].name + "</p><img id='pic' src='" + game.currentBattle[0].pic + "'><p id='healthPoints'>" + game.currentBattle[0].hP + "</p></a>");
            game.currentHp = game.currentBattle[0].hP;
            $("#yourcharsel").html(" ");
        }
        game.currentOpponentH = game.currentBattle[1].hP;
        $("#yourcharsel").html("<a class='btn btn-success btn-md player' id='" + game.currentBattle[0].iD + "'><p id='name'>" + game.currentBattle[0].name + "</p><img id='pic' src='" + game.currentBattle[0].pic + "'><p id='healthPoints'>" + game.currentHp + "</p></a>");
        $("#enemy").html("<a class='btn btn-success btn-md defender' id='" + game.currentBattle[1].iD + "'><p id='namee'>" + game.currentBattle[1].name + "</p><img id='pic' src='" + game.currentBattle[1].pic + "'><p id='healthPointse'>" + game.currentBattle[1].hP + "</p></a>");
        $("#messages").html("");
        $("#attackbutton").removeClass("disabled");
        for (i = 0; i < game.enemiesAvailable.length; i++) {
            if (game.currentBattle[1].iD === game.enemiesAvailable[i].iD) {
                game.enemiesAvailable.splice(i, 1);
            }
        }
    },

    //Function to manage the attack sequence.
    attackSequence: function() {
        game.currentAttack = game.currentAttack + game.currentBattle[0].aP;
				game.currentOpponentH = game.currentOpponentH - game.currentAttack;
        game.currentHp = game.currentHp - game.currentBattle[1].cP;
        if (game.currentOpponentH <= 0 && game.currentHp > 0) {
            if (game.enemiesAvailable.length === 0) {
                $("#messages").html("<p> You have defeated " + game.currentBattle[1].name + ", You Won the Game!</p>");
                $("#enemy").html(" ");
                $("#attackbutton").addClass("disabled");
                $("#messages").append("<a class='btn btn-info btn-md' id='restart'>Restart</a>");
                $("#restart").on("click", function() {
                    game.restart();
                });
            } else {
                $("#messages").html("<p> You have defeated " + game.currentBattle[1].name + ", you can choose to fight another enemy.</p>");
                $("#attackbutton").addClass("disabled");
                $("#enemy").html(" ");
                game.nextBattle();
            }
        } else if (game.currentHp <= 0) {
            $("#messages").html("<p> You have been defeated... GAME OVER!!!</p>");
						$("#attackbutton").addClass("disabled");
            $("#messages").append("<a class='btn btn-info btn-md' id='restart'>Restart</a>");
            $("#restart").on("click", function() {
                game.restart();
            });
        }  else {
            $("#messages").html("<p>You attacked " + game.currentBattle[1].name + " for " + game.currentAttack + " damage.</p>" + "<p>" + game.currentBattle[1].name + " attacked you back for " + game.currentBattle[1].cP + ".</p>");
            $("#enemy").html("<a class='btn btn-success btn-md defender' id='" + game.currentBattle[1].iD + "'><p id='namee'>" + game.currentBattle[1].name + "</p><img id='pic' src='" + game.currentBattle[1].pic + "'><p id='healthPointse'>" + game.currentOpponentH + "</p></a>");
        }
        $("#yourcharsel").html("<a class='btn btn-success btn-md player' id='" + game.currentBattle[0].iD + "'><p id='name'>" + game.currentBattle[0].name + "</p><img id='pic' src='" + game.currentBattle[0].pic + "'><p id='healthPoints'>" + game.currentHp + "</p></a>");
    },

    //Function to arrange next battle.
    nextBattle: function() {
        $(".enemy").on('click', function() {
            var charInd3 = $(this).attr("id");
            game.yourEnemy = [];
            game.selectEnemy(game.currentBattle[0].iD, charInd3);
        });
    },

    //Function that handles to restart the game.
    restart: function() {
        $("#yourcharsel").html("");
        $("#enemy").html("");
        $("#enemies").html("");
        $("#messages").html("");
        game.yourPlayer = [];
        game.enemiesAvailable = [];
        game.yourEnemy = [];
        game.currentBattle = [];
        game.currentAttack = 0;
        game.currentHp = 0;
        game.currentOpponentH = 0;
        game.playSequence();
    }
};

$(document).ready(function() {
    game.playSequence();
});

$("#attackbutton").on("click", function() {
    game.attackSequence();
});
