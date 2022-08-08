const Modal2 = ({show, setShow, modal_msg}) => {
    if (show) {
        return (
          <div id="overlay">
            <div id="content">
              <p>{modal_msg}</p>
              {/* <button onClick={() => setShow(false)}>Close</button> */}
            </div>
          </div >
        )
    } else {
        return null;
    }
}

export default Modal2;
