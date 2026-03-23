
import "./Video.css"
const Video=()=>{
    return(
        <section className="video-section">
      <div className="section-header">
        <h2 className="section-title">Video</h2>
        <div className="header-controls">
          <div className="filter-tabs">
            <button className="tab active" style={{backgroundColor: '#e67e73'}}>All</button>
            <button className="tab" style={{backgroundColor: '#9b59b6'}}>Travel</button>
            <button className="tab" style={{backgroundColor: '#78cc78'}}>Recipes</button>
            <button className="tab" style={{backgroundColor: '#5dade2'}}>Health & Fitness</button>
            <button className="tab" style={{backgroundColor: '#94833d'}}>Music</button>
          </div>
          <div className="nav-arrows">
            <button className="arrow">{'<'}</button>
            <button className="arrow active">{'>'}</button>
          </div>
        </div>
      </div>

      <div className="video-grid">
        {/* Main Large Feature Video */}
        <div className="video-card large">
          <div className="thumbnail-wrapper">
            <img src="fortnite-bg.jpg" alt="Featured Video" className="video-img" />
            <div className="play-overlay">
              <div className="play-icon"></div>
            </div>
            <span className="video-badge" style={{backgroundColor: '#e67e73'}}>Esport</span>
          </div>
          <div className="video-info overlay">
            <p className="video-meta">Craig Bator - 27 Dec 2020</p>
            <h3 className="video-title">Play This Game for Free on Epic Store This Weekend</h3>
          </div>
        </div>

        {/* Smaller Video Items */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="video-card small">
            <div className="thumbnail-wrapper">
              <img src={`video-thumb-${item}.jpg`} alt="Video thumbnail" className="video-img" />
              <div className="play-overlay small-play">
                <div className="play-icon"></div>
              </div>
              <span className="video-badge" style={{backgroundColor: item === 1 ? '#5dade2' : item === 2 ? '#34495e' : '#e67e73'}}>
                Esport
              </span>
            </div>
            <div className="video-info">
              <p className="video-meta">Craig Bator - 27 Dec 2020</p>
              <h4 className="video-title-small">
                {item === 1 && "At Value-Focused Hotels, the Free Breakfast Gets Bigger"}
                {item === 2 && "Failure is the condiment that gives success its flavor"}
                {item === 3 && "Les nouveaux maillots du Real Madrid pour la saison"}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
    )
}

export default Video