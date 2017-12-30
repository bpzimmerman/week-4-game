$(document).ready(function(){
    var lightArray = ["luke", "obi", "yoda"];
    var lightHealth = [125, 155, 200];
    var darkArray = ["maul", "vader", "sidious"];
    var darkHealth = [130, 170, 190];

    // function to display the light side characters
    function displayLight(){
        for(var i = 0; i < lightArray.length; i +=1){
            var lightDiv = $("<div>");
            lightDiv.text("HP: " + lightHealth[i]);
            lightDiv.attr("id", lightArray[i]);
            lightDiv.attr("class", "col-md-4 select light");
            lightDiv.attr("hp", lightHealth[i]);
            $("#charSel").append(lightDiv);
            var lightChar = $("<img>");
            lightChar.attr("src", "assets/images/" + lightArray[i] + ".png");
            $("#" + lightArray[i]).append(lightChar);
        };
    };

    // function to display the dark side characters
    function displayDark(){
        for(var i = 0; i < darkArray.length; i +=1){
            var darkDiv = $("<div>");
            darkDiv.text("HP: " + darkHealth[i]);
            darkDiv.attr("id", darkArray[i]);
            darkDiv.attr("class", "col-md-4 select dark")
            darkDiv.attr("hp", darkHealth[i]);
            $("#charSel").append(darkDiv);
            var darkChar = $("<img>");
            darkChar.attr("src", "assets/images/" + darkArray[i] + ".png");
            $("#" + darkArray[i]).append(darkChar);
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
        var charDiv = $("<div>");
        charDiv.attr("id", "charDiv")
        charDiv.attr("class", "col-md-4 fighter");
        charDiv.attr("hp", $(this).attr("hp"));
        charDiv.text("HP: " + $(this).attr("hp"));
        $("#fight").append(charDiv);
        var charSel = $("<img>");
        charSel.attr("id", "character");
        charSel.attr("src", "assets/images/" + $(this).attr("id") + ".png");
        $("#charDiv").append(charSel);

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
            var numberFighters;
            $("#fight").each(function(){
                numberFighters = $(".fighter", this).length;
            });
            if (numberFighters === 2){
                alert("You already have an opponent! Click attack to continue.")
            }
            else {
                var oppoDiv = $("<div>");
                oppoDiv.attr("id", "oppoDiv")
                oppoDiv.attr("class", "col-md-4 fighter");
                oppoDiv.attr("hp", $(this).attr("hp"));
                oppoDiv.text("HP: " + $(this).attr("hp"));
                $("#fight").append(oppoDiv);    
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
            var numberFighters;
            $("#fight").each(function(){
                numberFighters = $(".fighter", this).length;
            });
            if (numberFighters === 1){
                alert("You don't have an opponent! Click an opponent to continue.")
            }
            else {
                alert("You won!");
                $("#oppoDiv").remove();
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
