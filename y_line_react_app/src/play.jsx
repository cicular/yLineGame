import { Link } from 'react-router-dom';

import Header from "./header";
import Footer from "./footer";

import './App.css';
import './style.css';

const Play = () => {
    return (
      <div className="App">
        <Header />
        <Link to="/list" className='menu'>お題一覧</Link>
        <Link to="/register" className='menu'>お題登録</Link>
        <h3>プレイ</h3>
        <div>
            <input type="text" placeholder="神保町"/>
        </div>

        <div>
            <input className='button' type="submit" value="Go!"/>
        </div>

        <div>
        <label>現在の正解数：</label>
        <label>0</label>
        </div>

        <div>
        <label>残りの数：</label>
        <label>0</label>
        </div>

        <div>
        <label>不正解数：</label>
        <label>0</label>
        </div>

        <div>
        <label>最高記録：</label>
        <label>0</label>
        </div>

        <Footer />
      </div>
    );
  }
  
  export default Play;
