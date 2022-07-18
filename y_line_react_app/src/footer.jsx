import footerImage from "./yamanotesen.png";
import './style.css';

const Footer = () => {
    return (
        <>
        <p className="copyright">
            &copy; 山手線ゲーム
        </p>
        <div>
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
            <img src={footerImage} alt="山手線の画像" />
        </div>
        </>
    );
  }
  
  export default Footer;
