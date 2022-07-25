import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from "./header";
import Footer from "./footer";
// import Register from './register';

let themes;
// let url = 'https://jsonplaceholder.typicode.com/posts'
let url = 'http://127.0.0.1:8000/y_line_game_app/theme'

const List = () => {
  const [themes, setThemes] = useState([]);
  // const [themes, setThemes] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setThemes(response.data);
      // const themes = response.data;
      console.log(response.data)
      alert(response.data)
    });
  }, []);

    // これは表示できるけど、axios内だとundefinedになってしまう。
    // const themes = "こんにちは"

    // axios.get(url).then((response) => {
    //   themes = response.data;
    //   console.log(themes);
    //   alert(themes)
    //   });

      // var data = JSON.parse(JSON.stringify(themes));
      // console.log(data);

    // if (!themes) return null;

    return (
      <div className="App">
      <Header />
      <Link to="/register">お題登録</Link>
        <h1>お題一覧</h1>
        {/* <table>
          <thead>
            <tr>
              <th>タイトル</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table> */}
        {/* <ul> */}
        {/* {res.data} */}

        <div>
        {/* { themes[0]} */}
        </div>

        <ul>
        {/* { themes } */}
        {/* { themes[0]} */}
        { themes.map(theme => <li>{theme.theme_title}</li>)}
      </ul>

        <Footer />
      </div>
    );
  }
  
  export default List;
