import axios from 'axios';
import './bootstrap';


import $ from 'jquery'
window.$ = window.jQuery = $;

$(document).ready(function () {
    const $messageEl = $("#message");
    const $resetButton = $("#reset");
    const $boardEl = $(".board");

    const boardSize = 10;
    const winCondition = 5;
    let board = [];
    let currentPlayer = 'X';
    let gameOver = false;
    let firstPlayer = null

    Echo.join('start-game')
        .listen('HandleMoveEvent', function (event) {
            console.log(userSignIn, event.userReceived.id);

            if (userSignIn == event.userReceived.id) {
                if (firstPlayer == null && currentPlayer == "X") {
                    firstPlayer = event.userSend.id
                }
                updateBoard(event.row, event.col, event.currentPlayer)
            }
        })

    // Cập nhật giao diện user 2
    function updateBoard(row, col, player) {
        board[row][col] = player;

        const $cell = $boardEl.find(`[data-row="${row}"][data-col="${col}"]`);
        $cell.text(player);
        $cell.css("color", player === "X" ? "red" : "blue");

        currentPlayer = player

        if (checkWin(row, col)) {
            $messageEl.text(`Người chơi ${currentPlayer} thắng trò chơi!`);
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        $messageEl.text(`Lượt của người chơi ${currentPlayer}`);
    }


    function initBoard() {
        board = [];
        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                board[i][j] = null; // Gán giá trị ban đầu là null
            }
        }
    }

    function createBoard() {
        $boardEl.empty();
        $boardEl.css({
            display: "grid",
            gridTemplateColumns: `repeat(${boardSize}, 40px)`,
            gridGap: "1px",
        });

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const $cell = $("<div>")
                    .attr("data-row", i)
                    .attr("data-col", j)
                    .css({
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        border: "1px solid #ddd",
                    })
                    .click(function () {
                        const row = parseInt($(this).attr("data-row"));
                        const col = parseInt($(this).attr("data-col"));
                        handleMove(row, col);
                    });
                $boardEl.append($cell);
            }
        }
    }

    function handleMove(row, col) {
        if (firstPlayer == null) {
            firstPlayer = userSignIn
        }
        if (
            (userSignIn !== firstPlayer && currentPlayer === "X") ||
            (userSignIn == firstPlayer && currentPlayer === "O")
        ) {
            return
        }


        if (board[row][col] !== null || gameOver) return;

        board[row][col] = currentPlayer;

        const $cell = $boardEl.find(`[data-row="${row}"][data-col="${col}"]`);
        $cell.text(currentPlayer);
        $cell.css("color", currentPlayer === "X" ? "red" : "blue");


        axios.post('/move', {
            row: row,
            col: col,
            currentPlayer: currentPlayer,
            gameOver: gameOver,
            userSendId: userSignIn,
            userReceivedId: userSignIn == userReceived ? userSend : userReceived
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(`Lỗi call API ${error}`)
            })

        if (checkWin(row, col)) {
            $messageEl.text(`Người chơi ${currentPlayer} thắng trò chơi!`);
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        $messageEl.text(`Lượt của người chơi ${currentPlayer}`);
    }

    function checkWin(row, col) {
        const directions = [
            { rowDir: 1, colDir: 0 },  // Dọc
            { rowDir: 0, colDir: 1 },  // Ngang
            { rowDir: 1, colDir: 1 },  // Chéo \
            { rowDir: 1, colDir: -1 }  // Chéo /
        ];

        for (let { rowDir, colDir } of directions) {
            const cells = getWinningCells(row, col, rowDir, colDir);
            if (cells.length >= winCondition) {
                highlightWin(cells);
                return true;
            }
        }

        return false;
    }

    function getWinningCells(row, col, rowDir, colDir) {
        const cells = [{ row, col }];

        for (let i = 1; i < winCondition; i++) {
            if (board[row + i * rowDir]?.[col + i * colDir] === currentPlayer) {
                cells.push({ row: row + i * rowDir, col: col + i * colDir });
            } else break;
        }

        for (let i = 1; i < winCondition; i++) {
            if (board[row - i * rowDir]?.[col - i * colDir] === currentPlayer) {
                cells.push({ row: row - i * rowDir, col: col - i * colDir });
            } else break;
        }

        return cells;
    }

    function highlightWin(cells) {
        cells.forEach(({ row, col }) => {
            $boardEl.find(`[data-row="${row}"][data-col="${col}"]`)
                .css("backgroundColor", "lightgreen");
        });
    }

    function resetGame() {
        initBoard();
        currentPlayer = "X";
        gameOver = false;
        $messageEl.text(`Lượt của người chơi ${currentPlayer}`);
        createBoard();
    }

    initBoard();
    createBoard();
    $resetButton.click(resetGame);
});
