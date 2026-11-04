
const boardWidth = 16;
const boardHeight = 9;

const boardElement = document.getElementById('board');

const character = {
    aoko:       "./characters/aoko.png",
    chiikabu:   "./characters/chiikabu.png",
    chiikawa:   "./characters/chiikawa.png",
    furuhonya:  "./characters/furuhonya.png",
    hachiware:  "./characters/hachiware.png",
    kurimanju:  "./characters/kurimanju.png",
    momonga:    "./characters/momonga.png",
    rakko:      "./characters/rakko.png",
    shisa:      "./characters/shisa.png",
    siren:      "./characters/siren.png",
    usagi:      "./characters/usagi.png"
};


let board = Array.from({length: boardHeight + 2}, () => {
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

function makeRow() {
    const charKeys = Object.keys(character);
    boardElement.replaceChildren();
    
    for (let r_idx=1; r_idx <= boardHeight; r_idx++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        
        for (let c_idx=1; c_idx <= boardWidth; c_idx++) {
            if (board[r_idx][c_idx] !== 0) {
                const key = charKeys[Math.floor(Math.random() * charKeys.length)];
                const button = document.createElement('button');
                button.className = 'char-card';

                const img = document.createElement('img');
                img.src = character[key];
                img.alt = key;

                button.append(img);
                rowElement.append(button);
            }
        }

        boardElement.append(rowElement);
    }
}

makeRow();