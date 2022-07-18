import Register from './register';
import List from './list';
import Play from './play';

import './App.css';
import './style.css';

const App = () => {
  return (
    <div className="App">
      <header>山手線ゲーム</header>
      <Register />
      <Play />
      <List />
    </div>
  );
}

export default App;
