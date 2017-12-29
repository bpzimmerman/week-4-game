$(document).ready(function() {
    var lightArray = ["luke", "obi", "yoda"];
    var darkArray = ["maul", "vader", "sidious"];

    // function to display the light side characters
    function displayLight(){
      for(var i = 0; i < lightArray.length; i +=1){
        var lightChar = $("<img>");
        lightChar.attr("class", "select light");
        lightChar.attr("id", lightArray[i]);
        lightChar.attr("src", "assets/images/" + lightArray[i] + ".png");
        $("#charSel").append(lightChar);
      };
    };

    // function to display the dark side characters
    function displayDark(){
      for(var i = 0; i < darkArray.length; i +=1){
        var darkChar = $("<img>");
        darkChar.attr("class", "select dark");
        darkChar.attr("id", darkArray[i]);
        darkChar.attr("src", "assets/images/" + darkArray[i] + ".png");
        $("#charSel").append(darkChar);
      };
    };

    // add the initial headings and available characters
    var selHead = $("<h2>");
    selHead.text("Select your Character");
    $("#charSel").append(selHead);
    var lightHead = $("<h3>");
    lightHead.attr("id", "lightChar");
    lightHead.text("Light Side");
    $("#charSel").append(lightHead);
    displayLight();

    var darkHead = $("<h3>");
    darkHead.attr("id", "darkChar");
    darkHead.text("Dark Side");
    $("#charSel").append(darkHead);
    displayDark();

    $(".select").on("click", function() {
        // add the fighting location
        var fightHead = $("<h3>");
        fightHead.attr("id", "fighting");
        fightHead.text("Fighting...");
        $("#fight").append(fightHead);

        // add the selected character to the fighting location
        var charSel = $("<img>");
        charSel.attr("id", "character");
        // charSel.attr("class", $(this).attr("class"));
        charSel.attr("src", "assets/images/" + $(this).attr("id") + ".png");
        $("#fight").append(charSel);

        // empty the character selection location and display the available opponents
        $("#charSel").empty();

        selHead = $("<h2>");
        selHead.text("Select your Opponent");
        $("#charSel").append(selHead);

        var charClass = charSel.attr("class");
        if (charClass === "select dark"){
            displayLight();
        }
        else {
            displayDark();
        };

        // add the separator between the fighters
        var vs = $("<span>");
        vs.text(" vs. ");
        $("#fight").append(vs);

        // select the opponent
        $(".select").on("click", function() {
            var oppoSel = $("<img>");
            oppoSel.attr("id", "opponent");
            // oppoSel.attr("class", $(this).attr("class"));
            oppoSel.attr("src", "assets/images/" + $(this).attr("id") + ".png");
            // oppoSel.text($(this).attr("id"));
            $("#fight").append(oppoSel);
            $("#"+$(this).attr("id")).remove();
        });

        // add the attack button
        var attackButton = $("<button>");
        attackButton.attr("id", "attack");
        attackButton.text("Attack");
        $("#ctrlButton").append(attackButton);

        // attack button function
        $("#attack").on("click", function() {
            var numberFighters;
            $("#fight").each(function(){
            numberFighters = $(".select", this).length;
            });
            if (numberFighters === 1){
                alert("You don't have an opponent! Click an opponent to continue.")
            }
            else {
                alert("You won!");
                $("#opponent").remove();
                selHead.text("Select your next Opponent");
                $("#charSel").prepend(selHead);
                var numberOpponents;
                $("#charSel").each(function() {
                    numberOpponents = $(".select", this).length;
                });
                if (numberOpponents === 0){
                    $("#ctrlButton").empty();
                    var resetButton = $("<button>");
                    resetButton.attr("id", "reset");
                    resetButton.text("Reset");
                    $("#ctrlButton").append(resetButton);
                    $("#reset").on("click", function() {
                    location.reload(true);
                    });
                    selHead.text("Game Over... Click Reset to play again.")
                    $("#charSel").prepend(selHead);
                };
            };
        });
    });

});
