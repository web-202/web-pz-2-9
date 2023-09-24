const gameArea = document.getElementById('gameArea');
const generateImgArea = document.getElementById("generateImgArea");

let listOfName = [];
let correctImageCount = 0;
let offsetX, offsetY, isDragging = false;
let draggedImage = null; // Змінна для збереження обраного зображення



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
      const cell = document.createElement("img");
      cell.classList.add("cell");

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

      listOfName.push(imgName);

      cell.src = `./img/${imgName}.jpg`;

      gameArea.appendChild(cell);
    }
  }
  console.log(listOfName)
  generateFindImg();
}

const generateFindImg = () => {
  const img = document.createElement('img');
  img.classList.add('draggable');
  img.src = `./img/${listOfName[0]}.jpg`;


  img.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - img.getBoundingClientRect().left;
    offsetY = e.clientY - img.getBoundingClientRect().top;
    img.style.cursor = "grabbing";

    img.ondragstart = function() {
      return false;
    };
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    img.style.cursor = "grab";

    img.ondragstart = null;
  });
  generateImgArea.appendChild(img);
}
