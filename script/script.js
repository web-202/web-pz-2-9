let timer = 60
let count = 1
let countTry = 3
let isWin = false
let isLose = false
let intervalTimer
let countGame = 1
let exampleCounter = 0
let exampleArray

let example
let warning
let warningTry
const winList = document.querySelector('.wins')


document.getElementById('start-game').addEventListener('click', () => {
    document.querySelector('.main__title').remove()
    document.getElementById('start-game').remove()

    const warningDiv = document.createElement('div');
    warningDiv.className = 'warning';
    warningDiv.textContent = 'Залишилось ';

    const spanElement = document.createElement('div');
    spanElement.textContent = '3 спроби';

    warningDiv.appendChild(spanElement);

    document.body.appendChild(warningDiv);

    warning = document.querySelector('.warning')
    warningTry = document.querySelector('.warning > div')

    restartGame()
})
const newGame = () => {
    document.getElementById('start-game-again').addEventListener('click', () => {
        document.querySelector('.timer').remove()
        document.querySelector('.game__block').remove()
        document.getElementById('start-game-again').remove()
        document.querySelector('.warning').remove()
        clearInterval(intervalTimer)
        timer = 60
        countTry = 3
        count = 1
        exampleCounter = 0
        const warningDiv = document.createElement('div');
        warningDiv.className = 'warning';
        warningDiv.textContent = 'Залишилось ';

        const spanElement = document.createElement('div');
        spanElement.textContent = '3 спроби';

        warningDiv.appendChild(spanElement);

        document.body.appendChild(warningDiv);

        warning = document.querySelector('.warning')
        warningTry = document.querySelector('.warning > div')
        countGame++
        isWin = false
        isLose = false
        restartGame()

    })
}
const timerCounter = () => {
    document.querySelector('.timer__score').textContent = timer
    if (timer == 0) {
        loseHandler()
        return
    }
    timer--
}
const restartGame = () => {
    const startGameAgain = document.createElement('div');
    startGameAgain.className = 'btn__start';
    startGameAgain.id = 'start-game-again';
    startGameAgain.innerHTML = 'Почати гру знову';

    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer';
    timerDiv.innerHTML = 'Залишилось: <span class="timer__score">60</span>';

    const gameBlockDiv = document.createElement('div');
    gameBlockDiv.className = 'game__block';

    const elementsDiv = document.createElement('div');
    elementsDiv.className = 'elements';

    const exampleDiv = document.createElement('div');
    exampleDiv.className = 'example';

    const numbers = Array.from({ length: 20 }, (_, index) => index + 1);
    numbers.sort(() => Math.random() - 0.5);

    exampleArray = [...numbers].sort(() => Math.random() - 0.5)

    for (let index = 0; index < 20; index++) {
        let gameElementDiv = document.createElement('div');
        gameElementDiv.className = 'game__element';
        let imgElementDiv = document.createElement('img');
        imgElementDiv.src = `./img/${numbers[index]}.png`;
        gameElementDiv.appendChild(imgElementDiv);
        elementsDiv.appendChild(gameElementDiv);
    }
    let exampleElement = document.createElement('div');
    exampleElement.className = 'example__element';
    let imgElementDiv = document.createElement('img');
    imgElementDiv.src = `./img/${exampleArray[exampleCounter]}.png`;
    exampleElement.appendChild(imgElementDiv);

    exampleDiv.appendChild(exampleElement);

    gameBlockDiv.appendChild(elementsDiv);
    gameBlockDiv.appendChild(exampleDiv);

    var gameContentDiv = document.querySelector('.game__content');

    gameContentDiv.appendChild(timerDiv);
    gameContentDiv.appendChild(gameBlockDiv);
    gameContentDiv.appendChild(startGameAgain);

    example = document.querySelector('.example__element > img');

    intervalTimer = setInterval(timerCounter, 1000);

    addEventForItem()
    newGame()
}
const addEventForItem = () => {
    document.querySelectorAll('.game__element > img').forEach(item => {
        item.addEventListener('click', () => {
            if (isLose || isWin) return
            const parts = item.src.split('/');
            const itemSrc = parts[parts.length - 1]
            if (itemSrc == `${exampleArray[exampleCounter]}.png`) {
                item.style.color = '#49ca54';
                item.style.backgroundColor = '#49ca54';
                exampleCounter++
                if (exampleCounter == 20) {
                    isWin = true
                    clearInterval(intervalTimer)
                    warning.textContent = 'Ти преміг'
                    warning.style.backgroundColor = '#49ca54';
                    warning.style.color = '#fffff';
                    const newLi = document.createElement('li');
                    newLi.textContent = `Гра №${countGame}  Результат: ${60 - timer}cек`;
                    winList.appendChild(newLi);
                    return
                }
                example.src = `./img/${exampleArray[exampleCounter]}.png`
            }
            else {
                countTry--
                if (countTry <= 0) {
                    loseHandler()
                }
                warningTry.textContent = countTry + ' спроби'
            }
        })
    }
    )
}
const loseHandler = () => {
    isLose = true
    clearInterval(intervalTimer)
    warning.textContent = 'Ти програв'
    warning.style.backgroundColor = '#d13838';
    warning.style.color = '#fffff';
}