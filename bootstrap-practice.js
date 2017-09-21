// TILE CLASS

function Tile (
    name, numberOf,
    id, jID, div, doors
) {
    // TILE PROPERTIES
    this.name = name;
    this.numberOf = numberOf;
    this.id = id;
    this.jID = jID;
    this.div = div;
    this.doors = doors;
    // TILE METHODS
    this.createUniqueTile = function() {
        var newRoom = new Tile;
        newRoom.name = this.name;
        newRoom.numberOf = 0;
        newRoom.id = this.name + this.numberOf.toString();
        newRoom.jID = "#" + newRoom.id;
        newRoom.div = "<div id='" + newRoom.id + "' class='tile " + this.name + " " + this.doors + "'></div>";
        newRoom.doors = this.doors;
        this.numberOf -= 1;
        return newRoom;
    };
};

// TILES

var home = new Tile (
    "home", 1, null, null, null, "leftD topD rightD"
);

var fourWay = new Tile (
    "fourWay", 3, null, null, null, "leftD topD rightD bottomD"
);

var tLeft = new Tile (
    "tLeft", 3, null, null, null, "leftD topD bottomD"
);

var tUp = new Tile (
    "tUp", 3, null, null, null, "leftD rightD bottomD"
);

var tRight = new Tile (
    "tRight", 3, null, null, null, "topD rightD bottomD"
);

var tDown = new Tile (
    "tDown", 3, null, null, null, "leftD topD rightD"
);

var upDown = new Tile (
    "upDown", 3, null, null, null, "topD bottomD"
);

var leftRight = new Tile (
    "leftRight", 3, null, null, null, "leftD rightD"
);

var leftRightCave = new Tile (
    "leftRightCave", 3, null, null, null, "leftD rightD"
);

var tRightCamp = new Tile (
    "tRightCamp", 3, null, null, null, "topD rightD bottomD"
);

var leftEnd = new Tile (
    "leftEnd", 3, null, null, null, "rightD"
);

var rightEnd = new Tile (
    "rightEnd", 3, null, null, null, "leftD"
);

var topEnd = new Tile (
    "topEnd", 3, null, null, null, "bottomD"
);

var bottomEnd = new Tile (
    "bottomEnd", 3, null, null, null, "topD"
);

var tDownTower = new Tile (
    "tDownTower", 3, null, null, null, "leftD topD rightD"
);

var tLeftStoneTower = new Tile (
    "tLeftStoneTower", 3, null, null, null, "leftD topD bottomD"
);

var lake = new Tile (
    "lake", 3, null, null, null, "leftD topD rightD bottomD"
);

var forest = new Tile (
    "forest", 3, null, null, null, "leftD topD rightD bottomD"
);

var river = new Tile (
    "river", 3, null, null, null, "topD bottomD"
);

var ldCorner = new Tile (
    "ldCorner", 3, null, null, null, "leftD bottomD"
);

var rdCorner = new Tile (
    "rdCorner", 3, null, null, null, "rightD bottomD"
);

// ARRAY OF ALL TILES

var tileArray = new Array (
    home, fourWay, tLeft, tUp, tRight, tDown, upDown, leftRight, leftRightCave, tRightCamp,
    leftEnd, rightEnd, topEnd, bottomEnd, tDownTower, tLeftStoneTower, lake, forest, river,
    ldCorner, rdCorner
);

var newTileArray = createTileArray();

// TILE DIRECTIONS EMPTY?

var leftDEmpty = false;
var rightDEmpty = false;
var topDEmpty = false;
var bottomDEmpty = false;

// TILE/BOARD FUNCTIONS

function rollNewRoom(div, array) {
    var min = 0;
    var max = array.length;
    var newRoll;
    var newRoom;
    var tempID = "";
    newRoll = Math.floor(Math.random() * (max - min)) + min;
    newRoom = array[newRoll];
    return newRoom;
};

function removeTempTiles() {
    if (leftDEmpty === true) {
        $(".fromRight").remove();
    };
    if (rightDEmpty === true) {
        $(".fromLeft").remove();
    };
    if (topDEmpty === true) {
        $(".fromBottom").remove();
    };
    if (topDEmpty === true) {
        $(".fromTop").remove();
    };
};

