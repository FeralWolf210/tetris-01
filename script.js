document.addEventListener("DOMContentLoaded", () => {
  let squares = Array.from(document.querySelectorAll(".tetris-left div"));
  let width = 10;
  // today
  let nextRandom = 0;

  // j Block and Rotation
  let jBlock = [
    [1, 2, width + 1, width * 2 + 1], //-> 1, 2, 11, 21
    [width, width + 1, width + 2, width * 2 + 2], //-> 10, 11, 12, 22
    [1, width + 1, width * 2, width * 2 + 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  // z Block and Rotation
  let zBlock = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
  ];

  // t Block and Rotation
  let tBlock = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  // s Block and Rotation
  let sBlock = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  // i Block and Rotation
  let iBlock = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  // Put the 5 variable on the top with 1 variables (theTetromnioes)
  let theTetrominoes = [jBlock, zBlock, tBlock, sBlock, iBlock];

  console.log(theTetrominoes[4][0]);

  // Here's how to show shape with color from what we makes on the top (array)
  let startPosition = 4;
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theTetrominoes.length);

  let current = theTetrominoes[random][currentRotation];

  function draw() {
    current.forEach((index) => {
      squares[startPosition + index].classList.add("tetromino-color");
    });
  }

  // How To Remove The class
  function unDraw() {
    current.forEach((index) => {
      squares[startPosition + index].classList.remove("tetromino-color");
    });
  }

  // TODAY :
  // Lebih banyak ke logic tentang bagaimana menyelesaikan masalah dengan step step kecil

  // Make Move Down every second
  timerId = setInterval(moveDown, 1000);

  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keyup", control);
  // today -> https://www.toptal.com/developers/keycode

  function moveDown() {
    unDraw();
    startPosition += width;
    draw();
    freeze();
  }

  // freeze function
  function freeze() {
    // ?. bagaimana cara membuat tetris ini jadi berhenti saat sudah mencapai garis akhir

    // jika salah satu bentuk tetris yang indexnya di kotak dengan ketentuan "a,b,c" mengandung kelas taken
    if (
      current.some((index) =>
        squares[startPosition + index + width].classList.contains("taken")
      )
    ) {
      // maka forEach (setiap) tetris blok diset dengan kelas taken
      current.forEach((index) =>
        squares[startPosition + index].classList.add("taken")
      );

      // random = nextRandom; // today
      // nextRandom = Math.floor(Math.random() * theTetrominoes.length); // today

      // ?. Bagaimana cara membuat si tetris nya respawn ke bawah
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      startPosition = 4;
      draw();
      // displayShape();
    }
  }

  //freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[startPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[startPosition + index].classList.add("taken")
      );
      //start a new tetromino falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      startPosition = 4;
      draw();
      displayShape();
    }
  }

  // today 17
  // Ngecek kalau misalkan posisinya dari index di foto bukan ujung kiri maka disetting bisa geser kiri
  function moveLeft() {
    unDraw();
    // check if tetris is at the edge | kalau hasil baginya sisa 0 maka true
    const isAtLeftEdge = current.some(
      (index) => (startPosition + index) % width === 0
    );

    // kalau posisinya ga di pojok ujung kiri/kanan (widht ke 10 dikiri, maka posisinya kurangin 1 )
    if (!isAtLeftEdge) startPosition -= 1;

    // coba tanya ke mereka kenapa ada ini \\
    // kalau bentuk L keliatan jelas lewat dari garis
    if (
      current.some((index) =>
        squares[startPosition + index].classList.contains("taken")
      )
    ) {
      startPosition += 1;
    }
    draw();
  }

  // Ngecek kalau misalkan posisinya dari index di foto bukan ujung kanan maka disetting bisa geser kanan
  function moveRight() {
    console.log(startPosition);
    unDraw();
    const isAtRightEdge = current.some(
      (index) => (startPosition + index) % width === width - 1
    );
    if (!isAtRightEdge) startPosition += 1;

    // coba tanya ke mereka kenapa ada ini \\

    if (
      current.some((index) =>
        squares[startPosition + index].classList.contains("taken")
      )
    ) {
      startPosition -= 1;
    }
    draw();
  }

  function rotate() {
    unDraw();
    // how to get #1 position after increment +1
    currentRotation++;
    // kalau jumlah currentRotation === 4 set to 0 again
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  // show up mini grid in tetris-right display
  const displaySquares = document.querySelectorAll(".tetris-right div");
  const displayWidth = 4;
  const displayIndex = 0;

  // theTetromioes without rotations
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  ];

  // display the shape in tetris-right display
  function displayShape() {
    // remove any trace of a tetromino form the entire grid
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino-color");
    });

    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino-color");
    });
  }
});
