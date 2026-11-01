boardWidth = 16;
boardHeight = 9;

board = Array.from({length: boardHeight + 2}, () => {
    return Array(boardWidth + 2).fill(0);
});

for (let i=1; i <= boardHeight; i++) {
    for (let j=1; j <= boardWidth; j++) {
        board[i][j] = 1;
    }
}

console.log(board);
console.log(board.length);
console.log(board[1].length);