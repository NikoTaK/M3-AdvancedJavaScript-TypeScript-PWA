import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { TicTacToeGame } from './Game';
import { Board } from './components/Board';
import type { GameState } from './types';

export function GameComponent() {
  const [game] = useState(() => new TicTacToeGame());
  const [gameState, setGameState] = useState<GameState>(game.getState());

  const handleCellClick = useCallback((row: number, col: number) => {
    game.makeMove(row, col);
    setGameState({ ...game.getState() });
  }, [game]);

  const handleReset = useCallback(() => {
    game.resetGame();
    setGameState({ ...game.getState() });
  }, [game]);

  const getStatusMessage = () => {
    if (gameState.winner === 'draw') {
      return 'Game ended in a draw!';
    }
    if (gameState.winner) {
      return `Player ${gameState.winner} wins!`;
    }
    return `Current player: ${gameState.currentPlayer}`;
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{getStatusMessage()}</div>
      <div className="game-board">
        <Board
          board={gameState.board}
          onCellClick={handleCellClick}
          disabled={gameState.isGameOver}
        />
      </div>
      <button className="reset-button" onClick={handleReset}>
        New Game
      </button>
    </div>
  );
}
