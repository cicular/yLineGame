import { Link } from 'react-router-dom';

import Header from "./header";
import Footer from "./footer";

const List = () => {
    return (
      <div className="App">
      <Header />
      <Link to="/register">お題登録</Link>
        <h1>お題一覧</h1>
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
        <Footer />
      </div>
    );
  }
  
  export default List;
