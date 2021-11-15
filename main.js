// 1) Define required constants:
// 	1.1) Define a colors object with keys of 'null' (when the square is empty), and players 1 & -1. The value assigned to each key represents the color to display for an empty square (null), player 1 and player -1.
// White color = #FFFFFF (255, 255, 255) Red color = #FF0000 (255, 0, 0) Blue color = #0000FF	(0,0,255)
let colors = { null : "white", player1: "red", player_1: "blue"};
// 	1.2) Define the 8 possible winning combinations, each containing three indexes of the board that make a winner if they hold the same player value.
const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
// 2) Define required variables used to track the state of the game:
// 	2.1) Use a board array to represent the squares.
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//	2.2) Use a turn variable to remember whose turn it is.
let turn;
// 	2.3) Use a winner variable to represent three different possibilities - player that won, a tie, or game in play.
// null Game in play
// "T" Game is a Tie
// 1 player 1 has won 
// -1 player 2 has won
let winner = null;
// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
// 	3.1) Store the 9 elements that represent the squares on the page.
box0 = document.getElementById("0");
box1 = document.getElementById("1");
box2 = document.getElementById("2");
box3 = document.getElementById("3");
box4 = document.getElementById("4");
box5 = document.getElementById("5");
box6 = document.getElementById("6");
box7 = document.getElementById("7");
box8 = document.getElementById("8");

// 4) Upon loading the app should:
// 	4.1) Initialize the state variables:
// 		4.1.1) Initialize the board array to 9 nulls to represent empty squares. The 9 elements will "map" to each square, where index 0 maps to the top-left square and index 8 maps to the bottom-right square.
// 		4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.
// 		4.1.3) Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie. 
function initialize(){
    board = [null, null, null,
            null, null, null,
            null, null, null];
    turn = 1;
    winner = null;
}


// 	4.2) Render those state variables to the page:
// 		4.2.1) Render the board:
// 			4.2.1.1) Loop over each of the 9 elements that represent the squares on the page, and for each iteration:
// 				4.2.1.1.2) Use the index of the iteration to access the mapped value from the board array.
// 				4.3.1.1.3) Set the background color of the current element by using the value as a key on the colors lookup object (constant).
// 		4.2.2) Render a message:
// 			4.2.2.1) If winner has a value other than null (game still in progress), render whose turn it is - use the color name for the player, converting it to upper case.
// 			4.2.2.2) If winner is equal to 'T' (tie), render a tie message.
// 			4.2.2.3) Otherwise, render a congratulatory message to which player has won - use the color name for the player, converting it to uppercase.
// 	4.3) Wait for the user to click a square
function renderBoard() {
    const boxes = document.querySelectorAll(".grid-item");
    boxes.forEach(function (box, index) {
        if (board[index] === null) {
            box.innerHTML = " ";
            box.style.backgroundColor = colors.null;
        } else if (board[index] === 1){
            box.innerHTML = "X";
            box.style.backgroundColor = colors.player1;
        } else if (board[index] === -1){
            box.innerHTML = "O";
            box.style.backgroundColor = colors.player_1;
        }
    });   
}
function renderMessage(){
    const element = document.getElementById("message");
    if (winner === "T" ){
        element.innerHTML = "It is a tie.";
    } else if (winner === 1){
        element.innerHTML = "Player 1 or 'X' has won.";
    } else if (winner === -1){
        element.innerHTML = "Player 2 or 'O' has won.";
    } else {
        element.innerHTML = "Game is in play";
    }
}
// 5) Handle a player clicking a square:
// 	5.1) Obtain the index of the square that was clicked by either:
// 		5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
// 		5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.

function waitForClick(){
    let boxes = document.querySelectorAll(".grid-item");
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        box.addEventListener("click", handleClick);
        function handleClick(evt){
            let clicked_index = parseInt(evt.target.id);
            // 	5.2) If the board has a value at the index, immediately return because that square is already taken.
            if (board[clicked_index] !== null){
                return;
            }
            // 	5.3) If winner is not null, immediately return because the game is over.
            if (winner !== null){
                return;
            }
            // 	5.4) Update the board array at the index with the value of turn.
            board[clicked_index] = turn;
            // 	5.6) Set the winner variable if there's a winner:
            // 		5.6.1) Loop through the each of the winning combination arrays defined.
            // 		5.6.2) Total up the three board positions using the three indexes in the current combo.
            // 		5.6.3) Convert the total to an absolute value (convert any negative total to positive).
            // 		5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop.
            winningCombinations.forEach(element => {
                if (Math.abs(board[element[0]] + board[element[1]] + board[element[2]]) === 3){
                    winner = turn
                    return;
            // 	5.7) If there's no winner, check if there's a tie:
            // 		5.7.1) Set winner to 'T' if there are no more nulls in the board array.

                } else {
                    for (let i = 0; i < board.length; i++) {
                        const element = board[i];
                        if (element === null) {
                            return;
                        }
                    }
                    winner = "T";
                }
            });
            // 	5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
            turn = turn * -1;
            renderBoard()
            renderMessage();
            return;
        }
    }
}



// 	5.8) All state has been updated, so render the state to the page (step 4.2).
initialize();
renderBoard();
renderMessage();
waitForClick();

// 6) Handle a player clicking the replay button:
// 	6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).
function resetGame() {
    initialize();
    renderBoard();
    renderMessage();
    waitForClick();
}