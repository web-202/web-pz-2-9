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

const openModal = (modalId, callback) => {
    $(`#${modalId}`).dialog({
        autoOpen: true,
        modal: true,

    });
}

const closeModal = (modalId) => {
    $(`#${modalId}`).dialog("close");
}

$("#close-win-modal, #close-win-button").click(() => closeModal("win-modal"));
$("#close-lose-modal, #close-lose-button").click(() => closeModal("lose-modal"));
const generateCells = () => {
    listOfName = [];
    correctImageCount = 0;
    countAnswers.text(correctImageCount);

    gameArea.empty();

    const imgNames = [
        "P1", "P2", "P3", "P4", "P5",
        "P6", "P7", "P8", "P9", "P10",
        "P11", "P12", "P13", "P14", "P15",
        "P16", "P17", "P18", "P19", "P20",
        "P21", "P22", "P23", "P24", "P25"
    ];

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            let imgSrc = '';
            while (true) {
                const randomIndex = Math.floor(Math.random() * imgNames.length);
                imgSrc = imgNames[randomIndex];
    
                if (!listOfName.includes(imgSrc)) {
                    break;
                }
            }
    
            listOfName.push(imgSrc);
    
            const cell = $(`<img class="cell" src="../img/${imgSrc}.jpg" alt="img"/>`)
                .droppable({
                    drop: function (event, ui) {
                        imgSrc = `../img/${imgSrc}.jpg`;
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
    const img = $(`<img src="../img/${imgName}.jpg" alt="Draggable" class="draggable"/>`);
    img.draggable();
    generateImgArea.append(img);
}