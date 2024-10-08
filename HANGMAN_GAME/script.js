const wordList = [
    "planet", "flight", "smooth", "forest", "silver", "yellow", "animal", "bottle", "bridge", "castle",
    "coffee", "dinner", "driver", "engine", "family", "garden", "helmet", "jungle", "kindle", "liquid",
    "middle", "number", "orange", "pencil", "rabbit", "school", "travel", "useful", "victor", "window",
    "zigzag", "artist", "beacon", "camera", "danger", "editor", "flower", "guitar", "hunter", "income",
    "jacket", "kitten", "ladder", "monkey", "nature", "outlet", "pepper", "quartz", "random", "sailor",
    "ticket", "united", "violet", "wander", "yogurt", "butter", "cheese", "donkey", "eleven", "father",
    "grapes", "hammer", "island", "junior", "knight", "leader", "manner", "nation", "online", "police",
    "rocket", "soccer", "thread", "uncle", "violet", "winter", "author", "bounce", "cookie", "dreamy",
    "easily", "forest", "gentle", "hiking", "ignite", "jumper", "keeper", "lovely", "museum", "notary",
    "option", "poetry", "remark", "singer", "talent", "unfold", "valley", "wonder", "youths", "zipper"
];
let running = false;
let word = wordList[0].split('');//initializing word with a default value
let textBox = ["_", "_", "_", "_", "_", "_"];
let usedWords = ["", "", "", "", "", "", "", "", "", "", ""];
let wrongGuessCount = 0;
const text = document.querySelector('#textContainer');
const used = document.querySelector('#lettersUsed');

initializeGame();
function initializeGame() {
    running = true;
    const index = Math.floor(Math.random() * 100);
    word = wordList[index].split('');//initializing the variable word with a random word from the list,storing a an array of characters

    document.addEventListener("keydown", function (event) {
        handleKeyPress(event.key); // Pass the pressed key value to the function
    });
    document.querySelector("#restart").addEventListener("click", restart);
}

function handleKeyPress(key) {
    if (!running)
        return;
    if ((/[a-zA-Z]/).test(key) && key.length <= 1) {
        if (usedWords.includes(key))
            alert("The Letter is already used");
        else
            useKey(key);
    }
    else
        alert("Please use an alphabetical letter");
}

function useKey(key) {
    //The guess is wrong if not proved otherwise
    let wrongGuess = true;
    //Adding key to the list of used words
    for (i = 0; i < usedWords.length; i++) {
        if (usedWords[i] === "") {
            usedWords[i] = key;
            break;
        }
    }
    for (i = 0; i < word.length; i++) {
        if (word[i] == key) {
            textBox[i] = key;
            wrongGuess = false;
        }
    }

    text.textContent = textBox.join(' ');
    used.textContent = "Letters used : " + usedWords.join(' ');
    if (wrongGuess) {
        guessedWrong();
    }
    else
        checkWinner();
}

function guessedWrong() {
    wrongGuessCount++;
    if (wrongGuessCount == 1) {
        document.querySelector("#head").style.opacity = "100%";
        document.querySelector('#heart5').style.opacity = "0%";
    }
    else if (wrongGuessCount == 2) {
        document.querySelector("#torso").style.opacity = "100%";
        document.querySelector('#heart4').style.opacity = "0%";
    }
    else if (wrongGuessCount == 3) {
        document.querySelector("#leftArm").style.opacity = "100%";
        document.querySelector('#heart3').style.opacity = "0%";
    }
    else if (wrongGuessCount == 4) {
        document.querySelector("#rightArm").style.opacity = "100%";
        document.querySelector('#heart2').style.opacity = "0%";
    }
    else if (wrongGuessCount == 5) {
        document.querySelector("#leftLeg").style.opacity = "100%";
        document.querySelector('#heart1').style.opacity = "0%";
        document.querySelector("#head").style.color="red";            
    }
    else {
        document.querySelector("#rightLeg").style.opacity = "100%";
        document.querySelector('#heart0').style.opacity = "0%";
        document.querySelector("#head").textContent = "X    X";
        used.textContent = "you lost, the word was: "+word.join('');
        running = false;
    }

}
function checkWinner() {
    let hasWon = true;
    for (i = 0; i < textBox.length; i++) {
        if (textBox[i] == "_") {
            hasWon = false;
        }
    }
    if (hasWon) {
        used.textContent = "You have won";
    }
}
function restart() {
    window.location.reload();
}