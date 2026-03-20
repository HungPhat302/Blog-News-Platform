import "./Footer.css"

const Footer=()=>{
    return(
        <footer className="footer-container">
            <div className="footer-decorate"></div>

            <div className="footer-content-wrapper">
                {/* Column 1: Branding */}
                <div className="footer-column">
                    <div className="footer-logo"></div>
                    <p className="footer-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Neque, pellentesque dictum posuere id diam rutrum.
                    </p>
                </div>

                {/* Column 2: Gallery (Inner items remain untouched) */}
                <div className="footer-column">
                    <div className="footer-gallery">
                        <span className="footer-gallery-title">Photo Gallery</span>
                        <div className="photo-gallery-1">
                            <img src="src/assets/images/banner.png" className="gallery-thumb" />
                        </div>
                        <div className="photo-gallery-2">
                            <img src="src/assets/images/banner.png" className="gallery-thumb" />
                        </div>
                        <div className="photo-gallery-3">
                            <img src="src/assets/images/banner.png" className="gallery-thumb" />
                        </div>
                        <div className="photo-gallery-4">
                            <img src="src/assets/images/banner.png" className="gallery-thumb" />
                        </div>
                        <div className="photo-gallery-5">
                            <img src="src/assets/images/banner.png" className="gallery-thumb" />
                        </div>
                        <div className="photo-gallery-6">
                            <img src="src/assets/images/banner.png" className="gallery-thumb" />
                        </div>
                    </div>
                </div>

                {/* Column 3: Subscription */}
                <div className="footer-column">
                    <h4 className="email-list-title">Stay In Touch</h4>
                    <p className="email-list-text">
                        To be updated with all the latest news, offers and special announcements.
                    </p>
                    <div className="email-form">
                        <input type="text" className="email-list-input" placeholder="Enter Your Email" />
                        <button className="email-list-button">Subscribe now</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer