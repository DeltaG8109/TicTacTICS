

// ===============================
// VARIABLES DEL JUEGO
// ===============================

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];


let turn = 0;
// 0 = Jugador 1 (O)
// 1 = Jugador 2 (X)


let gameOver = false;


// ===============================
// INICIAR JUEGO
// ===============================

startGame();


function startGame() {

  renderBoard();

  turn = Math.random() < 0.5 ? 0 : 1;

  renderPlayer();


  if (turn === 0) {

    playerPlays();

  } else {

    computerPlay();

  }

}



// ===============================
// MOSTRAR TABLERO
// ===============================


function renderBoard() {

  const boardHTML = board.map((row, rowIndex) => {

    return `
            <div class="row">
                ${row.map((cell, columnIndex) =>`

                    <button 
                    class="cell"
                    data-row="${rowIndex}"
                    data-column="${columnIndex}">
                    ${cell}
                    </button>

                `).join("")}
            </div>
        `;

  });


  document.querySelector("#board").innerHTML =
    boardHTML.join("");


}



// ===============================
// MOSTRAR TURNO
// ===============================


function renderPlayer() {

  const player =
    document.querySelector("#player");


  if (gameOver) {

    player.textContent = "Partida finalizada";

    return;

  }


  player.textContent =
    turn === 0
      ? "Turno: Jugador 1 (O)"
      : "Turno: Jugador 2 (X)";

}



// ===============================
// TURNO JUGADOR
// ===============================


function playerPlays() {


  document.querySelectorAll(".cell")
    .forEach(cell => {


      cell.addEventListener("click", () => {


        if (gameOver) return;


        const row =
          cell.dataset.row;


        const column =
          cell.dataset.column;



        // evita repetir casilla

        if (board[row][column] !== "") {

          return;

        }



        board[row][column] = "O";


        updateCell(cell, "O");



        let winner = checkWinner();


        if (winner) {

          finishGame(winner);

          return;

        }



        if (checkDraw()) {

          finishGame("draw");

          return;

        }



        turn = 1;

        renderPlayer();



        setTimeout(() => {

          computerPlay();

        }, 500);



      });


    });


}



// ===============================
// JUGADA COMPUTADORA
// ===============================


function computerPlay() {


  if (gameOver) return;



  let empty = [];



  for (let row = 0; row < 3; row++) {

    for (let col = 0; col < 3; col++) {


      if (board[row][col] === "") {

        empty.push({
          row,
          col
        });

      }

    }

  }



  if (empty.length === 0) {

    finishGame("draw");

    return;

  }



  let move =
    empty[Math.floor(Math.random() * empty.length)];



  board[move.row][move.col] = "X";



  renderBoard();



  const button =
    document.querySelector(
      `[data-row="${move.row}"][data-column="${move.col}"]`
    );


  button.classList.add("anim");



  let winner = checkWinner();



  if (winner) {

    finishGame(winner);

    return;

  }



  if (checkDraw()) {

    finishGame("draw");

    return;

  }



  turn = 0;

  renderPlayer();


  playerPlays();

}



// ===============================
// ACTUALIZAR CASILLA
// ===============================


function updateCell(cell, value) {

  cell.textContent = value;

  cell.classList.add("anim");


  if (value === "O") {

    cell.style.color = "#2563eb";

  }


  if (value === "X") {

    cell.style.color = "#ef4444";

  }

}



// ===============================
// VALIDAR GANADOR
// ===============================


function checkWinner() {


  const combinations = [

    [0, 0, 0, 1, 0, 2],
    [1, 0, 1, 1, 1, 2],
    [2, 0, 2, 1, 2, 2],

    [0, 0, 1, 0, 2, 0],
    [0, 1, 1, 1, 2, 1],
    [0, 2, 1, 2, 2, 2],

    [0, 0, 1, 1, 2, 2],
    [0, 2, 1, 1, 2, 0]

  ];



  for (let combo of combinations) {


    let a =
      board[combo[0]][combo[1]];


    let b =
      board[combo[2]][combo[3]];


    let c =
      board[combo[4]][combo[5]];



    if (a !== "" && a === b && b === c) {

      return a;

    }

  }


  return null;

}



// ===============================
// EMPATE
// ===============================


function checkDraw() {


  return board.every(row =>

    row.every(cell =>

      cell !== ""

    )

  );

}



// ===============================
// FINALIZAR PARTIDA
// ===============================


function finishGame(result) {


  gameOver = true;



  const message =
    document.querySelector("#message");



  if (result === "O") {

    message.textContent =
      "🏆 Ganador: Jugador 1 (O)";

  }


  else if (result === "X") {


    message.textContent =
      "🏆 Ganador: Jugador 2 (X)";

  }


  else {


    message.textContent =
      "🤝 Empate";

  }



  renderPlayer();


}



// ===============================
// REINICIAR
// ===============================


document
  .querySelector("#restart")
  .addEventListener("click", () => {


    board = [

      ["", "", ""],

      ["", "", ""],

      ["", "", ""]

    ];



    gameOver = false;



    document
      .querySelector("#message")
      .textContent = "";



    startGame();



  });