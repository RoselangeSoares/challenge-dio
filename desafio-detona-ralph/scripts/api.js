const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeleft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lives: document.querySelector('#lives'),
    },
    values: {
        hitPosition: 0,
        result: 0,
        lives: 5,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime < 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert('Game Over! O seu resultado foi: ' + state.values.result);
    }
}

function playAudio(hit) {
    let audio = new Audio(hit ? 'sounds/hit.m4a' : 'sounds/missed.m4a');
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;

    randomSquare.addEventListener('mousedown', hitHandler);
}

function hitHandler() {

    if (this.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playAudio(true);

        this.removeEventListener('mousedown', hitHandler);
    } else {
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;
        playAudio(false);

        if (state.values.lives === 0) {
            alert('Game Over! acabaram suas vidas.');
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            alert('Parabéns! O seu resultado foi: ' + state.values.result + ', atualize a página e bom jogo!');
        }
    }
}

function init() {
    addListenerHitBox();
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', hitHandler);
    });
}

init();
