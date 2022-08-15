import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import useSound from 'use-sound';

// コンポーネント
import Header from "./header";
import Footer from "./footer";
import Modal from './Modal';
import NotFoundPage  from './NotFound';

// use-sound
// Relative imports outside of src/ are not supported.
import select_sound from './select.mp3';

// 一覧画面
const List = () => {
  const [themes, setThemes] = useState([]);

  // モーダル表示
  const [show, setShow] = useState(false);
  const [modal_msg, setMsg] = useState("b");

  // use-sound
  const [play_select, {}] = useSound(select_sound);

  // useLocation
  const location = useLocation();

  // 削除ボタン押下時
  const deleteTheme = (tid, title) => {
    // ★★★バッククウォーテーション　最後にバックスラッシュ
    let delete_url = `http://127.0.0.1:8000/y_line_game_app/theme2222/${tid}/`;
    // 音声再生
    play_select();

    // レコード物理削除
    axios.delete(delete_url)
    .then(response => {
      setShow(true);
      setMsg(title + "を削除しました！");
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    if (location.state != null){
      console.log("取得開始");
      let get_url = `http://127.0.0.1:8000/y_line_game_app/theme/${location.state.user_id}`;
      axios.get(get_url).then((response) => {
        setThemes(response.data);
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });  
    }
  }, [show]);

  // ユーザ情報がない場合
  if(location.state === null){
    return(
      <NotFoundPage />
    )
  }
    return (
      <div className="App">
      <Header type="1" user_id={location.state.user_id}/>
      <h3>お題一覧</h3>
      <Modal show={show} setShow={setShow} modal_msg={modal_msg}/>

        {/* テーブルはブロック要素 */}
        {/* rulesで枠線の表示方法を変更できる */}
        <table className={'centering_item color_green'} rules='groups'>
          <thead></thead>
          <tbody>
          {/* mapメソッドで展開する場合は、ユニークなkeyを設定する必要があるので注意してください。 */}
          { themes.map((theme) =>
          <tr className='list'>
            <td key={theme.theme_id}>{theme.theme_title}</td>
            <td><Link to={`/play/${theme.theme_id}`} state={{user_id: location.state.user_id}}><button onClick={() => play_select()}>Play</button></Link></td>
            <td>項目数：{theme.num_of_contents}</td>
            <td>最高記録：{theme.best_record}</td>
            <td><Link to={`/edit/${theme.theme_id}`} state={{user_id: location.state.user_id}}><button onClick={() => play_select()}>編集</button></Link></td>
            <td><button onClick={() => deleteTheme(theme.theme_id, theme.theme_title)}>削除</button></td>
          </tr>)}
          </tbody>
        </table>

        <Footer />
      </div>
    );
  }
  
  export default List;
