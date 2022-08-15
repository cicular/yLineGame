import { BrowserRouter, Routes, Route } from 'react-router-dom';

// コンポーネントインポート
import Login from './login';
import Register from './register';
import List from './list';
import Play from './play';
import Edit from './edit';
import NotFoundPage  from './NotFound';

import './App.css';
import './style.css';

const App = () => {
  return (
    // 「BrowserRouter」は、Reactプロジェクトの中で一度しか使えない。
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />} />
    <Route path="/edit/:themeId" element={ <Edit /> } />
    <Route path="/list" element={<List />} />
    <Route path="/play/:themeId" element={ <Play />} />
    <Route path="*" element={<NotFoundPage />} />
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
