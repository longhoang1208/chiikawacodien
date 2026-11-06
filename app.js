
const boardWidth = 16;
const boardHeight = 9;

const boardElement = document.getElementById('board');
const wrapperElement = document.getElementById('board-wrapper');
const pathLayer = document.getElementById('path-layer');

const SVG_NS = 'http://www.w3.org/2000/svg';

const character = {
    aoko: {
        path: "./characters/aoko.png",
        val: 1
    },

    aoko_2: {
        path: "./characters/aoko_2.png",
        val: 2
    },

    chiikabu: {
        path: "./characters/chiikabu.png",
        val: 3
    },

    chiikabu_2: {
        path: "./characters/chiikabu_2.png",
        val: 4
    },
    chiikawa: {
        path: "./characters/chiikawa.png",
        val: 5
    },

    chiikawa_2: {
        path: "./characters/chiikawa_2.png",
        val: 6
    },
    furuhonya: {
        path: "./characters/furuhonya.png",
        val: 7
    },

    furuhonya_2: {
        path: "./characters/furuhonya_2.png",
        val: 8
    },

    hachiware: {
        path: "./characters/hachiware.png",
        val: 9
    },

    hachiware_2: {
        path: "./characters/hachiware_2.png",
        val: 10
    },
    kurimanju: {
        path: "./characters/kurimanju.png",
        val: 11
    },

    kurimanju_2: {
        path: "./characters/kurimanju_2.png",
        val: 12
    },

    momonga: {
        path: "./characters/momonga.png",
        val: 13
    },

    momonga_2: {
        path: "./characters/momonga_2.png",
        val: 14
    },

    rakko: {
        path: "./characters/rakko.png",
        val: 15
    },

    rakko_2: {
        path: "./characters/rakko_2.png",
        val: 16
    },

    rakko_3: {
        path: "./characters/rakko_3.png",
        val: 17
    },

    rakko_4: {
        path: "./characters/rakko_4.png",
        val: 18
    },

    shisa: {
        path: "./characters/shisa.png",
        val: 19
    },

    shisa_2: {
        path: "./characters/shisa_2.png",
        val: 20
    },

    siren: {
        path: "./characters/siren.png",
        val: 21
    },

    siren_2: {
        path: "./characters/siren_2.png",
        val: 22
    },

    usagi: {
        path: "./characters/usagi.png",
        val: 23
    },

    usagi_2: {
        path: "./characters/usagi_2.png",
        val: 24
    },

    usagi_3: {
        path: "./characters/usagi_3.png",
        val: 25
    },

    usagi_4: {
        path: "./characters/usagi_4.png",
        val: 26
    },

    usagi_5: {
        path: "./characters/usagi_5.png",
        val: 27
    },

    usagi_6: {
        path: "./characters/usagi_6.png",
        val: 28
    },
};

const charKeys = Object.keys(character);


function getCard(row, col) {
    return boardElement.querySelector(
        `.char-card[data-row="${row}"][data-col="${col}"]`
    );
}

// Tâm của ô (r, c) theo pixel, tính từ góc trên trái của khung bọc
function cellCenter(r, c) {
    const wrapRect = wrapperElement.getBoundingClientRect();
    const first = getCard(1, 1).getBoundingClientRect();
    const stepX = getCard(1, 2).getBoundingClientRect().left - first.left;
    const stepY = getCard(2, 1).getBoundingClientRect().top - first.top;

    return {
        x: first.left - wrapRect.left + first.width / 2 + (c - 1) * stepX,
        y: first.top - wrapRect.top + first.height / 2 + (r - 1) * stepY
    };
}

function drawPath(path) {
    const points = path
        .map(([r, c]) => {
            const p = cellCenter(r, c);
            return `${p.x},${p.y}`;
        })
        .join(' ');

    const line = document.createElementNS(SVG_NS, 'polyline');
    line.setAttribute('points', points);
    line.setAttribute('class', 'path-line');
    pathLayer.append(line);

    setTimeout(() => line.remove(), 400);   // tự xoá sau 0,4 giây
}

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


function getRandomPairs() {
    const charNum = boardWidth * boardHeight;
    let list = [];

    for (let i=0; i < charNum; i += 2) {
        const key = charKeys[Math.floor(Math.random() * charKeys.length)];

        list.push(key, key);
    }

    // <---------- Fisher-Yates Shuffle ---------->
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
}


function fillBoardRandom() {
    boardElement.replaceChildren();
    let charsList = getRandomPairs();

    for (let r_idx=1; r_idx <= boardHeight; r_idx++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        
        for (let c_idx=1; c_idx <= boardWidth; c_idx++) {
            if (board[r_idx][c_idx] !== 0) {
                const key = charsList.pop();
                
                const button = document.createElement('button');
                button.className = 'char-card';
                button.dataset.row = r_idx;
                button.dataset.col = c_idx;

                const img = document.createElement('img');
                img.src = character[key].path;
                img.alt = key;
                board[r_idx][c_idx] = character[key].val;

                button.append(img);
                rowElement.append(button);
            }
        }

        boardElement.append(rowElement);
    }
}

