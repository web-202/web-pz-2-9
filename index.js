const gameArea = document.getElementById('gameArea');
const draggableElement = document.getElementById("draggable-element");

let listOfName = [];
let offsetX, offsetY, isDragging = false;

draggableElement.addEventListener("mousedown", startDragging);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDragging);

$("#screen2").hide();

$("#goToScreen2withScreen1").click(function () {
  $("#screen1").hide();
  $("#screen2").show();
});

$("#goToScreen1withScreen2").click(function () {
  $("#screen2").hide();
  $("#screen1").show();
});

const generateCells = () => {
  listOfName = []

  while (gameArea.firstChild) {
    gameArea.removeChild(gameArea.firstChild);
  }

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const img = document.createElement('img');
      let imgName = '';

      while (true) {
        let randomVariant = Math.floor(Math.random() * 3) + 1;
        let typeImg = '';

        if (randomVariant === 1)  typeImg = 'tank';
        if (randomVariant === 2)  typeImg = 'gun';
        if (randomVariant === 3)  typeImg = 'equipment';

        randomVariant = Math.floor(Math.random() * 13) + 1;
        imgName = `${typeImg+randomVariant}`;

        if (!listOfName.includes(imgName)){
          break;
        }
      }

      listOfName.push(imgName)
      img.src = `./img/${imgName}.jpg`;
      img.classList.add("cell-img")

      cell.appendChild(img);
      gameArea.appendChild(cell);
    }
  }
  console.log(listOfName)
}




function startDragging(e) {
  isDragging = true;
  offsetX = e.clientX - draggableElement.getBoundingClientRect().left;
  offsetY = e.clientY - draggableElement.getBoundingClientRect().top;
  draggableElement.style.cursor = "grabbing";

  draggableElement.ondragstart = function() {
    return false;
  };
}

function drag(e) {
  if (!isDragging) return;

  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;

  draggableElement.style.left = `${x}px`;
  draggableElement.style.top = `${y}px`;
}

function stopDragging() {
  isDragging = false;
  draggableElement.style.cursor = "grab";

  draggableElement.ondragstart = null;
}

