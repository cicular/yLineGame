import { Link } from 'react-router-dom';
import axios from 'axios';
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import select_sound from './select.mp3';

// ヘッダー
const Header = (props) => {

  // use-sound
  const [play_select, {}] = useSound(select_sound);

  const navigate = useNavigate();

  // ログアウトボタン押下時イベント
  const logout = () => {
    let url = `http://127.0.0.1:8000/y_line_game_app/user/${props.user_id}`;

    // パスワード取得のためGETリクエスト
    axios.get(url).then((response) => {
      console.log("ログアウト処理：ユーザ情報を取得しました。");
      const update_data = {
        user_id: props.user_id,
        password: response.data.password,
        login_flg: "0",
        delete_flg: response.data.delete_flg,
      }  
      // ログインフラグ更新のためPUTリクエスト
      axios.put(url, update_data)
      .then(response => {
        play_select();
        console.log("ログアウト処理：ログインフラグを更新しました。");
        // replace:trueの場合、ブラウザバックできない。
        navigate('/login', {state:{}, replace:true});
      })
      .catch(error => {
        console.log(error);
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  // 一覧画面
  if(props.type==="1"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
        <Link to="/register" state={{user_id: props.user_id}}><button className='button_margin' onClick={() => play_select()}>お題登録</button></Link>
        <button className='button_margin' onClick={() => logout()}>ログアウト</button>
        <label className='user_id_label'>ログイン中：{props.user_id}さん</label>
      </div>
    );
  }

  // 登録画面
  if(props.type==="2"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
        <Link to="/list" state={{user_id: props.user_id}}><button className='button_margin' onClick={() => play_select()}>お題一覧</button></Link>
        <button className='button_margin' onClick={() => logout()}>ログアウト</button>
        <label className='user_id_label'>ログイン中：{props.user_id}さん</label>
      </div>
    );
  }

  // 編集画面
  if(props.type==="3"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
        <button className='button_margin' onClick={() => logout()}>ログアウト</button>
        <label className='user_id_label'>ログイン中：{props.user_id}さん</label>
      </div>
    );
  }

  // プレイ画面
  if(props.type==="4"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
        <Link to="/list" state={{user_id: props.user_id}}><button className='button_margin' onClick={() => play_select()}>お題一覧</button></Link>
        <Link to="/register" state={{user_id: props.user_id}}><button className='button_margin' onClick={() => play_select()}>お題登録</button></Link>
        <button className='button_margin' onClick={() => logout()}>ログアウト</button>
        <label className='user_id_label'>ログイン中：{props.user_id}さん</label>
      </div>
    );
  }

  // 404画面
  if(props.type==="5"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
        <Link to="/login"><button className='button_margin' onClick={() => play_select()}>ログイン画面へ</button></Link>
      </div>
    );
  }

  // ログイン画面
  if(props.type==="6"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
      </div>
    );
  }  
}
  
export default Header;
