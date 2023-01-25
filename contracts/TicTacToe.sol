pragma solidity ^0.4.24;
 
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
 } 