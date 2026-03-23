import "../../App.css"
import logoImage from "../../assets/logo.png"
import bannerImage from "../../assets/images/banner.png";
const Logo=()=>{
    return (
        <header className="header">
        <div className="container">
          <div className="logo">
            <img src={logoImage} width={247} height={62} />
          </div>
          <div className="ad-banner">
            <img src={bannerImage} width={771} height={97} />
            <span className='banner-text'>Best Selling BLOG and MAGAZINE Theme of All Time</span>
            <span className='banner-text2'>Experience the change!</span>
          </div>
        </div>
      </header>
    )
}

export default Logo