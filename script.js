const game = {
    time: 60,
    score: 0,
    correct: 0,
    total: 0,
    startTime: 0,
    interval: null,
    currentText: "",
    running: false
};

const data = {
easy: ["pink is cute","hello kawaii world","typing is fun"],
medium: ["coding improves reflex speed","pink pixels shine bright"],
hard: ["arcade champions master precision under pressure"]
};

function startGame(){
    const diff = document.getElementById("difficulty").value;

    resetGame();
    game.running = true;
    game.startTime = Date.now();

     document.getElementById("input").disabled = false;
     document.getElementById("input").value = "";
     document.getElementById("input").focus();

    nextSentence(diff);

    clearInterval(game.interval);

     game.interval = setInterval(() => {
        const elapsed = (Date.now() - game.startTime) / 1000;
        game.time = Math.max(0, 60 - elapsed);

        updateUI();

        if(game.time <= 0){
            endGame();
        }
    }, 100);
}

function resetGame(){
    game.time = 60;
    game.score = 0;
    game.correct = 0;
      game.total = 0;
}

function nextSentence(diff){
    const arr = data[diff];
    game.currentText = arr[Math.floor(Math.random()*arr.length)];
      document.getElementById("sentence").innerText = game.currentText;
}

document.getElementById("input").addEventListener("input", (e) => {

     if(!game.running) return;

    game.total++;

    if(e.target.value.trim() === game.currentText){
        game.score += 10;
        game.correct++;

        const diff = document.getElementById("difficulty").value;
        nextSentence(diff);

         e.target.value = "";
    }

    updateUI();
});

function updateUI(){

     const accuracy = game.total === 0
        ? 100
        : Math.round((game.correct / game.total) * 100);

    const timeSpent = 60 - game.time;

    const wpm = timeSpent <= 0
        ? 0
        : Math.round((game.correct / timeSpent) * 60);

    document.getElementById("time").innerText = Math.ceil(game.time);
    document.getElementById("score").innerText = game.score;
    document.getElementById("acc").innerText = accuracy;
      document.getElementById("wpm").innerText = wpm;

    const bar = Math.max(0, Math.min(100, accuracy));

    document.getElementById("bar").style.width = bar + "%";
     document.getElementById("heart").style.left = bar + "%";
}

function endGame(){

    game.running = false;
    clearInterval(game.interval);

     document.getElementById("input").disabled = true;

     const name = document.getElementById("playerName").value || "Player";

    document.getElementById("finalStats").innerText =
        `${name} scored ${game.score} 💖 | Accuracy ${document.getElementById("acc").innerText}% | WPM ${document.getElementById("wpm").innerText}`;

    document.getElementById("resultScreen").style.display = "flex";
}