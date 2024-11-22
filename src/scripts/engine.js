const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    
    values: {
        gameVelocity: 900,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        lives: 3,
        gameOver: false
    },
    
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        state.values.gameOver = true;
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("O tempo acabou! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber]; 
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function updateLivesDisplay() {
    const livesElement = document.querySelector(".menu-lives h2");
    livesElement.textContent = `x${state.values.lives}`;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (state.values.gameOver) return;

            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
            else {
                state.values.lives--;
                updateLivesDisplay();
                playSound("miss");
            }

            if (state.values.lives <= 0) {
                state.values.gameOver = true;
                clearInterval(state.actions.countDownTimerId);
                clearInterval(state.actions.timerId);
                alert("Game Over! O seu resultado foi: " + state.values.result);
            }
        });
    });
}

function init() {
    addListenerHitBox();
    updateLivesDisplay();
}

init();