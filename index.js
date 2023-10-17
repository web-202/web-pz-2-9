$(document).ready(function () {
  startGame()
});
let arrCards;
let playCards;
let count;

function startGame() {
  count = 0
  arrCards = createNewImages()
  playCards = [...arrCards]
  shuffle(playCards)
  containContainer(arrCards)
  setCard(playCards.pop())
}

function setCard(image) {
  $("#card").remove()
  $(".right-container").prepend($(`<div id="card" class="cell"></div>`))
  $("#card").append(`<img src='screen/${image}'>`)
  $("#card").draggable()
}

function containContainer(arr) {
  const container = $(".container")
  container.empty()

  for (let i = 0; i < 25; i++) {
    container.append(createCell(arr[i]))
  }
}

function createCell(image) {
  const imgPath = "screen/" + image
  return $(`<div class='cell'><img src='${imgPath}' /></div>`).droppable({
    drop: function (e, ui) {
      if (ui.draggable.children()[0].src.includes(imgPath)) {
        count++
      } else {
        $("#dialog").text(`Ви програли (${count}/10)`)
        $("#dialog").dialog()
        startGame()
        return;
      }

      if(count === 10) {
        $("#dialog").text(`Ви виграли (${count}/10)`)
        $("#dialog").dialog()
        return
      }

      setCard(playCards.pop())
    }
  })
}


function createNewImages() {
  const arr = []
  for (let i = 1; i < 26; i++) {
    arr.push("screen" + i + ".png")
  }

  shuffle(arr)

  return arr
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
