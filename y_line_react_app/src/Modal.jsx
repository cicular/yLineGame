const Modal = ({show, setShow}) => {
    if (show) {
        return (
          <div id="overlay">
            <div id="content">
              <p>クリア！すべてを回答しました！！</p>
              <button onClick={() => setShow(false)}>Close</button>
            </div>
          </div >
        )
    } else {
        return null;
    }
}

export default Modal;
