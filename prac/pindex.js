window.addEventListener("DOMContentLoaded", () => {
    const one = document.getElementById("1");
    const two = document.getElementById("2");
    const three = document.getElementById("3");
    const four = document.getElementById("4");
    const five = document.getElementById("5");
    const six = document.getElementById("6");
    const seven = document.getElementById("7");
    const eight = document.getElementById("8");
    const nine = document.getElementById("9");

    const winner = document.querySelector(".winner");

    const reset = document.querySelector('.reset');

    console.log("loaded");
    
    let currPlayer = "X";
    var flag = false;
    
    const boxes = [one,two,three,four,five,six,seven,eight,nine];

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];



    const isBoxEmpty = (box) => {
        if(box.innerText === "X" || box.innerText === "O"){
            return false;
        }else{
            return true;
        }
    }

    const checkIfWinner = () => {
        var won = false;
        for(let i = 0;i<winningConditions.length;i++){
            var a = winningConditions[i][0];
            var b = winningConditions[i][1];
            var c = winningConditions[i][2];
            
            if(boxes[a].innerText === "" || boxes[b].innerText === "" || boxes[c].innerText === ""){
                continue;
            }
            if( boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText){
                won = true;
                break;
            }
            
        }
        return won;
    }

    const userAction = (box,index) => {
        console.log("nsjcnjs");
        if(isBoxEmpty(box) && !flag){
            box.innerText = currPlayer;
            //boxes[index].innerText = currPlayer;
            if(currPlayer === "X"){
                currPlayer = "O";
            }else{
                currPlayer = "X";
            }
        }
        flag = checkIfWinner();
        if(flag === false){
            var i = 0;
            // boxes.forEach(box => {
            //     if(box.innerText === 'X' || box.innerText === 'O'){
            //         i++;
            //     }
            // })
            const index = boxes.filter(box=>box.innerText == '')
            if(index.length===0){
                winner.innerText = 'Match Drawn';
            }
            // if(i === 9){
            //     winner.innerText = 'Match Drawn';
            // }
        }
        if(flag){
            if(currPlayer === 'X'){
                winner.classList.add('playerO');
                winner.innerText = 'Player O Won';
            }else{
                winner.classList.add('playerX');
                winner.innerText = 'Player X Won';
            }
        }
    }

    boxes.forEach((box,index) => {
        box.addEventListener('click',() => {
            userAction(box,index);
        } );
    });

    // const resetBoard = () => {
    //     boxes.forEach( box => box.innerText = "");
    //     flag = false;
    // }
    reset.addEventListener('click',() => {
        boxes.forEach( box => box.innerText = "");
        flag = false;
        currPlayer = 'X';
        winner.innerText = "";
        winner.classList.remove('playerX');
        winner.classList.remove('playerO');
    })
      
});