function tempToTile(div, cell) {
    $("#player").popover("hide");
    var tilesWithDirection = new Array;
    var cellJID = "#" + cell;
    var newTile;
    if ($(div).hasClass("fromRight")) {
        newTileArray.forEach(function(tile) {
            var doors = tile.doors.split(" ");
            if (doors.includes("rightD")) {
                tilesWithDirection.push(tile);
            };
        });
        if (tilesWithDirection.length > 0) {
            newTile = rollNewRoom(div, tilesWithDirection);
            var i = newTileArray.indexOf(newTile);
            newTileArray.splice(i, 1);
            $(div).remove();
            $(cellJID).append(newTile.div);
            player.movePlayer(newTile);
            temporaryTilePlacement(newTile);
        } else {
            $(div).remove();
            $("#player").popover({
                'placement': 'bottom',
                'delay': {
                    show: 500,
                    hide: 800,
                },
                'content': 'No tiles in that direction available!'
            }).popover("show");
            leftDEmpty = true;
            removeTempTiles();
        };
    }
    else if ($(div).hasClass("fromLeft")) {
        newTileArray.forEach(function(tile) {
            var doors = tile.doors.split(" ");
            if (doors.includes("leftD")) {
                tilesWithDirection.push(tile);
            };
        });
        if (tilesWithDirection.length > 0) {
            newTile = rollNewRoom(div, tilesWithDirection);
            var i = newTileArray.indexOf(newTile);
            newTileArray.splice(i, 1);
            $(div).remove();
            $(cellJID).append(newTile.div);
            player.movePlayer(newTile);
            temporaryTilePlacement(newTile);
        } else {
            $(div).remove();
            $("#player").popover({
                'placement': 'bottom',
                'delay': {
                    show: 500,
                    hide: 800,
                },
                'content': 'No tiles in that direction available!'
            }).popover("show");
            rightDEmpty = true;
            removeTempTiles();
        };
    }
    else if ($(div).hasClass("fromBottom")) {
        newTileArray.forEach(function(tile) {
            var doors = tile.doors.split(" ");
            if (doors.includes("bottomD")) {
                tilesWithDirection.push(tile);
            };
        });
        if (tilesWithDirection.length > 0) {
            newTile = rollNewRoom(div, tilesWithDirection);
            var i = newTileArray.indexOf(newTile);
            newTileArray.splice(i, 1);
            $(div).remove();
            $(cellJID).append(newTile.div);
            player.movePlayer(newTile);
            temporaryTilePlacement(newTile);
        } else {
            $(div).remove();
            $("#player").popover({
                'placement': 'bottom',
                'delay': {
                    show: 500,
                    hide: 800,
                },
                'content': 'No tiles in that direction available!'
            }).popover("show");
            topDEmpty = true;
            removeTempTiles();
        };
    }
    else if ($(div).hasClass("fromTop")) {
        newTileArray.forEach(function(tile) {
            var doors = tile.doors.split(" ");
            if (doors.includes("topD")) {
                tilesWithDirection.push(tile);
            };
        });
        if (tilesWithDirection.length > 0) {
            newTile = rollNewRoom(div, tilesWithDirection);
            var i = newTileArray.indexOf(newTile);
            newTileArray.splice(i, 1);
            $(div).remove();
            $(cellJID).append(newTile.div);
            player.movePlayer(newTile);
            temporaryTilePlacement(newTile);
        } else {
            $(div).remove();
            $("#player").popover({
                'placement': 'bottom',
                'delay': {
                    show: 500,
                    hide: 800,
                },
                'content': 'No tiles in that direction available!'
            }).popover("show");
            bottomDEmpty = true;
            removeTempTiles();
        };
    };
};

