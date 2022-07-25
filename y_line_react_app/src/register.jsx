import { Link } from 'react-router-dom';
import axios from 'axios';
import React, {useState, useEffect} from 'react'

import Header from "./header";
import Footer from "./footer";

// axios.post('http://127.0.0.1:8000/listapp/needtobuy/', 登録データ, {
// headers: {'Content-Type' : 'application:json'}
// })
// .then(res => console.log(res.data))

// const createNewUser = () => {
//   const [users, setUsers] = useState([]);

//   axios.post('https://jsonplaceholder.typicode.com/users', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
//   .then(response => {
//     setUsers([...users, response.data])
//   })
//   .catch(error => {
//     console.log(error);
//   });
// }

let url = 'http://127.0.0.1:8000/y_line_game_app/theme'

const Register = () => {
  const [theme, setTheme] = useState([]);
  const [themeTitle, setThemeTitle] = useState([]);
  const [themeContents, setThemeContents] = useState([]);

  const createNewTheme = () => {
    alert(themeTitle)
    axios.post(url, {
      theme_title: themeTitle,
      theme_contents: themeContents,
      user_id: 1,
      num_of_plays: 0,
      num_of_contents: 0,
      public_flg: '1',
      delete_flg: '0',
    })
    .then(response => {
      setTheme([...theme, response.data])
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleChangeTitle = (e) => {
    setThemeTitle(e.target.value)
  }

  const handleChangeContents = (e) => {
    setThemeContents(e.target.value)
  }

  // function updatePost() {
  //   axios
  //     .put(`${baseURL}/1`, {
  //       title: "Hello World!",
  //       body: "This is an updated post."
  //     })
  //     .then((response) => {
  //       setPost(response.data);
  //     });
  // }

    return (
      <div className="App">
      <Header />
      <Link to="/list">お題一覧</Link>
      <h3>お題登録</h3>
      <div className="input_area">
        <form method="POST">
            <label>お題のタイトル</label>
            <div>
            {/* onChangeを書かないと、入力することができない。 */}
            <input type="text" placeholder="山手線の駅" value={themeTitle} onChange={handleChangeTitle}/>
            </div>

            <div>
            <label>お題の内容</label>
            </div>

            {/* onChangeを書かないと、入力することができない。 */}
            <textarea value={themeContents} onChange={handleChangeContents} rows="20" cols="40" placeholder="東京,有楽町,新橋,浜松町,田町,品川,大崎,五反田,目黒,恵比寿,渋谷,原宿,代々木,新宿,新大久保,高田馬場,目白,池袋,大塚,巣鴨,駒込,田端,西日暮里,日暮里,鶯谷,上野,御徒町,秋葉原,神田,高輪ゲートウェイ"></textarea>
            
            <div>
              {/* <input className='button' type="submit" value="登録" onClick={createNewTheme}/> */}
              <button>
                <Link to="/list" onClick={createNewTheme}>登録</Link>
              </button>
            </div>
        </form>
      </div>
      <Footer />
      </div>
    );
  }
  
  export default Register;
