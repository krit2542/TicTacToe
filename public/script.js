document.getElementById('vsAI').addEventListener('click', () => startGame('AI'));
document.getElementById('twoPlayer').addEventListener('click', () => startGame('2P'));
document.getElementById('back').addEventListener('click', () => window.location.href = '/');
document.getElementById('history').addEventListener('click', () => window.location.href = '/history.html');
document.getElementById('addSize').addEventListener('click', increaseBoardSize);

let boardSize = 3;
let board = [];
let currentPlayer = 'X';
let gameMode = '';

function startGame(mode) {
    gameMode = mode;
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('mode').textContent = `Mode: ${mode}`;
    document.getElementById('addSize').classList.toggle('hidden', mode === 'AI');
    createBoard();
}

function createBoard() {
    board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.addEventListener('click', () => handleMove(i, j));
            boardElement.appendChild(cellElement);
        });
    });
}

function handleMove(i, j) {
    if (board[i][j] !== '' || (gameMode === 'AI' && currentPlayer === 'O')) return;
    board[i][j] = currentPlayer;
    renderBoard();
    if (checkWin()) {
        setTimeout(() => {
            alert(`${currentPlayer} wins!`);
            addResultToHistory(`${currentPlayer} wins`);
            resetGame();
        }, 100); 
    } else if (board.flat().every(cell => cell !== '')) {
        setTimeout(() => {
            alert('Draw!');
            addResultToHistory('Draw');
            resetGame();
        }, 100); 
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'AI' && currentPlayer === 'O') {
            setTimeout(handleAIMove, 500); 
        }
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;
        cell.textContent = board[row][col];
    });
}

function handleAIMove() {
    let availableMoves = [];
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === '') availableMoves.push({ i, j });
        });
    });
    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[move.i][move.j] = 'O';
    renderBoard();
    if (checkWin()) {
        setTimeout(() => {
            alert('O wins!');
            addResultToHistory('O wins');
            resetGame();
        }, 100); 
    } else if (board.flat().every(cell => cell !== '')) {
        setTimeout(() => {
            alert('Draw!');
            addResultToHistory('Draw');
            resetGame();
        }, 100); 
    } else {
        currentPlayer = 'X';
    }
}

function checkWin() {
    
    for (let i = 0; i < boardSize; i++) {
        if (board[i].every(cell => cell === currentPlayer) ||
            board.map(row => row[i]).every(cell => cell === currentPlayer)) {
            return true;
        }
    }

    
    if (board.map((row, index) => row[index]).every(cell => cell === currentPlayer) ||
        board.map((row, index) => row[boardSize - 1 - index]).every(cell => cell === currentPlayer)) {
        return true;
    }

    return false;
}

function addResultToHistory(result) {
    fetch('/api/addResult', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ result })
    });
}

function resetGame() {
    currentPlayer = 'X';
    createBoard();
}

function increaseBoardSize() {
    boardSize++;
    createBoard();
}

// let moves = []; // Add this to store moves

// function handleMove(i, j) {
//     if (board[i][j] !== '' || (gameMode === 'AI' && currentPlayer === 'O')) return;
//     board[i][j] = currentPlayer;
//     moves.push({ player: currentPlayer, row: i, col: j }); // Store move
//     renderBoard();
//     if (checkWin()) {
//         setTimeout(() => {
//             alert(`${currentPlayer} wins!`);
//             addResultToHistory(`${currentPlayer} wins`, moves);
//             resetGame();
//         }, 100); // Short delay to allow the last move to be rendered
//     } else if (board.flat().every(cell => cell !== '')) {
//         setTimeout(() => {
//             alert('Draw!');
//             addResultToHistory('Draw', moves);
//             resetGame();
//         }, 100); // Short delay to allow the last move to be rendered
//     } else {
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         if (gameMode === 'AI' && currentPlayer === 'O') {
//             setTimeout(handleAIMove, 500); // Delay AI move to simulate thinking time
//         }
//     }
// }

// function handleAIMove() {
//     let availableMoves = [];
//     board.forEach((row, i) => {
//         row.forEach((cell, j) => {
//             if (cell === '') availableMoves.push({ i, j });
//         });
//     });
//     const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
//     board[move.i][move.j] = 'O';
//     moves.push({ player: 'O', row: move.i, col: move.j }); // Store move
//     renderBoard();
//     if (checkWin()) {
//         setTimeout(() => {
//             alert('O wins!');
//             addResultToHistory('O wins', moves);
//             resetGame();
//         }, 100); // Short delay to allow the last move to be rendered
//     } else if (board.flat().every(cell => cell !== '')) {
//         setTimeout(() => {
//             alert('Draw!');
//             addResultToHistory('Draw', moves);
//             resetGame();
//         }, 100); // Short delay to allow the last move to be rendered
//     } else {
//         currentPlayer = 'X';
//     }
// }

// function addResultToHistory(result, moves) {
//     fetch('/api/addResult', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ result, moves })
//     });
// }

// function resetGame() {
//     currentPlayer = 'X';
//     moves = []; // Reset moves
//     createBoard();
// }

let moves = []; 

function handleMove(i, j) {
    if (board[i][j] !== '' || (gameMode === 'AI' && currentPlayer === 'O')) return;
    board[i][j] = currentPlayer;
    moves.push({ player: currentPlayer, row: i, col: j }); // Store move
    renderBoard();
    if (checkWin()) {
        setTimeout(() => {
            alert(`${currentPlayer} wins!`);
            addResultToHistory(`${currentPlayer} wins`, moves);
            resetGame();
        }, 100); 
    } else if (board.flat().every(cell => cell !== '')) {
        setTimeout(() => {
            alert('Draw!');
            addResultToHistory('Draw', moves);
            resetGame();
        }, 100); 
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'AI' && currentPlayer === 'O') {
            setTimeout(handleAIMove, 500); // Delay AI move to simulate thinking time
        }
    }
}

function handleAIMove() {
    let availableMoves = [];
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === '') availableMoves.push({ i, j });
        });
    });
    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[move.i][move.j] = 'O';
    moves.push({ player: 'O', row: move.i, col: move.j }); // Store move
    renderBoard();
    if (checkWin()) {
        setTimeout(() => {
            alert('O wins!');
            addResultToHistory('O wins', moves);
            resetGame();
        }, 100); 
    } else if (board.flat().every(cell => cell !== '')) {
        setTimeout(() => {
            alert('Draw!');
            addResultToHistory('Draw', moves);
            resetGame();
        }, 100); 
    } else {
        currentPlayer = 'X';
    }
}

function addResultToHistory(result, moves) {
    fetch('/api/addResult', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ result, moves })
    });
}

function resetGame() {
    currentPlayer = 'X';
    moves = []; // Reset moves
    createBoard();
}