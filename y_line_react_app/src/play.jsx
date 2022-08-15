import { useParams, useLocation } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import useSound from 'use-sound';
import axios from 'axios';

// コンポーネント
import Header from "./header";
import Footer from "./footer";
import Modal from "./Modal";
import Modal2 from "./Modal2";
import EnteredValueTable from './enteredValueTable';

import './App.css';
import './style.css';

// use-sound
// Relative imports outside of src/ are not supported.
import correct_sound from './correct.mp3';
import incorrect_sound from './incorrect.mp3';
import already_entered_sound from './already_entered.mp3';
import clear_sound from './clear.mp3';
import game_over_sound from './game_over.mp3';

// プレイ画面
const Play = () => {
  const [themeDetail, setThemeDetail] = useState([]);
  const { themeId } = useParams();
  const [input_value, setInputValue] = useState([]);
  const [entered_value_array, setEnteredValueArray] = useState([]);

  // モーダル表示
  const [show, setShow] = useState(false);
  const [modal_msg, setMsg] = useState("a");
  const [show2, setShow2] = useState(false);
  const [modal_msg2, setMsg2] = useState("b");

  // use-sound
  const [play_correct, {}] = useSound(correct_sound);
  const [play_incorrect, {}] = useSound(incorrect_sound);
  const [play_already_entered, {}] = useSound(already_entered_sound);
  const [play_clear, {}] = useSound(clear_sound);
  const [play_game_over, {}] = useSound(game_over_sound);

  // useLocation
  const location = useLocation();
  
  // Goボタン押下時の処理
  const updateTheme = (tid, iv) => {
    console.log("Goボタンを押した。");

    let get_url = `http://127.0.0.1:8000/y_line_game_app/themeDetail/${themeId}`;

    // 照合のためのデータ取得
    axios.get(get_url).then((response) => {
      setThemeDetail(response.data);
      console.log("プレイ画面：Themeテーブルからデータを取得しました。");
    })
    .catch(error => {
      console.log(error);
      return;
    });

    // let url = `http://127.0.0.1:8000/y_line_game_app/themeDetail/${themeId}`;
    // https://zenn.dev/uichiyy/scraps/bedfe1c540153d
    let update_url = `http://127.0.0.1:8000/y_line_game_app/theme2222/${themeId}/`;

    let content_value_array = themeDetail.theme_contents.split(",");
      
    // 正解数
    let num_of_correct = themeDetail.num_of_entered_contents;
    // 不正解数
    let num_of_incorrect = 0;
    // 正誤フラグ
    let correct_flg = false;
    // 残りの数
    let num_of_remaining_contents = themeDetail.num_of_remaining_contents;
    // 最高記録
    let best_record = 0;

    let entered_contents_array = [];
    if(themeDetail.entered_contents != null){
      entered_contents_array = themeDetail.entered_contents.split(",");
    }

    let is_already_entered = false;

    // お題の内容一覧と照合
    for (const element of content_value_array) {
      // 入力値の正誤判定
      if (iv === element){
        // 一致した場合、既出値と照合
        for (const ele of entered_contents_array) {
          if (iv === ele){
            // 音声再生
            play_already_entered();
            // モーダル表示
            setShow(true);
            setMsg("既に入力されています！");
            is_already_entered = true;
            break;
          }
        }
        // 既出値でない場合＝正解
        if (!is_already_entered){
          num_of_correct += 1;
          correct_flg = true;
          // document.getElementById("answer_input").value = "";
          // テキストボックスの値を初期化。
          setInputValue("");
          break;
        }
      }else{
        // console.log("不一致");
      }
    }

    // 既出値でない場合
    if (!is_already_entered){
      if (!correct_flg){
        num_of_incorrect = themeDetail.num_of_incorrect + 1;
        // テキストボックスの値を初期化。
        setInputValue("");
        if (num_of_incorrect === 3){
          // 音声再生
          play_game_over();
          // モーダル表示
          setShow(true);
          setMsg('ゲームオーバー！3回間違えました！');
        }else{
          // 音声再生
          play_incorrect();
          // モーダル表示
          const output = () => setShow2(false);
          setShow2(true);
          setMsg2("間違いです");
          setTimeout(output, 700);
        }
      }else{
        // 音声再生
        play_correct();
        num_of_remaining_contents -= 1;
        // モーダル表示
        const output = () => setShow2(false);
        setShow2(true);
        setMsg2("正解！");
        setTimeout(output, 700);
      }

      let entered_contents;
      // entered_contentsには正解値のみ入れる。
      if(correct_flg){
        // この判定を入れないと、「null」が文字列データと化してしまう。
        if (themeDetail.entered_contents != null){
          entered_contents = themeDetail.entered_contents + ',' + iv;
        }else{
          // 初回入力時（nullの場合）
          entered_contents = iv;
        }
        setEnteredValueArray(entered_contents.split(","));
      }else{
        // 変更なし
        entered_contents = themeDetail.entered_contents;
      }

      if (num_of_remaining_contents === 0){
        // 音声再生
        play_clear();
        // モーダル表示
        setShow(true);
        setMsg("クリア！！すべて回答しました！！");
      }
  
      // すべて入力した場合もしくはゲームオーバー時
      if (num_of_remaining_contents === 0 || num_of_incorrect === 3){
        if(num_of_remaining_contents ===0){
          // 最高記録
          // 入力された正解値の数が最高記録を超えている場合
          // テーブル更新前の値で比較をしてしまっていたので修正。
          console.log(themeDetail.num_of_entered_contents + 1);
          console.log(themeDetail.best_record);
          if(themeDetail.num_of_entered_contents + 1> themeDetail.best_record){
            best_record = themeDetail.num_of_entered_contents + 1;
          }else{
            best_record = themeDetail.best_record;
          }
        }else{
          // 最高記録
          // 入力された正解値の数が最高記録を超えている場合
          console.log(themeDetail.num_of_entered_contents);
          console.log(themeDetail.best_record);
          if(themeDetail.num_of_entered_contents > themeDetail.best_record){
            best_record = themeDetail.num_of_entered_contents;
          }else{
            best_record = themeDetail.best_record;
          }
        }
        // 残りの数をリセット
        num_of_remaining_contents = themeDetail.num_of_contents;
        // 正解数をリセット
        num_of_correct = 0;
        // 不正解数をリセット
        num_of_incorrect = 0;
        // 入力値をリセット 空文字で更新しようとするとBad Requestになる。。。
        entered_contents = null;
      }else{
        best_record = themeDetail.best_record;
      }
  
      let update_data = {
        entered_contents: entered_contents,
        user_id: location.state.user_id,
        theme_title: themeDetail.theme_title,
        theme_contents: themeDetail.theme_contents,
        num_of_contents: themeDetail.num_of_contents,
        num_of_remaining_contents: num_of_remaining_contents,
        num_of_entered_contents: num_of_correct,
        num_of_incorrect: num_of_incorrect,
        best_record: best_record,
      }
  
      axios.put(update_url, update_data)
      .then(response => {
        setThemeDetail(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  // useEffect(()=> {
    const getThemeDetail = (tid, iv) => {

      console.log("getThemeDetail!!!!!!!!!!!!!!!!!!!!!11");
      console.log(tid)
      // let url = 'http://127.0.0.1:8000/y_line_game_app/themeDetail$1'
      // let url = 'http://127.0.0.1:8000/y_line_game_app/themeDetail/1'
      let url = `http://127.0.0.1:8000/y_line_game_app/themeDetail/${themeId}`;
      console.log(url);
      axios.put(url).then((response) => {
          console.log(response.data);
      //   return toJson(response);
          setThemeDetail(response.data);
        });
    }
  // },[]);

  useEffect(()=> {
    console.log("プレイ画面での取得開始 useEffectの実行");
    // const data = getThemeDetail(themeId);
    let url = `http://127.0.0.1:8000/y_line_game_app/themeDetail/${themeId}`;
    axios.get(url).then((response) => {
      setThemeDetail(response.data);
      if(response.data.entered_contents != null){
        setEnteredValueArray(response.data.entered_contents.split(","));
      }
    });
    // ここでログ出力しても状態反映されていなくて空が出力される。
    // console.log(themeDetail);
  },[]);

    return (
      <div className="App">
        <Modal show={show} setShow={setShow} modal_msg={modal_msg}/>
        <Modal2 show={show2} setShow={setShow2} modal_msg={modal_msg2}/>
        <Header type="4" user_id={location.state.user_id}/>
        <h3>{themeDetail.theme_title}</h3>
        <div>
            <input type="text" placeholder="" value={ input_value } onChange={(event) => setInputValue(event.target.value)}/>
        </div>

        <div>
          {/* テーブル更新処理 */}
          <button className='button_margin' onClick={() => updateTheme(themeId, input_value)}>Go!</button>
        </div>

        <table className={'centering_item color_blue'} rules='groups'>
          <thead></thead>
          <tbody>
            <tr>
              <td>現在の正解数：</td>
              <td>{themeDetail.num_of_entered_contents}</td>
            </tr>
            <tr>
              <td>残りの数：</td>
              <td>{themeDetail.num_of_remaining_contents}</td>
            </tr>
            <tr>
              <td>不正解数：</td>
              <td>{themeDetail.num_of_incorrect}</td>
            </tr>
            <tr>
              <td>最高記録</td>
              <td>{themeDetail.best_record}</td>
            </tr>
          </tbody>
        </table>

        <EnteredValueTable value={entered_value_array} themeDetail={themeDetail} user_id={location.state.user_id}/>
        {/* これだとpropsを渡してもundefinedになってしまう */}
        {/* <EnteredValueTable value={themeDetail.entered_contents} /> */}

        <Footer />
      </div>
    );
  }
  
  export default Play;
