import { render, h } from 'preact';
import { GameComponent } from './game/GameComponent';
import './index.css';

function App() {
  return (
    <div className="app">
      <GameComponent />
    </div>
  );
}

const root = document.getElementById('app');
if (root) {
  render(<App />, root);
}
