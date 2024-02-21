const shuffleArray = (arr) => {
  let shuffledArr = arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffledArr;
};

const getRandomNumber = (maxNum) => {
  const randomNumber = Math.trunc(Math.random() * maxNum);
  return randomNumber;
};

const pickRandomCard = (arr) => {
  let randomNumber = getRandomNumber(arr.length);
  const card = arr[randomNumber];
  arr.splice(arr[randomNumber], 1);
  return card;
};

const generateCardArray = () => {
  const diamonds = [
    { name: 'A', number: 13, suit: 'diamantes' },
    { name: 'K', number: 12, suit: 'diamantes' },
    { name: 'Q', number: 11, suit: 'diamantes' },
    { name: 'J', number: 10, suit: 'diamantes' },
  ];
  const spades = [
    { name: 'A', number: 13, suit: 'picas' },
    { name: 'K', number: 12, suit: 'picas' },
    { name: 'Q', number: 11, suit: 'picas' },
    { name: 'J', number: 10, suit: 'picas' },
  ];
  const clubs = [
    { name: 'A', number: 13, suit: 'treboles' },
    { name: 'K', number: 12, suit: 'treboles' },
    { name: 'Q', number: 11, suit: 'treboles' },
    { name: 'J', number: 10, suit: 'treboles' },
  ];
  const hearts = [
    { name: 'A', number: 13, suit: 'corazones' },
    { name: 'K', number: 12, suit: 'corazones' },
    { name: 'Q', number: 11, suit: 'corazones' },
    { name: 'J', number: 10, suit: 'corazones' },
  ];
  for (let i = 2; i < 11; i++) {
    diamonds.push({ name: i, number: i, suit: 'diamantes' });
    spades.push({ name: i, number: i, suit: 'picas' });
    clubs.push({ name: i, number: i, suit: 'treboles' });
    hearts.push({ name: i, number: i, suit: 'corazones' });
  }
  const cardArray = [...diamonds, ...spades, ...clubs, ...hearts];
  return cardArray;
};

const solveRound = (userChoice, machineCard, actualCard, userName) => {
  const messages = [
    `${userName} Ganaste! La carta era ${actualCard.name} de ${actualCard.suit}`,
    `${userName} Perdiste. La carta era ${actualCard.name} de ${actualCard.suit}`,
    `${userName} tiene que elegir si la siguiente carta es 'mayor' o 'menor'!`,
  ];
  let matchIncrement = 0;
  let scoreIncrement = 0;
  let message = '';
  switch (userChoice) {
    case 'mayor':
      if (actualCard.number > machineCard.number) {
        message = messages[0];
        scoreIncrement++;
      } else {
        message = messages[1];
      }
      matchIncrement++;
      break;
    case 'menor':
      if (actualCard.number < machineCard.number) {
        message = messages[0];
        scoreIncrement++;
      } else {
        message = messages[1];
      }
      matchIncrement++;
      break;
    default:
      matchIncrement++;
  }
  return { scoreIncrement, matchIncrement, message };
};

export const playCardGame = () => {
  // ---> Usar do while mejor
  while (playAgain === true) {
    const machineCard = pickRandomCard(cardArray);
    // alert(`La carta es el ${machineCard.name} de ${machineCard.suit}`);
    const actualCard = pickRandomCard(cardArray);
    do {
      // let userChoice = prompt(
      //   '¿Crees que la siguiente carta será mayor o menor?'
      // ).toLowerCase();
      const { scoreIncrement, matchIncrement, message } = solveRound(
        userChoice,
        machineCard,
        actualCard,
        userName
      );
      score += scoreIncrement;
      match += matchIncrement;
      // alert(message);
      if (matchIncrement) {
        break;
      }
    } while (true);
    console.log('Cards left', cardArray.length);
    if (!cardArray.length) {
      // alert('Se acabaron las cartas!');
      break;
    }
    // playAgain = confirm(`${userName} quieres jugar de nuevo?.
    // De momento has jugado ${match} veces y ganado ${score} veces!`);
  }
  // alert(`Gracias por haber jugado **${userName}**
  //   Has jugado ${match} vez y ganado ${score} vez!`);
};

