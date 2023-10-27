const images = [
  {directoryName: "equipments", fileName: "equipment", count: 20},
  {directoryName: "vehicles", fileName: "vehicle", count: 50},
  {directoryName: "weapons", fileName: "weapon", count: 14},
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let gameArray = []

$(() => {

  $("#start-again").click(()=>{
    createGame()
  })

  const createGame = () => {
    const container = $(".game-container")
    container.empty()

    const score = $("#score-span")
    score.text(0)

    gameArray = genRandomArray()
    let targetImage = gameArray[getRandomInt(0, gameArray.length - 1)];

    gameArray.forEach(item => {
      const cell = $("<div class='cell'></div>")

      if (item === targetImage) {
        cell.append($(`<img class="img-cell" id="target-cell" src="${item}" alt=''>`))
      } else {
        cell.append($(`<img class="img-cell" src="${item}" alt=''>`))
      }

      cell.droppable({
          accept: ".draggable-cell",
          drop: function (event, ui) {
            const droppedImageSrc = $(ui.helper).find("img").attr("src");
            if (item === targetImage) {
              score.text((Number(score.text())) + 1)
              targetImage = gameArray[getRandomInt(0, gameArray.length - 1)]
              changeTargetCell(targetImage)
            } else {
                $( "#dialog" ).dialog();
            }
          },
        }
      )
      container.append(cell)
    })

    changeTargetCell(targetImage)

  }

  const changeTargetCell = (target) => {
    const draggableCell = $(".draggable-cell");
    draggableCell.empty()
    draggableCell.append(`<img class="img-cell" src="${target}" />`);
    draggableCell.draggable({
      start: function (event, ui) {
        initialPosition = ui.helper.position();
      },
      revert: function () {
        return true;
      }
    });
  }

  const genRandomArray = () => {
    const result = [];
    for (let i = 0; i < 25; i++) {
      const category = getRandomInt(0, 2)
      const imgId = getRandomInt(1, (images[category].count))
      result.push(`../assets/${images[category].directoryName}/${images[category].fileName}_${imgId}.png`)
    }
    return result
  }

  createGame()

})
