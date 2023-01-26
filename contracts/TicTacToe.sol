pragma solidity ^0.8.17;
 
 contract TicTacToe {
     // Addresses of the players that are competing:
     address player1;
     address player2;

     // Move counter:
     uint8 current_move = 0;

     enum SquareState {Empty, X, O}
     SquareState[3][3] board;

     constructor(address _player2) public {
         player1 = msg.sender;
         player2 = _player2;
     }

     function winningPlayerShape() public view returns (SquareState) {
        // Columns
        if(board[0][0] != SquareState.Empty && board[0][0] == board[0][1] && board[0][2]){
            return board[0][0];
        }
        if(board[1][0] != SquareState.Empty && board[1][0] == board[1][1] && board[1][2]){
            return board[1][0];
        }
        if(board[2][0] != SquareState.Empty && board[2][0] == board[2][1] && board[2][2]){
            return board[2][0];
        }
        // Rows
         if(board[0][0] != SquareState.Empty && board[0][0] == board[1][0] && board[2][0]){
            return board[0][0];
        }
        if(board[0][1] != SquareState.Empty && board[0][1] == board[1][1] && board[2][1]){
            return board[0][1];
        }
        if(board[0][2] != SquareState.Empty && board[0][2] == board[1][2] && board[2][2]){
            return board[0][2];
        }
        // Diagonals
        if(board[0][0] != SquareState.Empty && board[0][0] == board[1][1] && board[2][2]){
            return board[0][0];
        }
        if(board[0][2] != SquareState.Empty && board[0][2] == board[1][1] && board[2][0]){
            return board[0][2];
        }
    }
 } 