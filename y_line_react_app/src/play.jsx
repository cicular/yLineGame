import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

import Header from "./header";
import Footer from "./footer";

import './App.css';
import './style.css';
// import { getThemeDetail } from './api';

let url1 = 'http://127.0.0.1:8000/y_line_game_app/theme'

const Play = () => {
  const [themeDetail, setThemeDetail] = useState([]);
  // const [bestRecord, setBestRecord] = useState([]);
  const { themeId } = useParams();
  // const [searchParams] = useSearchParams();
  // const themeId = searchParams.get("themeId");

  const [input_value, setInputValue] = useState([]);

  // useEffect(()=> {
    const updateTheme = (tid, iv) => {
      let get_url = `http://127.0.0.1:8000/y_line_game_app/themeDetail/${themeId}`;

      axios.get(get_url).then((response) => {
        console.log(response.data);
        setThemeDetail(response.data);
      });

      // let url = `http://127.0.0.1:8000/y_line_game_app/themeDetail/${themeId}`;
      // https://zenn.dev/uichiyy/scraps/bedfe1c540153d
      let url = `http://127.0.0.1:8000/y_line_game_app/theme2222/${themeId}/`;
      // alert(url);

      let content_value_array = themeDetail.theme_contents.split(",");
      // alert(content_value_array);
      // console.log(content_value_array.length);

      // 正解数
      let num_of_correct = themeDetail.num_of_entered_contents;
      // 不正解数
      let num_of_incorrect = 0;
      // 正誤フラグ
      let correct_flg = false;
      // 残りの数
      let num_of_remaining_contents = themeDetail.num_of_remaining_contents;

      for (const element of content_value_array) {
        // 入力値の正誤判定
        if (iv === element){
          num_of_correct += 1;
          correct_flg = true;
          break;
        }else{
          console.log("不一致");
        }
      }

      if (!correct_flg){
        num_of_incorrect = themeDetail.num_of_incorrect + 1;
      }else{
        num_of_remaining_contents -= 1;
      }

      let entered_contents = themeDetail.entered_contents + ',' + iv;

      // すべて入力した場合
      if (num_of_remaining_contents === 0){
        alert("クリア！！！！");
        // 残りの数をリセット
        num_of_remaining_contents = themeDetail.num_of_contents;
        // 正解数をリセット
        num_of_correct = 0;
        // 不正解数をリセット
        num_of_incorrect = 0;
        // 入力値をリセット
        entered_contents = null;
      }

      // content_value_array.forEach(function(element) {
      //   alert(element)
      // });

      // if(themeDetail.theme_contents.match(iv)){
      //   alert("正解！");
      // }else{
      //   alert("不正解");
      // }

      let update_data = {
        entered_contents: entered_contents,
        user_id:9,
        theme_title: themeDetail.theme_title,
        theme_contents: themeDetail.theme_contents,
        num_of_contents: themeDetail.num_of_contents,
        num_of_remaining_contents: num_of_remaining_contents,
        num_of_entered_contents: num_of_correct,
        num_of_incorrect: num_of_incorrect,
      }

      axios.put(url, update_data)
      .then(response => {
        themeDetail([...themeDetail, response.data])
      })
      .catch(error => {
        console.log(error);
      });
    }
  // },[]);

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
    // const data = getThemeDetail(themeId);
    let url = `http://127.0.0.1:8000/y_line_game_app/themeDetail/${themeId}`;
    console.log(url);
    axios.get(url).then((response) => {
      console.log(response.data);
      setThemeDetail(response.data);
    });
    // ここでログ出力しても空が出力される。
    // console.log(themeDetail);
  },[]);

    return (
      <div className="App">
        <Header />
        <Link to="/list" className='menu'>お題一覧</Link>
        <Link to="/register" className='menu'>お題登録</Link>
        <h3>プレイ</h3>
        {/* <h3>{themeId}</h3> */}
        <h3>お題のタイトル：{themeDetail.theme_title}</h3>
        <div>
            <input type="text" placeholder="神保町" value={ input_value } onChange={(event) => setInputValue(event.target.value)}/>
        </div>

        <div>
          {/* この書き方だと、onClickがクリックしなくても動作してしまう。 */}
          {/* <button onClick={ updateTheme(themeId, input_value) }>Go!</button> */}
          {/* https://zenn.dev/eitches/articles/08526d58abd83b */}
          {/* https://qiita.com/tak001/items/5b51c02700573072f9e4 */}
          <button onClick={() => updateTheme(themeId, input_value)}>Go!</button>
        </div>

        <div>
        <label>現在の正解数：</label>
        <label>{themeDetail.num_of_entered_contents}</label>
        </div>

        <div>
        <label>残りの数：</label>
        <label>{themeDetail.num_of_remaining_contents}</label>
        </div>

        <div>
        <label>不正解数：</label>
        <label>{themeDetail.num_of_incorrect}</label>
        </div>

        <div>
        <label>最高記録：</label>
        <label>{themeDetail.best_record}</label>
        </div>

        <Footer />
      </div>
    );
  }
  
  export default Play;
