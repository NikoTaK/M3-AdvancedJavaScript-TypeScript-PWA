import { h } from 'preact';
import type { Board as BoardType } from '../types';
import { Cell } from './Cell';

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
  disabled: boolean;
}

export function Board({ board, onCellClick, disabled }: BoardProps) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              disabled={disabled || cell !== null}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
