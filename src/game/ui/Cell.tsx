import { h } from 'preact';
import type { CellValue } from '../core/types';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  disabled: boolean;
  key?: string | number;
}

export function Cell({ value, onClick, disabled }: CellProps) {
  return (
    <button
      className={`cell ${value ? `cell--${value.toLowerCase()}` : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Cell with ${value}` : 'Empty cell'}
    >
      {value}
    </button>
  );
}
