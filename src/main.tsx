import { h, render } from 'preact';
import { GameComponent } from './game/GameComponent';

function App() {
  return <GameComponent />;
}

const root = document.getElementById('app');
if (root) {
  render(<App />, root);
}
