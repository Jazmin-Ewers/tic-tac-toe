/*----- app's state (variables) -----*/
let board = [[null, null, null], 
            [null, null, null], 
            [null, null, null]];
let whosTurn = "X";
let winner = null;
/*----- event listeners -----*/

//Click on box displays X if player X and O if player O
document.getElementById("box_1").addEventListener("click", function(evt) {
    document.getElementById("box_1").textContent = "X";
});



/*----- functions -----*/
//determines winner based on whos turn it is
function getWinner(whosTurn, board) {
    //Determine if player won Diagonally 
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === whosTurn) {
        return "Won Diagonally"
    };
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] === whosTurn) {
        return "Won Diagonally"
    };
    for (let index = 0; index < board[0].length; index++) {
        //Determine if player won using Rows 
        if (board[index][0] === board[index][1] && board[index][1] === board[index][2] && board[index][2] === whosTurn) {
            return "Won with Rows";
        //Determine if player won using Rows 
        } else if (board[0][index] === board[1][index] && board[1][index] === board[2][index] && board[2][index] === whosTurn) {
            return "Won with Columns";
        }
    } return "Lost";
}
getWinner("X", board)
