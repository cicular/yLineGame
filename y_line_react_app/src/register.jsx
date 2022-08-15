import axios from 'axios';
import React, {useState} from 'react';
import useSound from 'use-sound';
import { useLocation } from "react-router-dom";

// コンポーネント
import Header from "./header";
import Footer from "./footer";
import Modal from './Modal';
import NotFoundPage  from './NotFound';

// use-sound
// Relative imports outside of src/ are not supported.
import select_sound from './select.mp3';
import already_entered_sound from './already_entered.mp3';

// 登録画面
const Register = () => {
  let post_url = 'http://127.0.0.1:8000/y_line_game_app/theme2222/';

  const [theme, setTheme] = useState([]);
  const [themeTitle, setThemeTitle] = useState("");
  const [themeContents, setThemeContents] = useState("");

  // モーダル表示
  const [show, setShow] = useState(false);
  const [modal_msg, setMsg] = useState("b");

  // use-sound
  const [play_select, {}] = useSound(select_sound);
  const [play_already_entered, {}] = useSound(already_entered_sound);
  
  // useLocation
  const location = useLocation();

  // 登録ボタン押下時
  const createNewTheme = () => {
    if(themeTitle === ""){
      play_already_entered();
      setShow(true);
      setMsg("タイトルを入力してください。");
      return;
    }else if(themeContents === ""){
      play_already_entered();
      setShow(true);
      setMsg("内容を入力してください。");
      return;
    }else if(themeTitle.length > 200){
      play_already_entered();
      setShow(true);
      setMsg("タイトルは200字以内にしてください。");
      return;
    }

    const contents_array = themeContents.split(",");
    const numOfContents = contents_array.length;

    if (location.state != null){
      // 新規追加のリクエスト
      axios.post(post_url, {
        theme_title: themeTitle,
        theme_contents: themeContents,
        entered_contents: null,
        user_id: location.state.user_id,
        num_of_plays: 0,
        num_of_contents: numOfContents,
        num_of_remaining_contents: numOfContents,
        public_flg: '1',
        delete_flg: '0',
      })
      .then(response => {
        setTheme(response.data);
        // 音声再生
        play_select();
        // モーダル表示
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
  }

  const handleChangeTitle = (e) => {
    setThemeTitle(e.target.value)
  }

  const handleChangeContents = (e) => {
    setThemeContents(e.target.value)
  }

  // ユーザ情報がない場合
  if(location.state === null){
    return(
      <NotFoundPage />
    )
  }
  
  return (
    <div className="App">
    <Header type="2" user_id={location.state.user_id}/>
    <Modal show={show} setShow={setShow} modal_msg={modal_msg} user_id={location.state.user_id}/>
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
          {/* あれ？これ何回も実行されないの？ */}
          <button onClick={createNewTheme}>登録
            {/* 登録成功後、なぜモーダルが表示されないかといえば、一覧画面への画面遷移が勝っているから。 */}
            {/* <Link to="/list" onClick={createNewTheme}>登録</Link> */}
          </button>
        </div>
    </div>
    <Footer />
    </div>
  );
}
  
export default Register;
