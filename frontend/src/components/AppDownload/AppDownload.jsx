import { assets } from "../../assets/assets";
import "./AppDownload.css";

const AppDownload = () => {
  return (
      <div className='app-download' id="app-download">
          <h2>For Better Experience Download <br />Tomato App</h2>
          <div className="app-downloader">
              <img src={assets.app_store} alt="" />
              <img src={assets.play_store} alt="" />
          </div>
    </div>
  )
}

export default AppDownload