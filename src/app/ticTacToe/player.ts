import Board from './board';

interface BestMoveCallBack {
  (value: number | undefined): void | number;
}

export default class Player {
  maxDepth;

  nodesMap;

  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth;
    this.nodesMap = new Map();
  }

  getBestMove(
    board: Board,
    maximizing = true,
    callback: BestMoveCallBack = () => {},
    depth = 0,
  ): number {
    if (depth == 0) this.nodesMap.clear();

    const terminalBoard = board.isTerminal();
    const terminalIsObject = typeof terminalBoard === 'object';
    if (terminalBoard || depth === this.maxDepth) {
      if (terminalBoard && terminalIsObject && terminalBoard.winner === 'o') {
        return 100 - depth;
      } else if (
        terminalBoard &&
        terminalIsObject &&
        terminalBoard.winner === 'x'
      ) {
        return -100 + depth;
      }
      return 0;
    }

    if (maximizing) {
      let best = -100;

      board.getAvailableMoves().forEach(index => {
        const child = new Board([...board.board]);
        child.insert('o', index);
        const nodeValue = this.getBestMove(child, false, callback, depth + 1);
        best = Math.max(best, nodeValue);

        if (depth == 0) {
          const moves = this.nodesMap.has(nodeValue)
            ? `${this.nodesMap.get(nodeValue)},${index}`
            : index;
          this.nodesMap.set(nodeValue, moves);
        }
      });

      if (depth == 0) {
        let returnValue;
        if (typeof this.nodesMap.get(best) == 'string') {
          const arr = this.nodesMap.get(best).split(',');
          const rand = Math.floor(Math.random() * arr.length);
          returnValue = arr[rand];
        } else {
          returnValue = this.nodesMap.get(best);
        }

        callback(returnValue);
        return Number(returnValue);
      }

      return Number(best);
    }

    if (!maximizing) {
      let best = 100;

      board.getAvailableMoves().forEach(index => {
        const child = new Board([...board.board]);

        child.insert('x', index);

        let nodeValue = this.getBestMove(child, true, callback, depth + 1);
        best = Math.min(best, nodeValue);

        if (depth == 0) {
          const moves = this.nodesMap.has(nodeValue)
            ? this.nodesMap.get(nodeValue) + ',' + index
            : index;
          this.nodesMap.set(nodeValue, moves);
        }
      });

      if (depth == 0) {
        let returnValue;
        if (typeof this.nodesMap.get(best) == 'string') {
          const arr = this.nodesMap.get(best).split(',');
          const rand = Math.floor(Math.random() * arr.length);
          returnValue = arr[rand];
        } else {
          returnValue = this.nodesMap.get(best);
        }
        callback(returnValue);
        return Number(returnValue);
      }
      return Number(best);
    }

    return 0;
  }
}