function temporaryTilePlacement(tile) {
    var parentCell = $(tile.jID).parent().attr('id');
    var splitParent = parentCell.split("_");
    var newCellID;
    var newCellJID;
    var newCellDiv;
    if ($(tile.jID).hasClass("leftD") && leftDEmpty === false) {
        splitParent[1] = parseInt(splitParent[1]) - 1;
        newCellID = splitParent.join("_");
        newCellJID = "#" + newCellID;
        newCellDiv = "<div class='temp-tile fromRight'></div>"
        if ($(newCellJID + "> div").length === 0) {
            $(newCellJID).append(newCellDiv);
        };
        splitParent = parentCell.split("_");
    };
    if ($(tile.jID).hasClass("rightD") && rightDEmpty === false) {
        splitParent[1] = parseInt(splitParent[1]) + 1;
        newCellID = splitParent.join("_");
        newCellJID = "#" + newCellID;
        newCellDiv = "<div class='temp-tile fromLeft'></div>"
        if ($(newCellJID + "> div").length === 0) {
            $(newCellJID).append(newCellDiv);
        };
        splitParent = parentCell.split("_");
    };
    if ($(tile.jID).hasClass("topD") && topDEmpty === false) {
        splitParent[2] = parseInt(splitParent[2]) + 1;
        newCellID = splitParent.join("_");
        newCellJID = "#" + newCellID;
        newCellDiv = "<div class='temp-tile fromBottom'></div>"
        if ($(newCellJID + "> div").length === 0) {
            $(newCellJID).append(newCellDiv);
        };
        splitParent = parentCell.split("_");
    };
    if ($(tile.jID).hasClass("bottomD") && bottomDEmpty === false) {
        splitParent[2] = parseInt(splitParent[2]) - 1;
        newCellID = splitParent.join("_");
        newCellJID = "#" + newCellID;
        newCellDiv = "<div class='temp-tile fromTop'></div>"
        if ($(newCellJID + "> div").length === 0) {
            $(newCellJID).append(newCellDiv);
        };
        splitParent = parentCell.split("_");
    };
    $(window).scrollTo($("#player"), 40, {offset: {left: -550, top: -300}});
};

function startingPieces() {
    newTileArray.forEach(function(tile) {
        if (tile.name === "home") {
            $("#cell_10_10").append(tile.div);
            var i = newTileArray.indexOf(tile);
            newTileArray.splice(i, 1);
            temporaryTilePlacement(tile);
            player.curLoc = tile.jID;
            player.placement();
        };
    });
};

function createTileArray() {
    var newArray = new Array;
    tileArray.forEach(function(tile) {
        while (tile.numberOf > 0) {
            var newTile = tile.createUniqueTile();
            newArray.push(newTile);
        };
    });
    return newArray;
};

function tableGenerator() {
    var board = $("#table-of-tiles");
    for (var y = 0; y <= 30; y++) {
        var newRow = "<tr id='row_" + y.toString() + "'></tr>";
        board.prepend(newRow);
        currentRow = $("#row_" + y.toString());
        for (var x = 0; x <= 30; x++) {
            var newCell = "<td id='cell_" + x.toString() + "_" + y.toString() + "'></td>";
            currentRow.append(newCell);
        };
    };
};

function startOfGame() {
    startingPieces();
};

// PLAYER CLASS

