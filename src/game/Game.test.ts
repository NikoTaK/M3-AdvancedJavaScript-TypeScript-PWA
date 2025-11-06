import { describe, it, expect, beforeEach } from 'vitest';
import { TicTacToeGame } from './Game';

/**
 * SMOKE TESTS - Verify basic functionality of each unit
 */
describe('TicTacToeGame - Smoke Tests', () => {
  let game: TicTacToeGame;

  beforeEach(() => {
    game = new TicTacToeGame();
  });

  it('should initialize a new game', () => {
    const state = game.getState();
    expect(state).toBeDefined();
    expect(state.currentPlayer).toBe('X');
    expect(state.winner).toBeNull();
    expect(state.isGameOver).toBe(false);
  });

  it('should allow making a valid move', () => {
    const result = game.makeMove(0, 0);
    expect(result).toBe(true);
  });

  it('should switch players after a move', () => {
    game.makeMove(0, 0);
    const state = game.getState();
    expect(state.currentPlayer).toBe('O');
  });

  it('should reset the game', () => {
    game.makeMove(0, 0);
    game.resetGame();
    const state = game.getState();
    expect(state.currentPlayer).toBe('X');
    expect(state.winner).toBeNull();
  });

  it('should reject moves on occupied cells', () => {
    game.makeMove(0, 0);
    const result = game.makeMove(0, 0);
    expect(result).toBe(false);
  });

  it('should reject moves after game is over', () => {
    // Set up a winning position
    game.makeMove(0, 0); // X
    game.makeMove(1, 0); // O
    game.makeMove(0, 1); // X
    game.makeMove(1, 1); // O
    game.makeMove(0, 2); // X - X wins
    
    const result = game.makeMove(2, 2); // Try to move after game over
    expect(result).toBe(false);
  });
});

/**
 * COMPREHENSIVE UNIT TESTS - Deep testing of win conditions
 */
describe('TicTacToeGame - Unit Tests', () => {
  let game: TicTacToeGame;

  beforeEach(() => {
    game = new TicTacToeGame();
  });

  it('should detect X winning on row', () => {
    game.makeMove(0, 0); // X
    game.makeMove(1, 0); // O
    game.makeMove(0, 1); // X
    game.makeMove(1, 1); // O
    game.makeMove(0, 2); // X - wins

    const state = game.getState();
    expect(state.winner).toBe('X');
    expect(state.isGameOver).toBe(true);
  });

  it('should detect X winning on column', () => {
    game.makeMove(0, 0); // X
    game.makeMove(0, 1); // O
    game.makeMove(1, 0); // X
    game.makeMove(1, 1); // O
    game.makeMove(2, 0); // X - wins

    const state = game.getState();
    expect(state.winner).toBe('X');
    expect(state.isGameOver).toBe(true);
  });

  it('should detect X winning on diagonal', () => {
    game.makeMove(0, 0); // X
    game.makeMove(0, 1); // O
    game.makeMove(1, 1); // X
    game.makeMove(0, 2); // O
    game.makeMove(2, 2); // X - wins

    const state = game.getState();
    expect(state.winner).toBe('X');
    expect(state.isGameOver).toBe(true);
  });

  it('should detect a draw when board is full', () => {
    game.makeMove(0, 1); // X
    game.makeMove(0, 0); // O
    game.makeMove(0, 2); // X
    game.makeMove(1, 2); // O
    game.makeMove(1, 0); // X
    game.makeMove(2, 0); // O
    game.makeMove(1, 1); // X
    game.makeMove(2, 1); // O
    game.makeMove(2, 2); // X

    const state = game.getState();
    expect(state.winner).toBe('draw');
    expect(state.isGameOver).toBe(true);
  });

  it('should reject moves outside bounds', () => {
    expect(game.makeMove(5, 5)).toBe(false);
    expect(game.makeMove(-1, -1)).toBe(false);
  });
});

/**
 * COMPREHENSIVE INTEGRATION TESTS - Testing complete game scenarios
 */
