import { Link } from 'react-router-dom';

import Header from "./header";
import Footer from "./footer";

const Register = () => {
    return (
      <div className="App">
      <Header />
      <Link to="/list">お題一覧</Link>
      <h3>お題登録</h3>
      <div className="input_area">
        <form method="POST">
            <label>お題のタイトル</label>
            <div>
            <input type="text" placeholder="山手線の駅"/>
            </div>

            <div>
            <label>お題の内容</label>
            </div>

            <textarea rows="20" cols="40" placeholder="東京,有楽町,新橋,浜松町,田町,品川,大崎,五反田,目黒,恵比寿,渋谷,原宿,代々木,新宿,新大久保,高田馬場,目白,池袋,大塚,巣鴨,駒込,田端,西日暮里,日暮里,鶯谷,上野,御徒町,秋葉原,神田,高輪ゲートウェイ"></textarea>
            
            <div>
            <input className='button' type="submit" value="登録"/>
            </div>
        </form>      
      </div>
      <Footer />
      </div>
    );
  }
  
  export default Register;
