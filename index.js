$(document).ready(function () {
    const container = $("<container></container>");

    const startContainer = $("<div class='start-container'></div>");
    startContainer.append("<h1 class='p-4'>Моя друга гра</h1>");
    startContainer.append("<button id='start-game'>Почати гру</button>");

    const pictContainer = $("<div class='pict-container' style='display: none;'></div>");

    const insertContainer = $("<div class='insert-container' style='display: none;'></div>");
    insertContainer.append("<button id='start-again'>Почати з початку</button>");

    container.append(startContainer);
    container.append(pictContainer);
    container.append(insertContainer);
    generateImages();
    $(window).on('load', function () {
        makeImagesDraggable();
    });

    $('body').append(container);

    $("#start-game").click(function () {
        $(".start-container").hide();
        $(".pict-container").css('display', 'grid');
        $(".insert-container").css('display', 'flex');
    });

    $("#start-again").click(function () {
        pictContainer.empty();
        insertContainer.find('img').remove();
        generateImages();
        makeImagesDraggable();
    });


    function showMessage(message) {
        var messageDiv = $("<div id='message'></div>");
        messageDiv.text(message);
        messageDiv.css({
            "position": "fixed",
            "top": "50%",
            "left": "50%",
            "width": "50%",
            "background-color": 'black',
            "color": 'orange',
            "font-size": "2em",
            "font-weight": "bold",
            "text-align": "center",
            "padding": "2%",
            "transform": "translate(-50%, -50%)",
            "margin": "auto"
        });

        $("container").append(messageDiv);

        setTimeout(function () {
            messageDiv.remove();
        }, 1000);
    }

    function generateImages() {
        var path = 'img/tanks/tank';
        const randomTheme = getRandomNumber(1, 4);
        switch (randomTheme) {
            case 1:
                path = 'img/computer appliance/appliance';
                break;
            case 2:
                path = 'img/gun/gun';
                break;
            case 3:
                path = 'img/tanks/tank';
                break;
            default:
                path = 'img/tanks/tank';
                break;
        }
        const randomToFind = getRandomNumber(1, 25);
        var pictureToFind = 4;
        var flag = false;
        const generatedNumbers = [];

        for (let i = 1; i <= 25; i++) {
            var pictureNum = getRandomNumber(1, 50);
            while (generatedNumbers.includes(pictureNum)) {
                pictureNum = getRandomNumber(1, 50);
            }
            generatedNumbers.push(pictureNum);

            if (flag === false && i === randomToFind) {
                pictureToFind = pictureNum;
                flag = true;
            }
            pictContainer.append(`<img src="${path} (${pictureNum}).jpg" alt="Image ${pictureNum}">`);
        }
        insertContainer.append(`<img src='${path} (${pictureToFind}).jpg' alt='Image ${pictureToFind}'>`);

    }

    function makeImagesDraggable() {
        $(".pict-container>img").draggable({
            helper: function (event) {
                var originalElement = $(event.target);
                var clonedElement = originalElement.clone();


                clonedElement.css({
                    'width': 8 + 'vw',
                    'height': 14 + 'vh',

                });

                $('body').append(clonedElement);

                return clonedElement;
            },
        });

        let draggedElement = null;

        $('.pict-container>img').bind('dragstart', function (event) {
            draggedElement = $(this);
        });

        $('.pict-container>img').on('dragstop', function (event, ui) {
            const dropTarget = $('.insert-container>img')[0];
            const dropTargetSrc = $('.insert-container>img').attr("src");

            const dropTargetRect = dropTarget.getBoundingClientRect();
            const draggedRight = ui.position.left + draggedElement.width();
            const draggedBottom = ui.position.top + draggedElement.height();



            if (dropTarget && dropTargetSrc === draggedElement.attr('src') &&
                ui.position.left < dropTargetRect.right &&
                draggedRight > dropTargetRect.left &&
                ui.position.top < dropTargetRect.bottom &&
                draggedBottom > dropTargetRect.top
            ) {
                showMessage('Вірно!');
                $("#start-again").trigger('click');


            } else {
                showMessage('Спробуйте ще раз');
                
            }

            draggedElement = null;
        });

    }
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});
