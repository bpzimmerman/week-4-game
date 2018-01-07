$(document).ready(function(){
    var lightChar = {luke: 125, obi: 155, yoda: 200};
    var darkChar = {maul: 130, vader: 170, sidious: 190};
    var ca;
    var apInc;
    var charHP;
    var oppoHP;
    var charDiv;
    var audioElement = document.createElement("audio");
    var empireWin = 0;
    var jediWin = 0;

    // function to display the characters
    function displayChar(characters, side){
        // characters = lightChar or darkChar
        // side = "light" or "dark"
        for (var key in characters){
            // create the div to house the image and health
            var div = $("<div>");
            div.attr("id", key)
            div.attr("class", "col-md-4 select " + side);
            div.attr("hp", characters[key]);
            $("#" + side + "Row").append(div);
            // append the HP for each character
            var HP = $("<p>");
            HP.text("HP: " + characters[key]);
            $("#" + key).append(HP);
            // append the character image
            var img = $("<img>");
            img.attr("src", "assets/images/" + key + ".png");
            $("#" + key).append(img);
        };

    };

    // character selection function
    function fighterSel(div, health, that){
        // creates, assigns attributes, and appends the div to house the character
        charDiv = $("<div>");
        charDiv.attr("id", div)
        charDiv.attr("class", $(that).attr("class") + " fighter");
        charDiv.removeClass("select");
        charDiv.attr("hp", health);
        if (div === "oppoDiv"){
            charDiv.attr("ca", $(that).attr("ca"));
        };
        $("#fight").append(charDiv);
        // append the character health to the div created above
        var charHealth = $("<p>");
        charHealth.text("HP: " + health);
        $("#" + div).append(charHealth);
        // append the character image to the div created above
        var charSel = $("<img>");
        charSel.attr("src", "assets/images/" + $(that).attr("id") + ".png");
        $("#" + div).append(charSel);
    };

    // game over function
    function gameover(){
        // replace the attack button with the reset button
        $("#ctrlButton").empty();
        var resetButton = $("<button>");
        resetButton.attr("id", "reset");
        resetButton.text("Reset");
        $("#ctrlButton").append(resetButton);
        // reset function
        $("#reset").on("click", function() {
            reset();
        });
        // change header and remove "vs." div and results
        $("#fighting").text("Game over... Click Reset to play again.");
        $("#versus").remove();
        // play music and display victory message depending on who won
        if ($("#fight div").hasClass("dark")){
            empireWin += 1;
            audioElement.setAttribute("src", "https://archive.org/download/StarWarsTheImperialMarchDarthVadersTheme/Star Wars- The Imperial March (Darth Vader's Theme).mp3");
            audioElement.play();
            $("#results p:first").text("The empire has destroyed the jedi and is now free to rule the galaxy with an iron fist!");
            $("#results p:last").text("Empire Victories: " + empireWin + " ----- Jedi Victories: " + jediWin);
        }
        else {
            jediWin += 1;
            audioElement.setAttribute("src", "https://archive.org/download/StarWarsJohnWilliamsTheThroneRoomEndTitle/Star Wars - John Williams - The Throne Room End Title.mp3");
            audioElement.play();
            $("#results p:first").text("The jedi have overcome the Dark Side and are now free to usher in a new age of freedom and justice!");
            $("#results p:last").text("Jedi Victories: " + jediWin + " ----- Empire Victories: " + empireWin);
        };
    };

    function reset(){
        $("#charSel").empty();
        $("#lightRow").empty();
        $("#darkRow").empty();
        $("#fight").empty();
        $("#results p").empty();
        $("#ctrlButton").empty();
        audioElement.pause();
        game();
    };

    // game function
    function game(){
        var ap = 0;
        // add the initial headings and available characters
        var selHead = $("<h2>");
        selHead.text("Select your Character");
        $("#charSel").append(selHead);

        var lightHead = $("<h3>");
        lightHead.attr("id", "lightChar");
        lightHead.text("Light Side");
        $("#lightRow").append(lightHead);
        displayChar(lightChar, "light");

        var darkHead = $("<h3>");
        darkHead.attr("id", "darkChar");
        darkHead.text("Dark Side");
        $("#darkRow").append(darkHead);
        displayChar(darkChar, "dark");

        $(".select").on("click", function() {
            // add the fighting location
            var fightHead = $("<h3>");
            fightHead.attr("id", "fighting");
            fightHead.text("Fighting...");
            $("#fight").append(fightHead);

            // select the profile to be used
            var profileIndex = "p" + Math.floor(Math.random() * 1029);
            var profile = window[$(this).attr("id")];

            // assign the chosen character's attack power increment and health to variables - note that I wanted to create an equation that would solve for AP given the static HPs and random values for the counter-attack power, but I could not solve the equation for AP
            apInc = profile[profileIndex][0];
            charHP = parseInt($(this).attr("hp"));

            // add the selected character to the fighting location
            fighterSel("charDiv", charHP, this);

            // empty the character selection location
            $("#lightRow").empty();
            $("#darkRow").empty();

            $("#charSel h2").text("Select your opponent");

            // add available opponents w/ counterattack attribute to the selection location
            if (charDiv.hasClass("dark")){
                displayChar(lightChar, "light");
                var i = 0;
                for (var key in lightChar){
                    $("#" + key).attr("ca", i += 1);
                };
            }
            else {
                displayChar(darkChar, "dark");
                var i = 0;
                for (var key in darkChar){
                    $("#" + key).attr("ca", i += 1);
                };
            };

            // add the "vs." separator between the fighters
            var vs = $("<div>");
            vs.text("vs.");
            vs.attr("id", "versus");
            vs.attr("class", "col-md-2");
            $("#fight").append(vs);

            // select the opponent
            $(".select").on("click", function(){
                // stop selection of more than one opponent
                var numberFighters;
                $("#fight").each(function(){
                    numberFighters = $(".fighter", this).length;
                });
                if (numberFighters === 2){
                    alert("You already have an opponent! Click attack to continue.")
                }
                else {
                    // assign the opponents counterattack value and health to variables
                    ca = profile[profileIndex][parseInt($(this).attr("ca"))];
                    oppoHP = parseInt($(this).attr("hp"));
                    // add the selected opponent to the fighting location
                    fighterSel("oppoDiv", oppoHP, this);
                    // remove the selected opponent from the selection location
                    $("#"+$(this).attr("id")).remove();
                    $("#charSel h2").text("Click Attack to fight your opponent");
                };
            });

            // add the attack button
            var attackButton = $("<button>");
            attackButton.attr("id", "attack");
            attackButton.text("Attack");
            $("#ctrlButton").append(attackButton);

            // attack button function
            $("#attack").on("click", function() {
                // verify that both fighters have been selected
                var numberFighters;
                $("#fight").each(function(){
                    numberFighters = $(".fighter", this).length;
                });
                if (numberFighters === 1){
                    alert("You don't have an opponent! Click an opponent to continue.")
                }
                else {
                    // increment the attack power and remove the new attack power from the opponents health
                    ap += apInc;
                    oppoHP -= ap;
                    // add the results of the attack
                    $("#oppoDiv p").text("HP: " + oppoHP);
                    $("#results p:first").text("You attacked for: " + ap + " health.");
                    // check to see if the opponent's health has been reduced to <= 0
                    if (oppoHP <= 0){
                        alert("You Won!");
                        $("#oppoDiv").remove();
                        $("#charSel h2").text("Select your next opponent");
                        var numberOpponents = $(".select").length;
                        if (numberOpponents === 0){
                            $("#charSel h2").text("Victory!");
                            gameover();
                        };
                    }
                    else {
                        // remove the counterattack power from the character's health
                        charHP -= ca;
                        // add the results of the counterattack
                        $("#charDiv p").text("HP: " + charHP);
                        $("#results p:last").text("You were hit for: " + ca + " health.");
                        // check to see if the character's health has been reduced to <= 0
                        if (charHP <= 0){
                            alert ("You Lost!");
                            $("#charDiv").remove();
                            $("#charSel h2").text("Defeat!");
                            gameover();
                        };
                    };
                };
            });
        });
    };

    // run the game
    game();
});