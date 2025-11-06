import type { GameState, Board } from './types';

export class TicTacToeGame {
  private state: GameState;
  private readonly size: number;

  constructor(size: number = 3) {
    this.size = size;
    this.state = this.initializeGame();
  }

  private initializeGame(): GameState {
    const board: Board = Array(this.size).fill(null).map(() => 
      Array(this.size).fill(null)
    );
    
    return {
      board,
      currentPlayer: 'X',
      winner: null,
      isGameOver: false
    };
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public makeMove(row: number, col: number): boolean {
    if (this.state.isGameOver || row < 0 || row >= this.size || col < 0 || col >= this.size || this.state.board[row][col] !== null) {
      return false;
    }

    // Make the move
    this.state.board[row][col] = this.state.currentPlayer;

    // Check for a winner
    if (this.checkWin(row, col)) {
      this.state.winner = this.state.currentPlayer;
      this.state.isGameOver = true;
    } else if (this.isBoardFull()) {
      this.state.winner = 'draw';
      this.state.isGameOver = true;
    } else {
      // Switch players
      this.state.currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    }

    return true;
  }

  public resetGame(): void {
    this.state = this.initializeGame();
  }

  private checkWin(row: number, col: number): boolean {
    const player = this.state.board[row][col];
    if (!player) return false;

    // Check row
    if (this.state.board[row].every(cell => cell === player)) {
      return true;
    }

    // Check column
    if (this.state.board.every(r => r[col] === player)) {
      return true;
    }

    // Check diagonals
    if (row === col) {
      // Main diagonal
      if (this.state.board.every((r, i) => r[i] === player)) {
        return true;
      }
    }

    if (row + col === this.size - 1) {
      // Other diagonal
      if (this.state.board.every((r, i) => r[this.size - 1 - i] === player)) {
        return true;
      }
    }

    return false;
  }

  private isBoardFull(): boolean {
    return this.state.board.every(row => 
      row.every(cell => cell !== null)
    );
  }
}
