import React, {useState} from 'react';
// https://zenn.dev/horisan/articles/2aeaf0bd3fb70f v6でhistoryからnavigateに変更になった。
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import axios from 'axios';

// use-sound
import select_sound from './select.mp3';
import already_entered_sound from './already_entered.mp3';

// コンポーネントインポート
import Header from "./header";
import Footer from "./footer";
import Modal from "./Modal";

// ログイン画面
const Login = () => {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [userInfo, setUserInfo] = useState("");

    const navigate = useNavigate();

    // モーダル表示
    const [show, setShow] = useState(false);
    const [modal_msg, setMsg] = useState("b");

    // use-sound
    const [play_select, {}] = useSound(select_sound);
    const [play_already_entered, {}] = useSound(already_entered_sound);

    const handleChangeUserId = (e) => {
        setUserId(e.target.value);
    }
    
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    // 入力チェック
    const checkInput = () => {
        if(userId === "" && password === ""){
            play_already_entered();
            setShow(true);
            setMsg("ユーザ名とパスワードを入力してください。");
            return false;
        }

        if(userId === ""){
            play_already_entered();
            setShow(true);
            setMsg("ユーザ名を入力してください。");
            return false;
        }
        if(password === ""){
            play_already_entered();
            setShow(true);
            setMsg("パスワードを入力してください。");
            return false;
        }
        return true;
    }

    // ユーザテーブルのログインフラグを更新
    const update_user_table = (url, password) => {
        let update_data = {
            password: password,
            login_flg: "1",
            delete_flg: userInfo.delete_flg,
          }

          axios.put(url, update_data)
          .then(response => {
            console.log("テーブルを更新しました。");
          })
          .catch(error => {
            console.log(error);
            return false;
          });
        return true;
    }

    // ログインボタン押下時イベント
    const login = (id) => {
        // 入力チェック
        if(!checkInput()){
            return;
        }

        // バッククウォーテーション
        // let user_get_url = `http://127.0.0.1:8000/y_line_game_app/user/${id}/`;
        let user_get_url = `http://127.0.0.1:8000/y_line_game_app/user/${id}`;
        axios.get(user_get_url).then((response) => {
            setUserInfo(response.data);
            if(response.data.password === password){
                if(update_user_table(user_get_url, password)){
                    play_select();
                    console.log(password);
                    console.log(userInfo.password); /* これはundefinedになることがある。*/
                    navigate('/list');
                }else{
                    play_already_entered();
                    setShow(true);
                    setMsg("データベース接続に失敗しました。");
                    setPassword("");
                }
            }else{
                play_already_entered();
                setShow(true);
                setMsg("ユーザ名かパスワードが誤っています。");
                setPassword("");
            }    
          })
          .catch(error => {
            play_already_entered();
            console.log(error);
            setShow(true);
            setMsg("ユーザ名かパスワードが誤っています。");
            setPassword("");
            return;
          });
    }
    
    return(
        <div className="App">
        <Header />
        <Modal show={show} setShow={setShow} modal_msg={modal_msg}/>
        <h3>ログイン</h3>
        <div className="input_area">
        <label>ユーザ名</label>
            <div>
                {/* onChangeを書かないと、入力することができない。 */}
                <input type="text" value={userId} onChange={handleChangeUserId}/>
            </div>

            <div>
                <label>パスワード</label>
            </div>

            {/* onChangeを書かないと、入力することができない。 */}
            <input type="password" value={password} onChange={handleChangePassword}/>
        
            <div>
                <button onClick={() => login(userId)}>ログイン
                {/* 登録成功後、なぜモーダルが表示されないかといえば、一覧画面への画面遷移が勝っているから。 */}
                {/* <Link to="/list" onClick={createNewTheme}>登録</Link> */}
                </button>
            </div>
        </div>
        <Footer />

        </div>
    )
}

export default Login;
