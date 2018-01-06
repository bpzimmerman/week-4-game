$(document).ready(function(){
    var lightArray = ["luke", "obi", "yoda"];
    var lightHealth = [125, 155, 200];
    var darkArray = ["maul", "vader", "sidious"];
    var darkHealth = [130, 170, 190];
    var ap = 0;
    var ca;
    var apInc;
    var charHP;
    var oppoHP;

    // function to display the light side characters
    function displayLight(){
        for(var i = 0; i < lightArray.length; i +=1){
            // create the div to house the image and health
            var lightDiv = $("<div>");
            lightDiv.attr("id", lightArray[i]);
            lightDiv.attr("class", "col-md-4 select light");
            lightDiv.attr("hp", lightHealth[i]);
            $("#lightRow").append(lightDiv);
            // append the HP for each character
            var lightHP = $("<p>");
            lightHP.text("HP: " + lightHealth[i]);
            $("#" +lightArray[i]).append(lightHP);
            // append the character image
            var lightChar = $("<img>");
            lightChar.attr("src", "assets/images/" + lightArray[i] + ".png");
            $("#" + lightArray[i]).append(lightChar);
        };
    };

    // function to display the dark side characters
    function displayDark(){
        for(var i = 0; i < darkArray.length; i +=1){
            // create the div to house the image and health
            var darkDiv = $("<div>");
            darkDiv.attr("id", darkArray[i]);
            darkDiv.attr("class", "col-md-4 select dark")
            darkDiv.attr("hp", darkHealth[i]);
            $("#darkRow").append(darkDiv);
            // append the HP for each character
            var darkHP = $("<p>");
            darkHP.text("HP: " + darkHealth[i]);
            $("#" + darkArray[i]).append(darkHP);
            // append the character image
            var darkChar = $("<img>");
            darkChar.attr("src", "assets/images/" + darkArray[i] + ".png");
            $("#" + darkArray[i]).append(darkChar);
        };
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
            location.reload(true);
        });
        // change header to Game over and remove vs div
        selHead.text("Game over... Click Reset to play again.")
        $("#versus").remove();
        // play music depending on who won
        if ($("#fight div").hasClass("dark")){
            var audioElement = document.createElement('audio');
            audioElement.setAttribute("src", "https://archive.org/download/StarWarsTheImperialMarchDarthVadersTheme/Star Wars- The Imperial March (Darth Vader's Theme).mp3");
            audioElement.play();
        }
        else {
            var audioElement = document.createElement('audio');
            audioElement.setAttribute("src", "https://archive.org/download/StarWarsJohnWilliamsTheThroneRoomEndTitle/Star Wars - John Williams - The Throne Room End Title.mp3");
            audioElement.play();
        };
    };


    // add the initial headings and available characters
    var selHead = $("<h2>");
    selHead.text("Select your Character");
    $("#charSel").append(selHead);

    var lightHead = $("<h3>");
    lightHead.attr("id", "lightChar");
    lightHead.text("Light Side");
    $("#lightRow").append(lightHead);
    displayLight();

    var darkHead = $("<h3>");
    darkHead.attr("id", "darkChar");
    darkHead.text("Dark Side");
    $("#darkRow").append(darkHead);
    displayDark();

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
        // create the div to house the chosen character
        var charDiv = $("<div>");
        charDiv.attr("id", "charDiv")
        charDiv.attr("class", $(this).attr("class") + " fighter");
        charDiv.removeClass("select");
        charDiv.attr("hp", charHP);
        $("#fight").append(charDiv);
        // append the character health
        var charHealth = $("<p>");
        charHealth.text("HP: " + charHP);
        $("#charDiv").append(charHealth);
        // append the character image
        var charSel = $("<img>");
        charSel.attr("id", "character");
        charSel.attr("src", "assets/images/" + $(this).attr("id") + ".png");
        $("#charDiv").append(charSel);

        // empty the character selection location
        $("#charSel").empty();
        $("#lightRow").empty();
        $("#darkRow").empty();

        selHead = $("<h2>");
        selHead.text("Select your opponent");
        $("#charSel").append(selHead);

        // add available opponents w/ counterattack attribute
        if (charDiv.hasClass("dark")){
            displayLight();
            for (var i = 0; i < lightArray.length; i += 1){
                $("#" + lightArray[i]).attr("ca", i + 1);
            };
        }
        else {
            displayDark();
            for (var i = 0; i < darkArray.length; i += 1){
                $("#" + darkArray[i]).attr("ca", i + 1);
            };
        };

        // add the separator between the fighters
        var vs = $("<div>");
        vs.text("vs.");
        vs.attr("id", "versus");
        vs.attr("class", "col-md-2");
        $("#fight").append(vs);

        // select the opponent
        $(".select").on("click", function() {
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
                // create the div to house the chosen opponent
                var oppoDiv = $("<div>");
                oppoDiv.attr("id", "oppoDiv")
                oppoDiv.attr("class", $(this).attr("class") + " fighter");
                oppoDiv.removeClass("select");
                oppoDiv.attr("hp", oppoHP);
                oppoDiv.attr("ca", $(this).attr("ca"));
                $("#fight").append(oppoDiv);
                // append the opponent health
                var oppoHealth = $("<p>");
                oppoHealth.text("HP: " + oppoHP);
                $("#oppoDiv").append(oppoHealth);
                // append the opponent image to the fighting location and remove the opponent div from the selecting location
                var oppoSel = $("<img>");
                oppoSel.attr("id", "opponent");
                oppoSel.attr("src", "assets/images/" + $(this).attr("id") + ".png");
                $("#oppoDiv").append(oppoSel);
                $("#"+$(this).attr("id")).remove();
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
                    selHead.text("Select your next Opponent");
                    $("#charSel").prepend(selHead);
                    // check to see if you have defeated all the opponents
                    var numberOpponents = $(".select").length;
                    if (numberOpponents === 0){
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
                        gameover();
                    };
                };
            };
        });
    });

});
