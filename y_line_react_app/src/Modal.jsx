import { Link } from 'react-router-dom';

// モーダル
const Modal = ({show, setShow, modal_msg, user_id}) => {

  console.log(user_id);

  if (show) {
    if(typeof user_id != 'undefined'){
      return (
        <div id="overlay">
          <div id="content">
            <p>{modal_msg}</p>
            <Link to="/list" state={{user_id: user_id}}><button onClick={() => setShow(false)}>お題一覧へ</button></Link>
          </div>
        </div >
      )
    }else{
      return (
        <div id="overlay">
          <div id="content">
            <p>{modal_msg}</p>
            <button onClick={() => setShow(false)}>Close</button>
          </div>
        </div >
      )
    }      
  }
}

export default Modal;
