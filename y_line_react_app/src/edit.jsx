import { Link } from 'react-router-dom';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import useSound from 'use-sound';

// コンポーネントインポート
import Header from "./header";
import Footer from "./footer";
import Modal from './Modal';

// use-sound
// Relative imports outside of src/ are not supported.
import select_sound from './select.mp3';
import cancel_sound from './cancel.mp3';

// 編集画面
const Edit = () => {

  const [themeDetail, setThemeDetail] = useState([]);
  const [themeTitle, setThemeTitle] = useState("");
  const [themeContents, setThemeContents] = useState("");
  const { themeId } = useParams();

  // モーダル表示
  const [show, setShow] = useState(false);
  const [modal_msg, setMsg] = useState("b");

  // use-sound
  const [play_select, {}] = useSound(select_sound);
  const [play_cancel, {}] = useSound(cancel_sound);

  useEffect(()=> {
    let get_url = `http://127.0.0.1:8000/y_line_game_app/themeDetail/${themeId}`;
    console.log(get_url);
    axios.get(get_url).then((response) => {
      console.log(response.data);
      setThemeDetail(response.data);
      // themeDetail.theme_titleだと初期表示がされない。response.data.theme_titleだと表示される。
      setThemeTitle(response.data.theme_title);
      setThemeContents(response.data.theme_contents);
      console.log(themeTitle);
      console.log(themeContents);
    });
    // ここでログ出力しても空が出力される。
    // console.log(themeDetail);
  },[]);

  // 更新ボタン押下時
  const updateTheme = () => {
    let update_url = `http://127.0.0.1:8000/y_line_game_app/theme2222/${themeId}/`;

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

    let update_data = {
        user_id: 9,
        theme_title: themeTitle,
        theme_contents: themeContents,
        num_of_contents: numOfContents,
        num_of_entered_contents: themeDetail.num_of_entered_contents,
        num_of_incorrect: themeDetail.num_of_incorrect,
      }
  
      axios.put(update_url, update_data)
      .then(response => {
        // 音声再生
        play_select();
        // モーダル表示
        setShow(true);
        setMsg("更新しました！");  
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

  return (
    <div className="App">
    <Header />
    <Link to="/list">お題一覧</Link>
    <Modal show={show} setShow={setShow} modal_msg={modal_msg}/>
    <h3>お題編集</h3>
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
          <button className='button_margin' onClick={updateTheme}>更新</button>
          <Link to="/list"><button className='button_margin' onClick={() => play_cancel()}>戻る</button></Link>
        </div>
    </div>
    <Footer />
    </div>
  );
}
  
export default Edit;