const formElement = document.querySelector('form');
const sendBtn = document.querySelector('.btn');

export const game = () => {
  const cardArray = shuffleArray(generateCardArray());
  let score = 0;
  let match = 0;
  let userName;
  let machineCard = '';
  let playAgain = true;
  let userChoice;
  let actualBtn = 'keepGoing';
  const placeholder = document.querySelector('#username');
  let initialContainer = document.querySelector('.initial-container');
  let gameContainer = document.querySelector('.game-container');
  let cardsContainer = document.querySelector('.cards-container');
  let startGameBtn = document.querySelector('.start-game');
  let highLowBtns = document.querySelector('.high-low-btns');
  let card1 = document.querySelector('.card-1');
  let card2 = document.querySelector('.card-2');
  let lower = document.querySelector('.lower');
  let higher = document.querySelector('.higher');
  let keepGoing = document.querySelector('.keep-going');
  let resultText = document.querySelector('.result-text');
  let scoreCounter = document.querySelector('.score-counter');
  let matchCounter = document.querySelector('.match-counter');

  const startGame = () => {
    startGameBtn.style.display = 'none';
    highLowBtns.style.display = 'flex';
    machineCard = pickRandomCard(cardArray);
    card1.innerHTML = machineCard.name + ' ' + machineCard.suit;
    card2.innerHTML = '';
    matchCounter.innerHTML = match;
  };

  const getLower = () => {
    if (actualBtn !== 'higher' && actualBtn !== 'lower') {
      userChoice = 'lower';
      const actualCard = pickRandomCard(cardArray);
      if (actualCard.number < machineCard.number) {
        resultText.innerHTML = `Ganaste. La carta era ${actualCard.name} de ${actualCard.suit}`;
        score++;
      } else {
        resultText.innerHTML = `Perdiste. La carta era ${actualCard.name} de ${actualCard.suit}`;
      }
      card2.innerHTML = actualCard.name + ' ' + actualCard.suit;
      match++;
      scoreCounter.innerHTML = score;
      matchCounter.innerHTML = match;
    }
    actualBtn = 'lower';
    console.log(cardArray.length);
  };

  const getHigher = () => {
    if (actualBtn !== 'higher' && actualBtn !== 'lower') {
      userChoice = 'higher';
      const actualCard = pickRandomCard(cardArray);
      if (actualCard.number > machineCard.number) {
        resultText.innerHTML = `Ganaste. La carta era ${actualCard.name} de ${actualCard.suit}`;
        score++;
      } else {
        resultText.innerHTML = `Perdiste. La carta era ${actualCard.name} de ${actualCard.suit}`;
      }
      card2.innerHTML = actualCard.name + ' ' + actualCard.suit;
      match++;
      scoreCounter.innerHTML = score;
      matchCounter.innerHTML = match;
    }
    actualBtn = 'higher';
    console.log(cardArray.length);
  };

  const getMachineCard = () => {
    if (actualBtn !== 'keepGoing') {
      userChoice = 'higher';
      machineCard = pickRandomCard(cardArray);
      card1.innerHTML = machineCard.name + ' ' + machineCard.suit;
      card2.innerHTML = '';
    }
    actualBtn = 'keepGoing';
    console.log(cardArray.length);
  };

  const onSubmitForm1 = (event) => {
    event.preventDefault();
    userName = event.target.elements.username.value;
    placeholder.innerHTML = userName;
    initialContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
    cardsContainer.style.display = 'flex';
    formElement.reset();
    return console.log(userName);
  };

  formElement.addEventListener('submit', onSubmitForm1);
  startGameBtn.addEventListener('click', startGame);
  lower.addEventListener('click', getLower);
  higher.addEventListener('click', getHigher);
  keepGoing.addEventListener('click', getMachineCard);
  // --> Mejor usar un solo event listener para escuchar a ambos botones,
  // --> Y un solo event handler en el que se recoja el text content del botón
  // --> Para identificar cuál es cuál
  // --> De esa forma además se puede reutilizar mejor el código original
  // --> La mejor forma es usando un querySelectorAll() y un forEach()
};
