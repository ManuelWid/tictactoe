// DOM elements
const wrap = document.getElementById("wrapper");
const msg = document.getElementById("msg");
const btn = document.getElementById("button");

let player = "X"; // current player
let running = true; // if the game is still on

// winning conditions represented by the id of the "tiles"
const winArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let pOarr = []; // player O's tiles
let pXarr = []; // player X's tiles

msg.innerHTML = `${player}'s turn`;

// main for loop to create 9 boxes in the container div 
// and add an event listener to each of them
for(let i = 0; i < 9; i++){
    const box = document.createElement("div"); // create div
    box.className = "box"; // class for css style
    box.id = i; // storing the tile number as id to retrieve it easily later
    wrap.appendChild(box); // add the new div to the container/wrapper

    // despite having only one const box it will create 9 different event listeners
    // one for each box that is created with every iteration of the for loop
    box.addEventListener("click", (e) => { // e will return the event that is triggered
        // check if the game is still running and if the tile is already occupied 
        // by comparing both players arrays with the tile clicked
        if(running && !pOarr.concat(pXarr).includes(Number(e.target.id))){
            e.target.innerHTML = player; // fill tile with X or O
            e.target.style.backgroundColor = "rgb(200, 200, 200)";
            if(player == "O"){
                pOarr.push(Number(e.target.id)); // add tile number to players array of tiles
                checkWin(pOarr); // if no win then running = true
                if(running){
                    player = "X"; // change the player
                    msg.innerHTML = `${player}'s turn`;
                };
            }
            else{
                pXarr.push(Number(e.target.id));
                checkWin(pXarr);
                if(running){
                    player = "O";
                    msg.innerHTML = `${player}'s turn`;
                };
            }
        }
    })
}

// takes the players array
function checkWin(arr){
    // checks both arrays to see if there are empty tiles left
    if(pOarr.concat(pXarr).length == 9){
        console.log("draw");
        running = false;
        msg.innerHTML = "Draw";
        btn.style.visibility = "visible"; // make the reset button visible (could also reload the page)
    }
    // else check if all the tiles in the win conditions are in a players array
    else{
        for(let i = 0; i < winArr.length; i++){ // loop through every sub array of the conditions array
            if(winArr[i].every(j => arr.includes(j))){ // the matching subarray is always array[i]
                console.log("win");
                running = false;
                // loop through the winning sub array [i] and give each winning box [j] a green color
                // the winning sub could be [...[0,4,8]...] which index is [i] and the contents index (0,4 and 8) would be [j]
                for(let j = 0; j < winArr[i].length; j++){
                    let box = document.getElementById(winArr[i][j]);
                    box.style.backgroundColor = "rgb(50, 200, 50)"; // green
                }
                msg.innerHTML = `The winner is ${player}`;
                btn.style.visibility = "visible";
            }
        }
    }
}

// reset the game (could also reload the page)
function newGame(){
    player = "X";
    msg.innerHTML = `${player}'s turn`;
    pOarr = []; // empty player arrays
    pXarr = [];
    running = true;
    // empty each box and reset the background color
    let boxArr = document.getElementsByClassName("box");
    for(let i = 0; i < boxArr.length; i++){
        boxArr[i].innerHTML = "";
        boxArr[i].style.backgroundColor = "";
    }
    btn.style.visibility = "hidden";
}