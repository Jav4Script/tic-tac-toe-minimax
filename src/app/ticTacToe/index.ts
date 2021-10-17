import Board, { TerminalBoard } from './board';
import Player from './player';
import ValidationError from '../../exceptions/validationError';

const gamePlays = (board: string[]): Record<string, number> => {
  let x = 0;
  let o = 0;

  if (board.length) {
    [...board].forEach((element: string) => {
      if (element === 'x') x += 1;
      if (element === 'o') o += 1;
    });
  }

  return { x, o };
};

const ticTacToeGame = (
  boardText: string,
): string | Record<string, string | (number | undefined)[]> | TerminalBoard => {
  if (boardText.length > 9) {
    const error = new ValidationError();
    error.details = {
      message: 'The board must contain 9 characters',
      type: 'InvalidBoardSize',
    };
    throw error;
  }

  let boardList = [...boardText].map(value =>
    value && value !== ' ' ? value : '',
  );
  if (boardList.length !== 9) {
    boardList = boardList.concat(new Array(9 - boardList.length).fill(''));
  }

  const notAllowedMarker = boardList.some(
    marker => marker !== 'x' && marker !== 'o' && marker !== '',
  );
  if (notAllowedMarker) {
    const error = new ValidationError();
    error.details = {
      message: 'The board only accepts the x or lowercase characters',
      type: 'InvalidBoardMarker',
    };
    throw error;
  }

  const plays = gamePlays(boardList);
  const turnDifference = plays.x - plays.o;
  if (Math.abs(turnDifference) > 1) {
    const error = new ValidationError();
    error.details = {
      message: 'The board is not valid',
      type: 'InvalidBoard',
    };
    throw error;
  }

  const board = new Board(boardList);
  if (board.isTerminal()) {
    board.printFormattedBoard();
    return board.isTerminal();
  }

  const isComputerTurn = boardList.length === 0 || plays.o <= plays.x;
  if (!isComputerTurn) {
    const error = new ValidationError();
    error.details = {
      message: 'Player O cannot play now',
      type: 'InvalidTurn',
    };
    throw error;
  }

  const playerOMaximize = !!(boardList.length === 0 || plays.o === plays.x);

  const player = new Player();
  const bestMove = player.getBestMove(board, playerOMaximize);
  board.insert('o', bestMove);
  board.printFormattedBoard();

  if (board.isTerminal()) {
    return board.isTerminal();
  }

  const newBoard = board.board.map(element => element || ' ').join('');
  const playerX = board.board
    .map((element, index) => (element === 'x' ? index : undefined))
    .filter(element => element !== undefined);
  const playerO = board.board
    .map((element, index) => (element === 'o' ? index : undefined))
    .filter(element => element !== undefined);

  return {
    board: newBoard,
    playerX,
    playerO,
  };
};

export default ticTacToeGame;
