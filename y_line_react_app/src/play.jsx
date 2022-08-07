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

      let data1 = {
        entered_contents: themeDetail.entered_contents + ',' + iv,
        user_id:9,
        theme_title: themeDetail.theme_title,
        theme_contents: themeDetail.theme_contents,
        num_of_contents: themeDetail.num_of_contents,
        num_of_remaining_contents: themeDetail.num_of_remaining_contents - 1,
        num_of_entered_contents: themeDetail.num_of_entered_contents + 1
      }

      axios.put(url, data1)
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
