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

const Play = () => {
  const [themeDetail, setThemeDetail] = useState([]);
  // const [bestRecord, setBestRecord] = useState([]);
  const { themeId } = useParams();
  // const [searchParams] = useSearchParams();
  // const themeId = searchParams.get("themeId");

  const getThemeDetail = (themeId) => {
    console.log("getThemeDetail");
    console.log(themeId)
    // let url = 'http://127.0.0.1:8000/y_line_game_app/themeDetail$1'
    // let url = 'http://127.0.0.1:8000/y_line_game_app/themeDetail/1'
    let url = `http://127.0.0.1:8000/y_line_game_app/themeDetail/${themeId}`;
    console.log(url);
    axios.get(url).then((response) => {
        console.log(response.data);
    //   return toJson(response);
        return response.data;
    });
  }


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
        <h3>{themeId}</h3>
        <h3>{themeDetail.theme_title}</h3>
        <div>
            <input type="text" placeholder="神保町"/>
        </div>

        <div>
            <input className='button' type="submit" value="Go!"/>
        </div>

        <div>
        <label>現在の正解数：</label>
        <label>0</label>
        </div>

        <div>
        <label>残りの数：</label>
        <label>0</label>
        </div>

        <div>
        <label>不正解数：</label>
        <label>0</label>
        </div>

        <div>
        <label>最高記録：</label>
        <label>0</label>
        </div>

        <Footer />
      </div>
    );
  }
  
  export default Play;
