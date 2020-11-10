var d0 = document.getElementById("d0");
var d1 = document.getElementById("d1");
var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");

var s0 = document.getElementById("s0");
var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
var s3 = document.getElementById("s3");
var s4 = document.getElementById("s4");
var s5 = document.getElementById("s5");
var s6 = document.getElementById("s6");
var s7 = document.getElementById("s7");
var s8 = document.getElementById("s8");
var s9 = document.getElementById("s9");
var s10 = document.getElementById("s10");
var s11 = document.getElementById("s11");
var s12 = document.getElementById("s12");
var s13 = document.getElementById("s13");

var roll = document.getElementById("rollButton");
var rollCount = 0;

var total = document.getElementById("total");
var totalBtn = document.getElementById("totalButton");

var gameOverBlock = document.getElementById("game-over-block");
var resetBtn = document.getElementById("resetButton");
var finalScore = document.getElementById("finalScore");

var diceObjArr = [d0, d1, d2, d3, d4];

for (var i = 0; i < 5; i++) {
    diceObjArr[i].setAttribute("canRoll", "1");
}

var scoreObjArr = [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13];

for (var i = 0; i < 14; i++) {
    scoreObjArr[i].setAttribute("isUsed", "0");
}

roll.onclick = function() {RollDice();}

d0.onclick = function() {LockDice(d0);}

d1.onclick = function() {LockDice(d1);}

d2.onclick = function() {LockDice(d2);}

d3.onclick = function() {LockDice(d3);}

d4.onclick = function() {LockDice(d4);}

totalBtn.onclick = function() {
    gameOverBlock.style.display = "flex";
    var total = 0;
    for (var i = 0; i < 14; i++) {
        total += parseInt(scoreObjArr[i].innerHTML, 10);
    }
    finalScore.innerHTML = "Your final score is: " + total + ".";
}

resetBtn.onclick = function() {
    document.location.reload();
}

//Ones
s0.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    for (var i = 0; i < 5; i++) {
        diceValues[i] == 1 ? score += 1 : score += 0;
    }
    PlayHand(s0, score);
}

//Twos
s1.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    for (var i = 0; i < 5; i++) {
        diceValues[i] == 2 ? score += 2 : score += 0;
    }
    PlayHand(s1, score);
}

//Threes
s2.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    for (var i = 0; i < 5; i++) {
        diceValues[i] == 3 ? score += 3 : score += 0;
    }
    PlayHand(s2, score);
}

//Fours
s3.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    for (var i = 0; i < 5; i++) {
        diceValues[i] == 4 ? score += 4 : score += 0;
    }
    PlayHand(s3, score);
}

//Fives
s4.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    for (var i = 0; i < 5; i++) {
        diceValues[i] == 5 ? score += 5 : score += 0;
    }
    PlayHand(s4, score);
}

//Sixes
s5.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    for (var i = 0; i < 5; i++) {
        diceValues[i] == 6 ? score += 6 : score += 0;
    }
    PlayHand(s5, score);
}

//ThreeOfAKind
s6.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    var numIndex = [0, 0, 0, 0, 0, 0];

    CheckNumOfNums(diceValues, numIndex);

    for (var i = 0; i < 6; i++) {
        if (numIndex[i] > 2) {
            score = 25;
        }
    }

    PlayHand(s6, score);
}

//FourOfAKind
s7.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    var numIndex = [0, 0, 0, 0, 0, 0];

    CheckNumOfNums(diceValues, numIndex);

    for (var i = 0; i < 6; i++) {
        if (numIndex[i] > 3) {
            score = 35;
        }
    }

    PlayHand(s7, score);
}

//FiveOfAKind
s8.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    var numIndex = [0, 0, 0, 0, 0, 0];

    CheckNumOfNums(diceValues, numIndex);

    for (var i = 0; i < 6; i++) {
        if (numIndex[i] > 4) {
            score = 50;
        }
    }
    PlayHand(s8, score);
}

//FourinARow
s9.onclick = function() {
    var diceValues = GetInts();
    var score = 0;

    SortArr(diceValues);

    var consec = 0;
    for (var i = 0; i < diceValues.length; i++) {
        if ((diceValues[i] + 1) == diceValues[i+1]) {
            consec++;
        }
    }

    if (consec >= 3) {
        score = 30;
    }

    PlayHand(s9, score);
}

//FiveInARow
s10.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    var allConsecutive = true;

    SortArr(diceValues);

    for (var i = 0; i < diceValues.length - 1; i++) {
        if (diceValues[i] + 1 != diceValues[i+1]) {
            allConsecutive = false;
            break;
        }
    }

    if (allConsecutive == true) {
        score = 40;
    }

    PlayHand(s10, score);
}

