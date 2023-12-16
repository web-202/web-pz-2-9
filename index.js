const gameArea = document.getElementById("gameArea");
const generateImgArea = document.getElementById("generateImgArea");
const countAnswers = document.getElementById("countAnswers");
const body = document.getElementById("body");

let listOfName = [];
let listOfDraggableImg = [];
let correctImageCount = 0;

$("#screen2").hide();

$("#goToScreen2withScreen1").click(function () {
  $("#screen1").hide();
  $("#screen2").show();
  body.style.background = "gray";
  generateCells();
});

$("#goToScreen1withScreen2").click(function () {
  $("#screen2").hide();
  $("#screen1").show();
  body.style.background = "white";
});

const generateCells = () => {
  listOfName = [];
  correctImageCount = 0;
  countAnswers.textContent = correctImageCount;

  while (gameArea.firstChild) {
    gameArea.removeChild(gameArea.firstChild);
  }

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      let imgSrc = "";

      while (true) {
        let randomVariant = Math.floor(Math.random() * 3) + 1;
        let typeImg = "";

        if (randomVariant === 1) typeImg = "tank";
        if (randomVariant === 2) typeImg = "gun";
        if (randomVariant === 3) typeImg = "equipment";

        randomVariant = Math.floor(Math.random() * 13) + 1;
        imgSrc = `${typeImg + randomVariant}`;

        if (!listOfName.includes(imgSrc)) {
          break;
        }
      }

      listOfName.push(imgSrc);

      const cell = $(
        `<img class="cell" src="./img/${imgSrc}.jpg" alt="img"/>`
      ).droppable({
        drop: function (event, ui) {
          
          imgSrc = `./img/${imgSrc}.jpg`;
          const draggedImage = ui.draggable;
          const draggedSrc = draggedImage.attr("src");

          if (draggedSrc === imgSrc) {
            correctImageCount++;
            countAnswers.textContent = correctImageCount;
            generateFindImg();
          } else {
            alert("Не вірний вибір!!");
            generateCells();
          }
          if (correctImageCount === 10) {
            alert("Вітаю ви виграли");
            generateCells();
          }
          const isColliding = checkCollision(draggedImage, currentImage);

          if (isColliding) {
            // Видаляємо зображення з поля
            $(this).remove();
          }
          $(this).removeClass("transparent-cell"); // При скиданні картинки видаляємо прозорість
        },
        over: function (event, ui) {
          $(this).addClass("highlight-border"); // Додаємо бордер при наведенні на об'єкт
          $(".cell").addClass("transparent-cell"); // Додаємо прозорість всім елементам
          $(this).removeClass("transparent-cell"); // Забираємо прозорість у поточного елемента
        },
        out: function (event, ui) {
          $(this).removeClass("highlight-border"); // Видаляємо бордер при виході з об'єкта
          $(".cell").removeClass("transparent-cell"); // Видаляємо прозорість у всіх елементів
        },
      });
      gameArea.append(cell[0]);
    }
  }
  console.log(listOfName);
  generateFindImg();
};

const checkCollision = (draggedImage, currentImage) => {
  const draggedOffset = draggedImage.offset();
  const currentOffset = currentImage.offset();

  const draggedWidth = draggedImage.width();
  const currentWidth = currentImage.width();

  return (
    draggedOffset.left < currentOffset.left + currentWidth &&
    draggedOffset.left + draggedWidth > currentOffset.left &&
    draggedOffset.top < currentOffset.top + currentWidth &&
    draggedOffset.top + draggedWidth > currentOffset.top
  );
};

const generateFindImg = () => {
  let imgName = "";
  while (true) {
    let randomVariant = Math.floor(Math.random() * listOfName.length) + 1;
    imgName = listOfName[randomVariant - 1];
    if (!listOfDraggableImg.includes(imgName)) {
      break;
    }
  }

  listOfDraggableImg.push(imgName);

  $(".draggable").remove();
  const img = $(
    `<img src="./img/${imgName}.jpg" alt="img" class="draggable"/>`
  );
  img.draggable();
  generateImgArea.append(img[0]);
};
