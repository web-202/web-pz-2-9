$(document).ready(function () {
    const $gameBoard = $("#game-board");
    const $imageContainer = $("#image-container");
    const $resetButton = $("#reset-game");
    const gameImages = [];
    let currentImageIndex = 0;

    const imageOrder = [...Array(25).keys()];
    shuffleArray(imageOrder);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const uniqueRandomImages = new Set();
    while (uniqueRandomImages.size < 10) {
        uniqueRandomImages.add(Math.floor(Math.random() * 25));
    }

    uniqueRandomImages.forEach((randomIndex) => {
        const $draggableImage = $("<img>");
        $draggableImage.attr("src", `images/image_${imageOrder[randomIndex]}.png`);
        $draggableImage.addClass("image");
        $draggableImage.attr("draggable", true);
        $draggableImage.on("dragstart", dragStart);
        $imageContainer.append($draggableImage);
        gameImages.push($draggableImage.attr("src"));
    });

    for (let i = 0; i < 25; i++) {
        const imageIndex = imageOrder[i];
        const $image = $("<img>");
        $image.attr("src", `images/image_${imageIndex}.png`);
        $image.attr("draggable", false);
        $gameBoard.append($image);
        $image.on("dragover", dragOver);
        $image.on("dragenter", dragEnter);
        $image.on("dragleave", dragLeave);
        $image.on("drop", drop);
    }

    $resetButton.on("click", function () {
        resetGame();
    });

    function dragStart(event) {
        event.originalEvent.dataTransfer.setData("text/plain", $(this).attr("src"));
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragEnter(event) {
        event.preventDefault();
        $gameBoard.addClass("hovered");
    }

    function dragLeave(event) {
        $gameBoard.removeClass("hovered");
    }

    function drop(event) {
        event.preventDefault();
        $gameBoard.removeClass("hovered");
        const draggedImageSrc = event.originalEvent.dataTransfer.getData("text/plain");
        const $cell = $(this);

        if ($cell.is("img")) {
            const cellSrc = $cell.attr("src");

            if (gameImages.includes(draggedImageSrc) && draggedImageSrc === cellSrc) {
                alert("Спіставленно правильно");
                gameImages.splice(gameImages.indexOf(draggedImageSrc), 1);
                currentImageIndex++;

                $cell.attr("src", "");
                $cell.css("background-color", "lightgray");

                $(".image").each(function () {
                    if ($(this).attr("src") === draggedImageSrc) {
                        $(this).remove();
                    }
                });

                if (currentImageIndex === 10) {
                    alert("Вітаю, ви перемогли!");
                }
            } else {
                alert("Не правильно співставили");
            }
        }
    }

    function resetGame() {
        $gameBoard.empty();
        $imageContainer.empty();
        gameImages.length = 0;
        currentImageIndex = 0;

        imageOrder.sort(() => Math.random() - 0.5);

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * 25);
            const $draggableImage = $("<img>");
            $draggableImage.attr("src", `images/image_${imageOrder[randomIndex]}.png`);
            $draggableImage.addClass("image");
            $draggableImage.attr("draggable", true);
            $draggableImage.on("dragstart", dragStart);
            $imageContainer.append($draggableImage);
            gameImages.push($draggableImage.attr("src"));
        }

        for (let i = 0; i < 25; i++) {
            const imageIndex = imageOrder[i];
            const $image = $("<img>");
            $image.attr("src", `images/image_${imageIndex}.png`);
            $image.attr("draggable", false);
            $gameBoard.append($image);
            $image.on("dragover", dragOver);
            $image.on("dragenter", dragEnter);
            $image.on("dragleave", dragLeave);
            $image.on("drop", drop);
        }
    }
});
