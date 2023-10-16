const gameArea = $("#game-area");
const generateImgArea = $("#image-generation-area");
const countAnswers = $("#answer-count");
const body = $("#body");
const mainScreen = $("#main-screen");
const gameScreen = $("#game-screen");

let listOfName = [];
let listOfDraggableImg = [];
let correctImageCount = 0;

gameScreen.hide();

$("#go-to-game").click(function () {
    mainScreen.hide();
    gameScreen.show();
    generateCells();
});

$("#go-back").click(function () {
    gameScreen.hide();
    mainScreen.show();
});

const openModal = (modalId) => {
    $(`#${modalId}`).show();
}

const closeModal = (modalId) => {
    $(`#${modalId}`).hide();
}

$("#close-win-modal").click(() => closeModal("win-modal"));
$("#close-lose-modal").click(() => closeModal("lose-modal"));

const generateCells = () => {
    listOfName = [];
    correctImageCount = 0;
    countAnswers.text(correctImageCount);

    gameArea.empty();

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            let imgSrc = '';
            while (true) {
                let randomVariant = Math.floor(Math.random() * 5) + 1;
                let typeImg = ["amount", "equip", "person", "tank", "weapon"][randomVariant - 1];

                randomVariant = Math.floor(Math.random() * 5) + 1;
                imgSrc = `${typeImg}${randomVariant}`;

                if (!listOfName.includes(imgSrc)) {
                    break;
                }
            }

            listOfName.push(imgSrc);

            const cell = $(`<img class="cell" src="./img/${imgSrc}.png" alt="img"/>`)
                .droppable({
                    drop: function (event, ui) {
                        imgSrc = `./img/${imgSrc}.png`;
                        const draggedImage = ui.draggable;
                        const draggedSrc = draggedImage.attr("src");

                        if (draggedSrc === imgSrc) {
                            correctImageCount++;
                            countAnswers.text(correctImageCount);
                            generateFindImg();
                        } else {
                            openModal("lose-modal");
                            generateCells();
                        }
                        if (correctImageCount === 10) {
                            openModal("win-modal");
                            generateCells();
                        }
                    }
                });
            gameArea.append(cell);
        }
    }
    generateFindImg();
}

const generateFindImg = () => {
    let imgName = '';
    while (true) {
        let randomVariant = Math.floor(Math.random() * listOfName.length);
        imgName = listOfName[randomVariant];
        if (!listOfDraggableImg.includes(imgName)) {
            break;
        }
    }

    listOfDraggableImg.push(imgName);

    $(".draggable").remove();
    const img = $(`<img src="./img/${imgName}.png" alt="Draggable" class="draggable"/>`);
    img.draggable();
    generateImgArea.append(img);
}
