const body = $("#body");
const screen1 = $("#screen1");
const screen2 = $("#screen2");

let listOfName = [];
let listOfDraggableImg = [];
let correctImageCount = 0;

screen2.hide();

$("#startButton").click(function () {
  screen1.hide();
  screen2.show();
  generateCells();
});

$("#back").click(function () {
  screen2.hide();
  screen1.show();
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
  $("#card").remove();
  const card = $(`<div id="card" class="cell"></div>`);
  card.append(`<img src='screen/${image}'>`);
  $(".right-container").prepend(card);

  card.draggable({
    drag: function (event, ui) {
      checkHover($(this));
    },
  });
}

function checkHover(draggableElement) {
  const draggableImg = draggableElement.find('img');

  $('.cell').each(function () {
    const currentImg = $(this).find('img');

    if (isHover(draggableImg, currentImg)) {
      $(this).addClass('hovered');
    } else {
      $(this).removeClass('hovered');
    }
  });
}

function isHover(draggableImg, currentImg) {
  const offset1 = draggableImg.offset();
  const width1 = draggableImg.width();
  const height1 = draggableImg.height();
  const offset2 = currentImg.offset();
  const width2 = currentImg.width();
  const height2 = currentImg.height();

  return !(
    offset2.left > offset1.left + width1 ||
    offset2.left + width2 < offset1.left ||
    offset2.top > offset1.top + height1 ||
    offset2.top + height2 < offset1.top
  );
}

function containContainer(arr) {
  const container = $(".container")
  container.empty()

  for (let i = 0; i < 25; i++) {
    container.append(createCell(arr[i]))
  }
}

function createCell(image) {
  const imgPath = "screen/" + image;
  const cell = $(`<div class='cell'><img src='${imgPath}' /></div>`);

  cell.hover(
    function () {
      $(this).addClass("hovered");
    },
    function () {
      $(this).removeClass("hovered");
    }
  );

  return cell.droppable({
    drop: function (e, ui) {
      const draggedImageSrc = ui.draggable.find("img").attr("src");

      if (draggedImageSrc === imgPath) {
        replaceWithGreySquare($(this));
        count++;
      } else {
        $("#dialog").text(`Ви програли`);
        $("#dialog").dialog();
        startGame();
        return;
      }

      if (count === 10) {
        $("#dialog").text(`Ви виграли`);
        $("#dialog").dialog();
        return;
      }

      setCard(playCards.pop());
    },
  });
}

function replaceWithGreySquare(cell) {
  const img = cell.find('img');
  img.hide();

  const greySquare = $("<div class='grey-square'></div>");
  cell.append(greySquare);

  greySquare.draggable({
    revert: "invalid",
  });
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


