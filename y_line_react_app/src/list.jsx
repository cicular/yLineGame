import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from "./header";
import Footer from "./footer";


let themes;
// let url = 'https://jsonplaceholder.typicode.com/posts'
let url = 'http://127.0.0.1:8000/y_line_game_app/theme'

const List = () => {
  const [themes, setThemes] = useState([]);
  // const [themes, setThemes] = useState(null);
  const [themeId, setThemeId] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setThemes(response.data);
      console.log(response.data);
      console.log(response.data.length);
    });
    // ここでログはいても空が出力される。先に24行目が実行されるから。
    console.log(themes);
  }, []);
  // setThemeId(themes.themeId);

  // useEffect(() => {
  //   const getEachTheme = (themeId) => {
  //     alert(themeId);
  //     axios.get(url,{
  //       params:{
  //         theme_id: themeId
  //       }
  //     }).then((response) => {
  //       setThemes(response.data);
  //       console.log(response.data)
  //     });
  //   }    
  // }, []);

    return (
      <div className="App">
      <Header />
      <Link to="/register">お題登録</Link>
        <h1>お題一覧</h1>

        {/* テーブルはブロック要素 */}
        {/* rulesで枠線の表示方法を変更できる */}
        <table className='centering_item' rules='groups'>
          <thead></thead>
          <tbody>
          {/* mapメソッドで展開する場合は、ユニークなkeyを設定する必要があるので注意してください。 */}
          { themes.map((theme) =>
          <tr className='list'>
            <td key={theme.theme_id}>{theme.theme_title}</td>
            <td><Link to={`/play/${theme.theme_id}`}><button>Play</button></Link></td>
            <td>項目数：{theme.num_of_contents}</td>
            <td>最高記録：{theme.best_record}</td>
            {/* <td><button>削除</button></td> */}
          </tr>)}
          </tbody>
        </table>

        <Footer />
      </div>
    );
  }
  
  export default List;
