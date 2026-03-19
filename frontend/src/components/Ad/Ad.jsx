import "./Ad.css"


const Ad = () => {
    return (
     <section className="promo-banner">
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
    </section>
    )
}

export default Ad