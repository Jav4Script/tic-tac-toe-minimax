import { Request, Response, Router } from 'express';

import ticTacToeGame from '../../../app/ticTacToe';
import ValidationError from '../../../exceptions/validationError';

export default (): Router => {
  const router = Router();

  router.route('/').get((request: Request, response: Response) => {
    try {
      const board = (request.query?.board as string) || '';
      const updatedBoard = ticTacToeGame(board);

      return response.status(200).json(updatedBoard);
    } catch (error) {
      if (error instanceof ValidationError) {
        return response
          .status(400)
          .json({ error: error.message, details: error.details });
      }
      throw error;
    }
  });

  return router;
};
