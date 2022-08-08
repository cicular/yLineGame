import { Link } from 'react-router-dom';
import axios from 'axios';
import React, {useState} from 'react'

import Header from "./header";
import Footer from "./footer";
import Modal from './Modal';

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

const Register = () => {
  let url = 'http://127.0.0.1:8000/y_line_game_app/theme'

  const [theme, setTheme] = useState([]);
  const [themeTitle, setThemeTitle] = useState("");
  const [themeContents, setThemeContents] = useState("");

  // モーダル表示
  const [show, setShow] = useState(false);
  const [modal_msg, setMsg] = useState("b");

  const createNewTheme = () => {
    if(themeTitle === ""){
      setShow(true);
      setMsg("タイトルを入力してください。");
      return;
    }else if(themeContents === ""){
      setShow(true);
      setMsg("内容を入力してください。");
      return;
    }else if(themeTitle.length > 200){
      setShow(true);
      setMsg("タイトルは200字以内にしてください。");
    }

    const contents_array = themeContents.split(",");
    const numOfContents = contents_array.length;

    axios.post(url, {
      theme_title: themeTitle,
      theme_contents: themeContents,
      entered_contents: 0,
      user_id: 1,
      num_of_plays: 0,
      num_of_contents: numOfContents,
      num_of_remaining_contents: numOfContents,
      public_flg: '1',
      delete_flg: '0',
    })
    .then(response => {
      setTheme([...theme, response.data])
      setShow(true);
      setMsg("登録しました！");
      // テキストボックスを初期化
      setThemeTitle("");
      setThemeContents("");
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
      <Modal show={show} setShow={setShow} modal_msg={modal_msg}/>
      <h3>お題登録</h3>
      <div className="input_area">
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
            <button onClick={createNewTheme}>登録
              {/* 登録画面でなぜモーダルが表示されないかといえば、一覧画面への画面遷移が勝っているから。 */}
              {/* <Link to="/list" onClick={createNewTheme}>登録</Link> */}
            </button>
          </div>
      </div>
      <Footer />
      </div>
    );
  }
  
  export default Register;
