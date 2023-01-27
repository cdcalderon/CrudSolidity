pragma solidity ^0.4.24;

contract TicTacToe {
  // Addresses of the players that are competing:
  address player1;
  address player2;

  // Move counter:
  uint8 current_move = 0;

  enum SquareState {
    Empty,
    X,
    O
  }
  
  SquareState[3][3] board;

  constructor(address _player2) public {
    require(_player2 != 0x0);
    player1 = msg.sender;
    player2 = _player2;
  }

  function performMove(uint8 xpos, uint8 ypos) public {
    require(!isGameOver());
    require(msg.sender == currentPlayerAddress());
    require(positionIsInBounds(xpos, ypos));
    require(board[xpos][ypos] == SquareState.Empty);

    board[xpos][ypos] = SquareState.X;
    current_move++;
  }

  function currentPlayerAddress() public view returns (address) {
    if (current_move % 2 == 0) {
      return player2;
    } else {
      return player1;
    }
  }

  function isGameOver() public view returns (bool) {
    return (winningPlayerShape() != SquareState.Empty || current_move > 8);
  }

  function winner() public view returns (address) {
    SquareState winning_shape = winningPlayerShape();
    if (winning_shape == SquareState.X) {
      return player2;
    } else if (winning_shape == SquareState.O) {
      return player1;
    }

    return 0X0;
  }

  function winningPlayerShape() public view returns (SquareState) {
    // Columns
    if (
      board[0][0] != SquareState.Empty &&
      board[0][0] == board[0][1] &&
      board[0][0] == board[0][2]
    ) {
      return board[0][0];
    }
    if (
      board[1][0] != SquareState.Empty &&
      board[1][0] == board[1][1] &&
      board[1][0] == board[1][2]
    ) {
      return board[1][0];
    }
    if (
      board[2][0] != SquareState.Empty &&
      board[2][0] == board[2][1] &&
      board[2][0] == board[2][2]
    ) {
      return board[2][0];
    }
    // Rows
    if (
      board[0][0] != SquareState.Empty &&
      board[0][0] == board[1][0] &&
      board[0][0] == board[2][0]
    ) {
      return board[0][0];
    }
    if (
      board[0][1] != SquareState.Empty &&
      board[0][1] == board[1][1] &&
      board[0][1] == board[2][1]
    ) {
      return board[0][1];
    }
    if (
      board[0][2] != SquareState.Empty &&
      board[0][2] == board[1][2] &&
      board[0][2] == board[2][2]
    ) {
      return board[0][2];
    }
    // Diagonals
    if (
      board[0][0] != SquareState.Empty &&
      board[0][0] == board[1][1] &&
      board[0][0] == board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] != SquareState.Empty &&
      board[0][2] == board[1][1] &&
      board[0][2] == board[2][0]
    ) {
      return board[0][2];
    }
  }

  function stateToString() public view returns (string) {
    return
      string(
        abi.encodePacked(
          "\n",
          rowToString(0),
          "\n",
          rowToString(1),
          "\n",
          rowToString(2),
          "\n"
        )
      );
  }

  function rowToString(uint8 ypos) public view returns (string) {
    return
      string(
        abi.encodePacked(
          squareToString(0, ypos),
          "|",
          squareToString(1, ypos),
          "|",
          squareToString(2, ypos)
        )
      );
  }

  function squareToString(uint8 xpos, uint8 ypos) public view returns (string) {
    require(positionIsInBounds(xpos, ypos));

    if (board[xpos][ypos] == SquareState.Empty) {
      return " ";
    }

    if (board[xpos][ypos] == SquareState.X) {
      return "X";
    }

    if (board[xpos][ypos] == SquareState.O) {
      return "O";
    }
  }

  function positionIsInBounds(
    uint8 xpos,
    uint8 ypos
  ) public pure returns (bool) {
    return (xpos >= 0 && xpos < 3 && ypos >= 0 && ypos < 3);
  }
}
