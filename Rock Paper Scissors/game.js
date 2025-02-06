const images = {
    Rock: '/10-html-css-js/image/rock-emoji.png',
    Paper: '/10-html-css-js/image/paper-emoji.png',
    Scissors: '/10-html-css-js/image/scissors-emoji.png'
};

const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

function scoreReset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    updateScoreElement();
}

function computerMover() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }
    return computerMove;
}

function playGame(playerMove) {
    const computerMove = computerMover();
    let result = '';
    if (playerMove === computerMove) {
        result = 'Tie';
    } else if (
        (playerMove === 'Rock' && computerMove === 'Scissors') ||
        (playerMove === 'Paper' && computerMove === 'Rock') ||
        (playerMove === 'Scissors' && computerMove === 'Paper')
    ) {
        result = 'You Win';
    } else {
        result = 'You Lose';
    }

    if (result === 'You Win') {
        score.wins += 1;
    } else if (result === 'You Lose') {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }

    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You played <img src="${images[playerMove]}" alt="${playerMove}" width="50" height="50"> Computer played <img src="${images[computerMove]}" alt="${computerMove}" width="50" height="50">`;
    localStorage.setItem('score', JSON.stringify(score));
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}