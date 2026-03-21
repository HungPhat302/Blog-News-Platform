import "./Ad.css"


const Ad = () => {
  return (
    <section className="promo-container">
      {/* The Background Image Tag */}
      <img
        src="src/assets/images/banner.png"
        className="promo-bg-image"
        alt="Promo Banner"
      />

      {/* The Dark Overlay (Replaces the linear-gradient) */}
      <div className="promo-overlay"></div>

      {/* The Flexbox Content Layer */}
      <div className="promo-flex-content">
        <div className="promo-content">
          <h2 className="promo-title">
            Best Selling <strong>BLOG</strong> and <strong>MAGAZINE</strong>
          </h2>
          <p className="promo-subtitle">Theme of All Time</p>
          <p className="promo-tagline">Experience the change!</p>
        </div>

        <div className="promo-actions">
          <button className="promo-button">PURCHASE NOW</button>
        </div>
      </div>
    </section>
  )
}

export default Ad