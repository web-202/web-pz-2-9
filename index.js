const kvadrat = document.getElementById('kvadrat');
const imgtable = document.getElementById("imgtable");
const counts = document.getElementById("counts");
const body = document.getElementById("body");

let imageNames = [];
let draggableImages = [];
let correctImageCount = 0;

$("#screen2").hide();

$("#perehidz2v1").click(function () {
  $("#screen1").hide();
  $("#screen2").show();
  body.style.background = 'lavender';
  createGameBoard();
});

const createGameBoard = () => {
  imageNames = [];
  correctImageCount = 0;
  counts.textContent = correctImageCount;

  while (kvadrat.firstChild) {
    kvadrat.removeChild(kvadrat.firstChild);
  }

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      let imgSrc = '';
      while (true) {
        let randomVariant = Math.floor(Math.random() * 3) + 1;
        let typeImg = '';
        if (randomVariant === 1) typeImg = 'gun';
        if (randomVariant === 2) typeImg = 'tank';
        if (randomVariant === 3) typeImg = 'babah';
        randomVariant = Math.floor(Math.random() * 10) + 1;
        imgSrc = `${typeImg + randomVariant}`;
        if (!imageNames.includes(imgSrc)) {
          break;
        }
      }
      imageNames.push(imgSrc);
      const cell = $(`<img class="cell" src="./img/${imgSrc}.jpg" alt="img"/>`)
        .droppable({
          drop: function (event, ui) {
            imgSrc = `./img/${imgSrc}.jpg`;
            const draggedImage = ui.draggable;
            const draggedSrc = draggedImage.attr("src");
            if (draggedSrc === imgSrc) {
              correctImageCount++;
              counts.textContent = correctImageCount;
              generateFindImg();
            } else {
              alert("Не вірний вибір!!");
              createGameBoard();
            }
            if (correctImageCount === 10) {
              alert("Вітаю ви виграли");
              createGameBoard();
            }
          }
        });
      kvadrat.append(cell[0]);
    }
  }
  console.log(imageNames);
  generateFindImg();
}

const generateFindImg = () => {
  let imgName = '';
  while (true) {
    let randomVariant = Math.floor(Math.random() * imageNames.length) + 1;
    imgName = imageNames[randomVariant - 1];
    if (!draggableImages.includes(imgName)) {
      break;
    }
  }
  draggableImages .push(imgName);
  $(".draggable").remove();
  const img = $(`<img src="./img/${imgName}.jpg" alt="img" class="draggable"/>`);
  img.draggable();
  imgtable.append(img[0]);
}







  
  