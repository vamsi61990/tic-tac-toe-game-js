window.addEventListener("DOMContentLoaded",()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    const resetBoard = () => {
        board = ['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');
        
        if(currentPlayer === 'O'){
            changePlayer();
        }

        tiles.forEach( tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        })
    }

    const isValidAction = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const handleResultValidation = () => {
        let gameWon = false;
        for(let i=0;i<7;i++){
            const winCond = winningConditions[i];
            const a = board[winCond[0]];
            const b = board[winCond[1]];
            const c = board[winCond[2]];
            if(a === '' || b === '' || c === ''){
                continue;
            }
            if(a === b && b === c){
                gameWon = true;
                break;
            }
        }

        if(gameWon){
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if(!board.includes('')){
            announce(TIE);
        }
    }

    const announce = (type) => {
        switch(type){
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile,index) => {
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    tiles.forEach((tile,index) => {
        tile.addEventListener('click',() => userAction(tile,index));
    });

    resetButton.addEventListener('click',resetBoard);
})