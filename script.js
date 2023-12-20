document.addEventListener("DOMContentLoaded", () => {
    const square = Array.from(document.querySelectorAll(".tetris-left div"));
    const width = 10;

    // j Block and Rotation
    const jBlock = [
        [1, 2, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2, width * 2 + 1],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ];

    // s Block and Rotation
    const sBlock = [
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
    ];

    // t Block and Rotation
    const tBlock = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1],
    ];

    // block Block and Rotation
    const blockBlock = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ];

    // i Block and Rotation
    const iBlock = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ];

    // Put the 5 variable on the top with 1 variables (theTetromnioes)
    const theTetrominoes = [jBlock, sBlock, tBlock, blockBlock, iBlock];

    // Here's how to show shape with color from what we made on top (array)
    const startPos = 4;
    const currentRotation = 0;
    const random = Math.floor(Math.random() * theTetrominoes.length);

    const current = theTetrominoes[random][currentRotation];
    // Variable di atas ini, current, diisi dengan variable "theTetrominoes" yang berisi rotation setiap block. Cara menggunakan variable ini: Slot array pertama menentukan block type dan slot array kedua menentukan rotasi dari block yang ditentukan oleh slot array pertama.

    function draw() {
        current.forEach((index) => {
            square[startPos + index].classList.add("tetromino-color");
        });
    }
    draw();

    // How to remove the class
    function unDraw() {
        current.forEach((index) => {
            square[startPos + index].classList.remove("tetromino-color");
        });
    }
    unDraw();
});