function Player (
    name, jID, curLoc,
    str, end, agl,
    int, chr, lck,
    div
) {
    // PLAYER PROPERTIES
    this.name = name;
    this.jID = jID;
    this.curLoc = curLoc;
    this.str = str;
    this.end = end;
    this.agl = agl;
    this.int = int;
    this.chr = chr;
    this.lck = lck;
    this.div = div;
    // PLAYER METHODS
    this.convertStatToNum = function(element) {
        if (element.classList.contains("six")) {
            return 6;
        }
        else if (element.classList.contains("five")) {
            return 5;
        }
        else if (element.classList.contains("four")) {
            return 4;
        }
        else if (element.classList.contains("three")) {
            return 3;
        }
        else if (element.classList.contains("two")) {
            return 2;
        }
        else if (element.classList.contains("one")) {
            return 1;
        };
    };
    this.fetchPlayerCurrentStats = function() {
        $("#stat-container-numbers").children().each(function(index, element) {
            if (element.id === "str-stat") {
                player.str = player.convertStatToNum(element);
            }
            else if (element.id === "end-stat") {
                player.end = player.convertStatToNum(element);
            }
            else if (element.id === "agl-stat") {
                player.agl = player.convertStatToNum(element);
            }
            else if (element.id === "int-stat") {
                player.int = player.convertStatToNum(element);
            }
            else if (element.id === "chr-stat") {
                player.chr = player.convertStatToNum(element);
            }
            else if (element.id === "lck-stat") {
                player.lck = player.convertStatToNum(element);
            };
        });
    };
    this.placement = function() {
        $(this.curLoc).append(this.div);
        $(window).scrollTo($("#player"), 40, {offset: {left: -550, top: -300}}); ////////////////////////
    };
    this.adjacent = function(cell) {
        var playerCell = $(this.curLoc).parent().attr('id');
        var cellSplit = playerCell.split("_");
        var adjCellSplit = cell.split("_");
        if ((parseInt(cellSplit[1]) - 1) === parseInt(adjCellSplit[1]) && parseInt(cellSplit[2]) === parseInt(adjCellSplit[2])) {
            if ($(this.curLoc).hasClass("leftD")) {
                return true;        // CHECKING LEFT ADJ
            };
        }
        else if ((parseInt(cellSplit[1]) + 1) === parseInt(adjCellSplit[1]) && parseInt(cellSplit[2]) === parseInt(adjCellSplit[2])) {
            if ($(this.curLoc).hasClass("rightD")) {
                return true;        // CHECKING RIGHT ADJ
            };
        }
        else if (parseInt(cellSplit[1]) === parseInt(adjCellSplit[1]) && (parseInt(cellSplit[2]) + 1) === parseInt(adjCellSplit[2])) {
            if ($(this.curLoc).hasClass("topD")) {
                return true;        //CHECKING TOP ADJ
            };
        }
        else if (parseInt(cellSplit[1]) === parseInt(adjCellSplit[1]) && (parseInt(cellSplit[2]) - 1) === parseInt(adjCellSplit[2])) {
            if ($(this.curLoc).hasClass("bottomD")) {
                return true;        //CHECKING BOTTOM ADJ
            };
        };
    };
    this.movePlayer = function(tile) {
        $("#player").remove();
        this.curLoc = tile.jID;
        this.placement();
    };
    this.moveToOld = function(divjID) {
        $("#player").popover("hide");
        $("#player").remove();
        this.curLoc = divjID;
        this.placement();
    }
};

// PLAYER INSTANCE

var player = new Player("", "", null, null, null, null, null, null, null, "<div id='player'></div>");

// CHARACTER CREATION FUNCTIONS

function characterCreation() {
    var charName = document.forms["character-creation"]["character-name"].value;
    if (charName == "") {
        $("#character-name-container").popover("show");
        return false;
    };
    if ($("#stat-token-container").children().length > 1) {
        $("#stat-token-container").popover("show");
        return false;
    };
    player.name = charName;
    player.jID = "#" + charName;
    $("#character-name-container").children().remove();
    $("#character-name-container").text(charName);
    $("#char-creation-button").remove();
    $("#stat-token-container").remove();
    $("#stat-container-numbers").children().each(function(index, element) {
        var jID = "#" + element.id;
        if ($(jID).children().attr('id') === "six-stat-token") {
            $(jID).addClass("six");
            $(jID).empty();
        }
        else if ($(jID).children().attr('id') === "five-stat-token") {
            $(jID).addClass("five");
            $(jID).empty();
        }
        else if ($(jID).children().attr('id') === "four-stat-token") {
            $(jID).addClass("four");
            $(jID).empty();
        }
        else if ($(jID).children().attr('id') === "three-stat-token") {
            $(jID).addClass("three");
            $(jID).empty();
        }
        else if ($(jID).children().attr('id') === "two-stat-token") {
            $(jID).addClass("two");
            $(jID).empty();
        }
        else if ($(jID).children().attr('id') === "one-stat-token") {
            $(jID).addClass("one");
            $(jID).empty();
        };
    });
    $("#character-card").animate({
        marginLeft: "0px",
        marginBottom: "-220px",
    }, 1500);
    $("#character-card").addClass("character-menu");
    $("#bottom-background").animate({
        marginBottom: "-270px",
    }, 1500);
    $("#character-card").addClass("character-menu");
    player.fetchPlayerCurrentStats();
    startOfGame();
};

function startingHealth(num) {
    $($("#character-hlth").children().get().reverse()).each(function(index, element) {
        if (index < num) {
            element.classList.add("health-token");
        }
        else {
            element.classList.remove("health-token");
        };
    });
};

