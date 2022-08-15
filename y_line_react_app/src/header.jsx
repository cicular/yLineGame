import { Link } from 'react-router-dom';

// ヘッダー
const Header = (props) => {

  // 一覧画面
  if(props.type==="1"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
        <Link to="/register"><button className='button_margin'>お題登録</button></Link>
      </div>
    );
  }

  // 登録画面
  if(props.type==="2"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
        <Link to="/list"><button className='button_margin'>お題一覧</button></Link>
      </div>
    );
  }

  // 編集画面、ログイン画面
  if(props.type==="3"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
      </div>
    );
  }

  // プレイ画面
  if(props.type==="4"){
    return (
      <div className={'App header_area'}>
        <header className='button_margin'>山手線ゲーム</header>
        <Link to="/list"><button className='button_margin'>お題一覧</button></Link>
        <Link to="/register"><button className='button_margin'>お題登録</button></Link>
      </div>
    );
  }
}
  
export default Header;
