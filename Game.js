var nameDisplay = document.getElementById('nameDisplay');
var numberSelect = document.getElementById('numberSelect');
var cardContainer = document.getElementById('cardContainer');
var formContainer = document.getElementById('formContainer');
var timer = document.getElementById('timer');
var playAgain = document.getElementById('playAgain');

var timerInterval;
var firstCard = null;
var secondCard = null;
var isChecking = false;
var matchedPairs = 0;
var totalPairs = 0;

for (var i = 2; i <= 30; i++) {
  var option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  numberSelect.appendChild(option);
}

function loadGame() {
    var selectedNumber = parseInt(numberSelect.value, 10);
    resetGameState(selectedNumber);
    var cards = generateCards(selectedNumber);
    cards = shuffleCards(cards);
    displayCards(cards);
    startTimer();
    hideFormNShowTimer();
    showName();
}

function generateCards(selectedNumber) {
    var cards = [];
    for (var i = 1; i <= selectedNumber; i++) {
        cards.push(`${i}`);
        cards.push(`${i}`);
    }
    return cards;
}

function resetGameState(selectedNumber) {
    cardContainer.innerHTML = '';
    firstCard = null;
    secondCard = null;
    isChecking = false;
    matchedPairs = 0;
    totalPairs = selectedNumber;
    playAgain.style.display = 'none';
}

function shuffleCards(cards) {
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

function displayCards(cards) {
    cards.forEach(cardNumber => {
        var card = document.createElement('div');
        card.className = 'card';
        var numberElement = document.createElement('div');
        numberElement.className = 'number';
        numberElement.textContent = cardNumber;
        card.appendChild(numberElement);
        card.addEventListener('click', () => flipCard(card, cardNumber));
        cardContainer.appendChild(card);
    });
}

function startTimer() {
    var seconds = 0;
    timer.textContent = `Time: ${seconds}`;
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(() => {
        seconds++;
        timer.textContent = `Time: ${seconds}`;
    }, 1000);
}

function hideFormNShowTimer() {
    formContainer.style.display = 'none';
    cardContainer.style.display = 'flex';
    timer.style.display = 'block';
}

function showName() {
    var userName = document.getElementById('name').value;
    nameDisplay.textContent = userName + ' is playing';
    nameDisplay.style.display = 'block';
}

function flipCard(card, cardNumber) {
    if (isChecking || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    card.classList.add('flipped');
    if (!firstCard) {
        firstCard = {card, cardNumber};
    } else {
        secondCard = {card, cardNumber};
        checkForMatch();
    }
}

function checkForMatch() {
    isChecking = true;

    if (firstCard.cardNumber === secondCard.cardNumber) {
        firstCard.card.classList.add('matched');
        secondCard.card.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            clearInterval(timerInterval);
            showPlayAgainButton();
        }
        resetCards();
    }
    else {
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    isChecking = false;
}

function resetGame() {
    formContainer.style.display = 'block';
    cardContainer.style.display = 'none';
    timer.style.display = 'none';
    playAgain.style.display = 'none';
    nameDisplay.style.display = 'none';
    clearInterval(timerInterval);
}

function showPlayAgainButton() {
    playAgain.style.display = 'block';
}
