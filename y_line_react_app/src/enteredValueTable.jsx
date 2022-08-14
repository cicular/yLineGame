import axios from 'axios';
import React, {useState} from 'react';
import useSound from 'use-sound';

// コンポーネントインポート
import Modal from "./Modal";

// use-sound
// Relative imports outside of src/ are not supported.
import select_sound from './select.mp3';

// 既出の正解値テーブル
const EnteredValueTable = (props) => {
    // モーダル表示
    const [show, setShow] = useState(false);
    const [modal_msg, setMsg] = useState("a");

    // use-sound
    const [play_select, {}] = useSound(select_sound);

    // 親配列
    let entered_value_array_parent = [];
    // 子配列
    let entered_value_array_child = [];

    // 多重配列化。
    for(let i=0; i<props.value.length; i++){    
        entered_value_array_child.push(props.value[i]);
        if(entered_value_array_child.length === 2 || i === props.value.length-1){
            entered_value_array_parent.push(entered_value_array_child);
            entered_value_array_child = [];
        }
    }

    // console.log(entered_value_array_parent);

    // リセットボタン押下時
    const reset = (tDetail) => {
        let update_url = `http://127.0.0.1:8000/y_line_game_app/theme2222/${tDetail.theme_id}/`;

        let update_data = {
            // 入力値をリセットする
            entered_contents: null,
            user_id:9,
            theme_title: tDetail.theme_title,
            theme_contents: tDetail.theme_contents,
            num_of_contents: tDetail.num_of_contents,
            num_of_remaining_contents: tDetail.num_of_contents,
            num_of_entered_contents: 0,
            num_of_incorrect: 0,
          };
      
          axios.put(update_url, update_data)
          .then(response => {
            // 音声再生
            play_select();
            // モーダル表示
            setShow(true);
            setMsg("入力値をリセットしました！");            
            console.log("テーブルを更新した2。")
          })
          .catch(error => {
            console.log(error);
          });
    }

    if(entered_value_array_parent.length != 0){
        return (
            <div>
                <Modal show={show} setShow={setShow} modal_msg={modal_msg}/>
                <div>入力した正解値</div>
                <button onClick={() => reset(props.themeDetail)}>リセット</button>
                <table className={'centering_item color_blue'} border="1">
                    <thead></thead>
                    <tbody>
                    { entered_value_array_parent.map((theme) =>
                    <tr className='entered_value_table'>
                        <td>{theme[0]}</td>
                        <td>{theme[1]}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        );    
    }
}

export default EnteredValueTable;
