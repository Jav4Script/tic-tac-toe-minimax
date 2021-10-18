import ValidationError from '../../exceptions/validationError';

const DIRECTION = {
  DIAGONAL: 'Diagonal',
  HORIZONTAL: 'Horizontal',
  VERTICAL: 'Vertical',
};

export type TerminalBoard =
  | boolean
  | { winner: string }
  | {
      winner: string;
      direction: string;
      row: number;
      column?: undefined;
      diagonal?: undefined;
    }
  | {
      winner: string;
      direction: string;
      column: number;
      row?: undefined;
      diagonal?: undefined;
    }
  | {
      winner: string;
      direction: string;
      column?: number;
      row?: undefined;
      diagonal: string;
    };

export default class Board {
  board;

  constructor(board = ['', '', '', '', '', '', '', '', '']) {
    this.board = board;
  }

  getAvailableMoves() {
    const moves: number[] = [];
    this.board.forEach((cell, index) => {
      if (!cell) moves.push(index);
    });
    return moves;
  }

  insert(symbol: string, position: number) {
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position)) {
      const error = new ValidationError();
      error.details = {
        message: 'Cell index does not exist!',
        type: 'InvalidCell',
      };
      throw error;
    }
    if (!['x', 'o'].includes(symbol)) {
      const error = new ValidationError();
      error.details = {
        message: 'The symbol can only be x or o!',
        type: 'InvalidSymbol',
      };
      throw error;
    }
    if (this.board[position]) {
      return false;
    }
    this.board[position] = symbol;
    return true;
  }

  isEmpty() {
    return this.board.every(cell => !cell);
  }

  isFull() {
    return this.board.every(cell => cell);
  }

  isTerminal(): TerminalBoard {
    if (this.isEmpty()) return false;

    if (
      this.board[0] === this.board[1] &&
      this.board[0] === this.board[2] &&
      this.board[0]
    ) {
      return { winner: this.board[0], direction: DIRECTION.HORIZONTAL, row: 1 };
    }
    if (
      this.board[3] === this.board[4] &&
      this.board[3] === this.board[5] &&
      this.board[3]
    ) {
      return { winner: this.board[3], direction: DIRECTION.HORIZONTAL, row: 2 };
    }
    if (
      this.board[6] === this.board[7] &&
      this.board[6] === this.board[8] &&
      this.board[6]
    ) {
      return { winner: this.board[6], direction: DIRECTION.HORIZONTAL, row: 3 };
    }

    if (
      this.board[0] === this.board[3] &&
      this.board[0] === this.board[6] &&
      this.board[0]
    ) {
      return {
        winner: this.board[0],
        direction: DIRECTION.VERTICAL,
        column: 1,
      };
    }
    if (
      this.board[1] === this.board[4] &&
      this.board[1] === this.board[7] &&
      this.board[1]
    ) {
      return {
        winner: this.board[1],
        direction: DIRECTION.VERTICAL,
        column: 2,
      };
    }
    if (
      this.board[2] === this.board[5] &&
      this.board[2] === this.board[8] &&
      this.board[2]
    ) {
      return {
        winner: this.board[2],
        direction: DIRECTION.VERTICAL,
        column: 3,
      };
    }

    if (
      this.board[0] === this.board[4] &&
      this.board[0] === this.board[8] &&
      this.board[0]
    ) {
      return {
        winner: this.board[0],
        direction: DIRECTION.DIAGONAL,
        diagonal: 'main',
      };
    }
    if (
      this.board[2] === this.board[4] &&
      this.board[2] === this.board[6] &&
      this.board[2]
    ) {
      return {
        winner: this.board[2],
        direction: DIRECTION.DIAGONAL,
        diagonal: 'counter',
      };
    }

    if (this.isFull()) {
      return { winner: 'draw' };
    }

    return false;
  }

  printFormattedBoard() {
    let formattedString = '';
    this.board.forEach((cell, index) => {
      formattedString += cell ? ` ${cell} |` : '   |';
      if ((index + 1) % 3 === 0) {
        formattedString = formattedString.slice(0, -1);
        if (index < 8)
          formattedString +=
            '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
      }
    });
    // eslint-disable-next-line no-console
    console.log(`\n\n${formattedString}`);
  }
}