fillBoardRandom();
console.log(board);


// <====================== CHECK CONNECTION ======================>
function lineClear(r1, c1, r2, c2) {
    // HORIZONTAL LINE
    if (r1 === r2) {
        for (let c = Math.min(c1, c2) + 1; c < Math.max(c1, c2); c++) {
            if (board[r1][c] !== 0) {
                return false;
            }
        }
        return true
    }

    // VERTICAL LINE
    if (c1 === c2) {
        for (let r = Math.min(r1, r2) + 1; r < Math.max(r1, r2); r++) {
            if (board[r][c1] !== 0) {
                return false;
            }
        }
        return true;
    }
    
    return false;
}

function canConnect(a, b) {
    const [r1, c1] = a;
    const [r2, c2] = b;

    if (r1 === r2 && c1 === c2) return null;
    if (
        board[r1][c1] !== board[r2][c2] ||
        board[r1][c1] === 0
    ) return null;

    // 0 lần rẽ
    if (
        (r1 === r2 || c1 === c2) &&
        lineClear(r1, c1, r2, c2)
    ) return [a, b];

    // 1 lần rẽ: chữ L, thử 2 góc (r1,c2) và (r2,c1)
    if (
        board[r1][c2] === 0 &&
        lineClear(r1, c1, r1, c2) &&
        lineClear(r1, c2, r2, c2)
    ) return [a, [r1, c2], b];

    if (
        board[r2][c1] === 0 &&
        lineClear(r1, c1, r2, c1) &&
        lineClear(r2, c1, r2, c2)
    ) return [a, [r2, c1], b];

    // 2 lần rẽ: quét từng cột làm đường dọc trung gian
    for (let c = 0; c < boardWidth + 2; c++) {
        if (c === c1 || c === c2) continue;
        if (board[r1][c] === 0 &&
            board[r2][c] === 0 &&
            lineClear(r1, c1, r1, c) &&
            lineClear(r1, c, r2, c) &&
            lineClear(r2, c, r2, c2)
        ) return [a, [r1, c], [r2, c], b];
    }
    
    // 2 lần rẽ: quét từng hàng làm đường ngang trung gian
    for (let r = 0; r < boardHeight + 2; r++) {
        if (r === r1 || r === r2) continue;
        if (board[r][c1] === 0 &&
            board[r][c2] === 0 &&
            lineClear(r1, c1, r, c1) && // Từ điểm đầu -> điểm bắt đầu đg nối ngang
            lineClear(r, c1, r, c2) &&  // Điểm bắt đầu đg ngang -> điểm cuối đg ngang
            lineClear(r, c2, r2, c2)    // Điểm cuối đg ngang -> điểm cuối
        ) return [a, [r, c1], [r, c2], b];
    }

    return null;
}


// <====================== SELECT CELL ======================>
let selected = null;

function select(row, col, el) {
    selected = { row, col, el };
    selected.el.classList.add('selected');
}

function clearSelection() {
    if (selected) {
        selected.el.classList.remove('selected');
        selected.el.classList.remove('active');
    }
    selected = null;
}

function removePair(cell_1, cell_2) {
    board[cell_1.row][cell_1.col] = 0;
    board[cell_2.row][cell_2.col] = 0;
    
    cell_1.el.style.visibility = 'hidden';   // Hide element, keep the board layout
    cell_2.el.style.visibility = 'hidden';
}

boardElement.addEventListener('click', (e) => {
    const el = e.target.closest('.char-card');  // click vao <img> van nhan data cua <button>
    if (!el) return;
    
    el.classList.add('active')
    
    const row = Number(el.dataset.row);
    const col = Number(el.dataset.col);
    
    if (board[row][col] === 0) return;
    
    // Click on not-selected cell -> select this cell
    if (!selected) {
        select(row, col, el);
        return;
    }
    
    // Click on selected cell -> unselect this cell
    if (selected.row === row && selected.col === col) {
        clearSelection();
        return;
    }
    
    // <-------------------- Check 2 selected cells -------------------- >
    //              The selected cell                       Current cell
    const is_Same = board[selected.row][selected.col] === board[row][col];
    const path = is_Same ? canConnect([selected.row, selected.col], [row, col]) : null;
    
    if (path) {
        drawPath(path);
        removePair(selected, { row, col, el });
        clearSelection();
        
    } else {
        clearSelection();
        select(row, col, el);
    }
})