function startingSanity(num) {
    $($("#character-snty").children().get().reverse()).each(function(index, element) {
        if (index < num) {
            element.classList.add("sanity-token");
        }
        else {
            element.classList.remove("sanity-token");
        };
    });
};

$(document).ready(function() {
    var lastPlace;
    var healthStat = $("#end-stat");
    var sanityStat = $("#int-stat");
    tableGenerator();
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    $(document).click(function(event) {
        $("#character-name-container").popover("hide");
        $("#stat-token-container").popover("hide");
        $("#player").popover("hide");
        $("#table-of-tiles").popover("hide");
    });
    $(".stat-token").draggable({
        snap: ".stat-slot",
        snapMode: "inner",
        snapTolerance: 5,
        revert: true,
        zIndex: 10,
        start: function(event, ui) {
            lastPlace = $(this).parent();
        }
    });
    $(".stat-slot").droppable({
        drop: function(event, ui) {
            var dropped = ui.draggable;
            var droppedOn = this;

            if ($(droppedOn).children().length > 0) {
                $(droppedOn).children().detach().prependTo($(lastPlace));
            }

            $(dropped).detach().css({
                top: 0,
                left: 0
            }).prependTo($(droppedOn));
            if (healthStat.has("#six-stat-token").length) {
                startingHealth(10);
            }
            else if (healthStat.has("#five-stat-token").length) {
                startingHealth(9);
            }
            else if (healthStat.has("#four-stat-token").length) {
                startingHealth(8);
            }
            else if (healthStat.has("#three-stat-token").length) {
                startingHealth(7);
            }
            else if (healthStat.has("#two-stat-token").length) {
                startingHealth(6);
            }
            else if (healthStat.has("#one-stat-token").length) {
                startingHealth(5);
            }
            else {
                startingHealth(0);
            };

            if (sanityStat.has("#six-stat-token").length) {
                startingSanity(10);
            }
            else if (sanityStat.has("#five-stat-token").length) {
                startingSanity(9);
            }
            else if (sanityStat.has("#four-stat-token").length) {
                startingSanity(8);
            }
            else if (sanityStat.has("#three-stat-token").length) {
                startingSanity(7);
            }
            else if (sanityStat.has("#two-stat-token").length) {
                startingSanity(6);
            }
            else if (sanityStat.has("#one-stat-token").length) {
                startingSanity(5);
            }
            else {
                startingSanity(0);
            };
        }
    });
    $("#container").on("click", '.character-menu', function() {
        var charMen = "#" + this.id;
        $(charMen).stop();
        $(charMen).animate({
            marginBottom: "50px"
        }, 700);
    });
    $("#container").on("mouseleave", '.character-menu', function() {
        var charMen = "#" + this.id;
        $(charMen).stop();
        $(charMen).animate({
            marginBottom: "-220px"
        }, 1500);
    });
    $("td").on("click", ".temp-tile", function() {
        var curDiv = this;
        var currentCell = $(this).parent().attr('id');
        if (player.adjacent(currentCell) === true) {
            tempToTile(curDiv, currentCell);
        }
        else {
            $(window).scrollTo($("#player"), 40, {offset: {left: -550, top: -300}});
            $("#player").popover({
                'placement': 'bottom',
                'delay': {
                    show: 500,
                    hide: 800,
                },
                'content': 'Player is not adjacent to that room!'
            }).popover("show");
            return false;
        }
    });
    $("td").on("click", ".tile", function() {
        var curDiv = this;
        var curDivID = $(curDiv).attr('id');
        var curDivjID = "#" + curDivID;
        var currentCell = $(this).parent().attr('id');
        if (curDivjID === player.curLoc) {
            $("#player").popover("hide");
            return false;
        }
        if (player.adjacent(currentCell) === true) {
            player.moveToOld(curDivjID);
        }
        else {
            $(window).scrollTo($("#player"), 40, {offset: {left: -550, top: -300}});
            $("#player").popover({
                'placement': 'bottom',
                'delay': {
                    show: 500,
                    hide: 800,
                },
                'content': 'Player is not adjacent to that room!'
            }).popover("show");
            return false;
        };
    });
    $("#character-portrait").on("click", function() {
        $(window).scrollTo($("#player"), 40, {offset: {left: -550, top: -300}});
    });
});
