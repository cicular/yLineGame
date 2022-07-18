import Header from "./header";

import './App.css';
import './style.css';

const Play = () => {
    return (
      <div className="App">
      <Header />
        <h1>プレイ</h1>

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

      </div>
    );
  }
  
  export default Play;