//FullHouse
s11.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    var numIndex = [0, 0, 0, 0, 0, 0];

    CheckNumOfNums(diceValues, numIndex);

    var hasThree = false;
    var hasTwo = false;

    for (var i = 0; i < 6; i++) {
        if (numIndex[i] == 3) {
            hasThree = true;
        }

        if (numIndex[i] == 2) {
            hasTwo = true;
        }

        if (hasTwo == true && hasThree == true) {
            score = 40;
        }
    }
    PlayHand(s11, score);
}

// TwoPair
s12.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    var numIndex = [0, 0, 0, 0, 0, 0];
    var pairs = 0;

    CheckNumOfNums(diceValues, numIndex);

    for (var i = 0; i < 6; i++) {
        if (numIndex[i] == 2) {
            pairs++;
        }
    }

    if (pairs == 2) {
        score = 30;
    }

    PlayHand(s12, score);
}

// Mulligan
s13.onclick = function() {
    var diceValues = GetInts();
    var score = 0;
    for (var i = 0; i < 5; i++) {
        score += diceValues[i];
    }
    PlayHand(s13, score);
}

//check for game over
function gameEnd() {
    var numUsed = 0;
    for (var i = 0; i < 14; i++) {
        if (scoreObjArr[i].getAttribute("isUsed") == "1") {
            numUsed++;
        }
    }
    if (numUsed == 14) {
        total.style.display = "flex";
    }
}

function GetInts() {
    var arr = [];
    arr[0] = parseInt(d0.innerHTML, 10);
    arr[1] = parseInt(d1.innerHTML, 10);
    arr[2] = parseInt(d2.innerHTML, 10);
    arr[3] = parseInt(d3.innerHTML, 10);
    arr[4] = parseInt(d4.innerHTML, 10);
    return arr;
}

function SortArr(arr) {
    for (var i = arr.length - 1; i > 0; i--){
        for (var j = 0; j < i; j++) {
            var temp = 0;
            if (arr[j] >= arr[j+1]) {
                temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

function IsSorted(arr) {
    var index = 0;
    while (index < arr.length - 1) {
        if (arr[index] <= arr[index + 1]) {
            index++;
        }
        else {
            return false;
        }
    }
    return true;
}

function CheckNumOfNums(dice, nums) {
    for (var i = 0; i < 5; i++) {
        switch (dice[i]) {
            case 1:
                nums[0]++;
                break;
            case 2:
                nums[1]++;
                break;
            case 3:
                nums[2]++;
                break;
            case 4:
                nums[3]++;
                break;
            case 5:
                nums[4]++;
                break;
            case 6:
                nums[5]++;
                break;
            default:
                alert("How is that possible?");
        }
    }
}

function PlayHand(cat, score) {
    if (cat.getAttribute("isUsed") == "0") {
        cat.innerHTML = score;
        cat.setAttribute("isUsed", "1");
        cat.style.backgroundColor = "rgb(100, 100, 250)";

        for (var i = 0; i < 5; i++) {
            UnlockDice(diceObjArr[i]);
            diceObjArr[i].innerHTML = "&nbsp;";
        }

        rollCount = 0;
        roll.style.backgroundColor = "rgb(30, 220, 220)";
    }
    else {
        alert("Category already used");
    }
    gameEnd();
}

function LockDice(dice) {
    dice.getAttribute("canRoll") == "1" ? dice.setAttribute("canRoll", "0") : dice.setAttribute("canRoll", "1");
    dice.getAttribute("canRoll") == "0" ? dice.style.backgroundColor = "rgb(255, 55, 55)" : dice.style.backgroundColor = "rgb(100, 250, 180)";
}

function UnlockDice(dice) {
    dice.setAttribute("canRoll", "1");
    dice.style.backgroundColor = "rgb(100, 250, 180)";
}

function RollDice() {
    if (rollCount < 3) {
        var intervalTime = 10;
        var interval = setInterval(function(){
            var diceArr = [];

            for (var i = 0; i < 5; i++) {
                diceArr[i] = Math.floor(Math.random() * 6) + 1;
            }

            for (var i = 0; i < 5; i++) {
                if (diceObjArr[i].getAttribute("canRoll") == 1) {
                    diceObjArr[i].innerHTML = diceArr[i];
                }
            }

            if (intervalTime >= 300) {
                clearInterval(interval);
                intervalTime = 0;
            }

            intervalTime +=5;
        }, intervalTime);
        rollCount += 1;

        if (rollCount == 3) {
            roll.style.backgroundColor = "#333";
        }
    }
    else {
        alert("Please choose a category to play your hand.")
    }
}
