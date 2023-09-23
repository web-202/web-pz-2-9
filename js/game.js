$(document).ready(function () {
  const boardDiv = $(".board")
  const restartButton = $(".restart-button")
  const gameDiv = $(".game")

  let correctAnswers = 0
  const sizes = {
    rows: 5,
    cols: 5
  };
  const imagesConfig = [
    {
      path: "../img/equipment/",
      name: "me-",
      length: 9,
      type: ".jpg"
    },
    {
      path: "../img/tanks/",
      name: "tank-",
      length: 9,
      type: ".jpg"
    },
    {
      path: "../img/weapons/",
      name: "weapon-",
      length: 9,
      type: ".png"
    }
  ]
  let gameImages = []
  let playerShuffledSeqArr = []

  restartButton.on("click", restartGame)

  setUpBoard();

  function setUpBoard() {
    let shuffleArr = shuffleSeqArr(generateSeqArr(), true)
    for (let i = 0; i < sizes.rows * sizes.cols; i++) {
      boardDiv.append(createCell(shuffleArr.next().value))
    }
  }

  function createCell(src) {
    return $(`<div class="cell"><img src="${src}" alt="${src}" class="cell-image"></div>`)
      .droppable({
        drop: function (event, ui) {
          const draggedImage = ui.draggable;
          const draggedSrc = draggedImage.attr("src");

          if (draggedSrc === src) {
            correctAnswers++
            createDraggableImage()
          } else {
            showDialog("Кінець", "Не вірний вибір")
            stopGame()
            return
          }

          if (correctAnswers === 5) {
            showDialog("Перемога", "")
            stopGame()
          }
        }
      })
  }

  function generateSeqArr() {
    const arr = []

    imagesConfig.forEach(x => {
      for (let i = 0; i < x.length; i++) {
        arr.push(x.path + x.name + (i + 1) + x.type)
      }
    })

    return arr
  }

  function* shuffleSeqArr(array, isAddToGameImages) {
    const copyArray = [...array];

    while (copyArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * copyArray.length);
      const randomElement = copyArray.splice(randomIndex, 1)[0];

      if (isAddToGameImages) {
        gameImages.push(randomElement)
      }
      yield randomElement;
    }
  }

  function restartGame() {
    stopGame()
    createDraggableImage()
  }

  function createDraggableImage() {
    $(".game-image").remove()
    gameDiv.append(`<img id="draggable" class="game-image" src="${playerShuffledSeqArr.next().value}" alt="game-image">`)
    $("#draggable").draggable();
  }

  function stopGame() {
    $(".game-image").remove()
    correctAnswers = 0
    gameImages = []
    boardDiv.empty()
    setUpBoard()
    playerShuffledSeqArr = shuffleSeqArr(gameImages)
  }

  function showDialog(title, text) {
    $("#dialog").text(text).attr("title", title).dialog({
      resizable: false,
      modal: true
    })
  }

  stopGame()
})
