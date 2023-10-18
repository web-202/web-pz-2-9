$(document).ready(function () {
  initializeGame();
});

let picture;
let playCards;
let score;

function initializeGame() {
score = 0;
picture = createImageArray();
playCards = [...picture];
shuffleArray(playCards);
renderPage(picture);
renderPicture(playCards.pop());
}

function renderPicture(image) {
  $("#picture").remove();
  $(".dashboard-selector").prepend($(`<div id="picture" class="cell"></div>`));
  $("#picture").append(`<img src='img/${image}'>`);
  $("#picture").draggable();
}

function renderPage(arr) {
  const container = $(".dashboard");
  container.empty();

  for (let i = 0; i < 25; i++) {
    container.append(putGame(arr[i]));
  }
}

function putGame(image) {
  const imagePath = "img/" + image;
  const $cell = $("<div class='cell'><img src='" + imagePath + "' /></div>");

  $cell.droppable({
    drop: function (e, ui) {
      const droppedImageSrc = ui.helper.find("img").attr("src");
      if (droppedImageSrc.includes(imagePath)) {
        score++;
      } else {
          msgeShow(`Нажаль, ви програли:(`);
        initializeGame();
        return;
      }

      if (score === 10) {
          msgeShow(`Вітаю! Ви виграли!`);
      }

      renderPicture(playCards.pop());
    }
  });

  $cell.on("dragover", function (e) {
    e.preventDefault();
  });

  $cell.on("dragenter", function (e) {
    e.preventDefault();
  });

  return $cell;
}


function msgeShow(message) {
  $("#msg").text(message).dialog();
}

function createImageArray() {
  const arr = [];
  for (let i = 1; i < 26; i++) {
    arr.push("imge" + i + ".jpg");
  }

  shuffleArray(arr);

  return arr;
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}


  
  