describe('TicTacToeGame - Integration Tests', () => {
  it('should complete a full game with X winning', () => {
    const game = new TicTacToeGame();
    
    // X wins with top row
    expect(game.makeMove(0, 0)).toBe(true);
    expect(game.getState().currentPlayer).toBe('O');
    
    expect(game.makeMove(1, 0)).toBe(true);
    expect(game.getState().currentPlayer).toBe('X');
    
    expect(game.makeMove(0, 1)).toBe(true);
    expect(game.getState().currentPlayer).toBe('O');
    
    expect(game.makeMove(1, 1)).toBe(true);
    expect(game.getState().currentPlayer).toBe('X');
    
    expect(game.makeMove(0, 2)).toBe(true);
    const finalState = game.getState();
    
    expect(finalState.winner).toBe('X');
    expect(finalState.isGameOver).toBe(true);
    expect(finalState.currentPlayer).toBe('X'); // Should not change after game over
  });

  it('should complete a full game with O winning', () => {
    const game = new TicTacToeGame();
    
    // O wins with left column
    expect(game.makeMove(0, 1)).toBe(true); // X
    expect(game.makeMove(0, 0)).toBe(true); // O
    expect(game.makeMove(1, 1)).toBe(true); // X
    expect(game.makeMove(1, 0)).toBe(true); // O
    expect(game.makeMove(2, 2)).toBe(true); // X
    expect(game.makeMove(2, 0)).toBe(true); // O - wins
    
    const state = game.getState();
    expect(state.winner).toBe('O');
    expect(state.isGameOver).toBe(true);
  });

  it('should complete a full game ending in a draw', () => {
    const game = new TicTacToeGame();
    
    // Valid draw scenario: O X X / X X O / O O X
    game.makeMove(0, 1); // X
    game.makeMove(0, 0); // O
    game.makeMove(0, 2); // X
    game.makeMove(1, 2); // O
    game.makeMove(1, 0); // X
    game.makeMove(2, 0); // O
    game.makeMove(1, 1); // X
    game.makeMove(2, 1); // O
    game.makeMove(2, 2); // X
    
    const state = game.getState();
    expect(state.winner).toBe('draw');
    expect(state.isGameOver).toBe(true);
  });

  it('should allow resetting and playing multiple games', () => {
    const game = new TicTacToeGame();
    
    // First game
    game.makeMove(0, 0);
    game.makeMove(0, 1);
    game.makeMove(0, 2);
    
    let state = game.getState();
    expect(state.isGameOver).toBe(false);
    
    // Reset
    game.resetGame();
    state = game.getState();
    expect(state.currentPlayer).toBe('X');
    expect(state.winner).toBeNull();
    expect(state.isGameOver).toBe(false);
    
    // Second game
    game.makeMove(1, 1);
    state = game.getState();
    expect(state.board[1][1]).toBe('X');
    expect(state.currentPlayer).toBe('O');
  });

  it('should handle complex game scenarios with strategic play', () => {
    const game = new TicTacToeGame();
    
    // Simulate a strategic game that ends in a draw
    // O X X / X X O / O O X
    game.makeMove(0, 1); // X
    game.makeMove(0, 0); // O
    game.makeMove(0, 2); // X
    game.makeMove(1, 2); // O
    game.makeMove(1, 0); // X
    game.makeMove(2, 0); // O
    game.makeMove(1, 1); // X
    game.makeMove(2, 1); // O
    game.makeMove(2, 2); // X
    
    const state = game.getState();
    expect(state.winner).toBe('draw');
    expect(state.isGameOver).toBe(true);
  });

  it('should prevent all moves after game ends', () => {
    const game = new TicTacToeGame();
    
    // Create a winning position
    game.makeMove(0, 0); // X
    game.makeMove(1, 0); // O
    game.makeMove(0, 1); // X
    game.makeMove(1, 1); // O
    game.makeMove(0, 2); // X - wins
    
    // Try multiple moves after game is over
    expect(game.makeMove(2, 0)).toBe(false);
    expect(game.makeMove(2, 1)).toBe(false);
    expect(game.makeMove(2, 2)).toBe(false);
    
    const state = game.getState();
    expect(state.board[2][0]).toBeNull();
    expect(state.board[2][1]).toBeNull();
    expect(state.board[2][2]).toBeNull();
  });
});
