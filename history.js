document.getElementById('backToGame').addEventListener('click', () => {
    window.location.href = '/';
});

document.getElementById('backToHistory').addEventListener('click', () => {
    document.getElementById('replay').classList.add('hidden');
    document.getElementById('history').classList.remove('hidden');
});

fetch('/api/history')
    .then(response => response.json())
    .then(data => {
        const historyElement = document.getElementById('history');
        data.forEach(item => {
            const div = document.createElement('div');
            const date = new Date(item.date).toLocaleString();
            div.textContent = `${item.result} - ${date}`;
            div.addEventListener('click', () => viewReplay(item.id));
            historyElement.appendChild(div);
        });
    })
    .catch(error => console.error('Error fetching history:', error));

function viewReplay(id) {
    fetch(`/api/history/${id}`)
        .then(response => response.json())
        .then(data => {
            const moves = JSON.parse(data.moves);
            startReplay(moves);
        })
        .catch(error => console.error('Error fetching replay:', error));
}

function startReplay(moves) {
    document.getElementById('history').classList.add('hidden');
    document.getElementById('replay').classList.remove('hidden');
    createBoard();
    let index = 0;
    const interval = setInterval(() => {
        if (index >= moves.length) {
            clearInterval(interval);
            return;
        }
        const { player, row, col } = moves[index];
        board[row][col] = player;
        renderBoard();
        index++;
    }, 1000);
}

function createBoard() {
    board = Array(3).fill().map(() => Array(3).fill('')); 
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(3, 1fr)`; 
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            boardElement.appendChild(cellElement);
        });
    });
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3); 
        const col = index % 3; 
        cell.textContent = board[row][col];
    });
}
