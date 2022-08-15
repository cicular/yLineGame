import React, {useState} from 'react';
// https://zenn.dev/horisan/articles/2aeaf0bd3fb70f v6でhistoryからnavigateに変更になった。
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const handleChangeUserId = (e) => {
        setUserId(e.target.value);
      }
    
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    // 入力チェック
    const checkInput = () => {
        if(userId === "" && password === ""){
            setShow(true);
            setMsg("ユーザ名とパスワードを入力してください。");
            return false;
        }

        if(userId === ""){
            setShow(true);
            setMsg("ユーザ名を入力してください。");
            return false;
        }
        if(password === ""){
            setShow(true);
            setMsg("パスワードを入力してください。");
            return false;
        }
        return true;
    }

    // ユーザテーブルのログインフラグを更新
    const update_user_table = (url) => {
        let update_data = {
            password: userInfo.password,
            login_flg: "1",
            delete_flg: userInfo.delete_flg,
          }

          axios.put(url, update_data)
          .then(response => {
            console.log("テーブルを更新しました。");
            // ここだとtrueが戻り値として返却されない。なぜ？
            // return true;
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
            console.log(response.data);
            setUserInfo(response.data);
          })
          .catch(error => {
            console.log(error);
            setShow(true);
            setMsg("ユーザ名かパスワードが誤っています。");
            setPassword("");
          });
        
        if(userInfo.password === password){
            if(update_user_table(user_get_url)){
                navigate('/list');
            }else{
                setShow(true);
                setMsg("データベース接続に失敗しました。");
                setPassword("");
            }
        }else{
            setShow(true);
            setMsg("ユーザ名かパスワードが誤っています。");
            setPassword("");
        }
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
