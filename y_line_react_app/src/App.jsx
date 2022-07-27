import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './register';
import List from './list';
import Play from './play';

import './App.css';
import './style.css';

const App = () => {
  return (
    // 「BrowserRouter」は、Reactプロジェクトの中で一度しか使えない。
    <BrowserRouter>
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/list" element={<List />} />
    <Route path="/play/:themeId" element={ <Play />} />
    {/* <Route path="/play" element={ <Play />} /> */}

    </Routes>
    <div className="App">
      {/* <header>山手線ゲーム</header> */}
      {/* <Register />
      <Play />
      <List /> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
