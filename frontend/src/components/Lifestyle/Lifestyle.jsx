
import "./LifeStyle.css"

const filters = [
    { name: 'All', color: 'bg-red' },
    { name: 'Travel', color: 'bg-purple' },
    { name: 'Recipes', color: 'bg-green' },
    { name: 'Health & Fitness', color: 'bg-blue' },
    { name: 'Music', color: 'bg-olive' },
  ];

  const categories = [
    { name: 'Life Style', count: 50, color: 'bg-red' },
    { name: 'World', count: 55, color: 'bg-purple' },
    { name: 'Foods', count: 40, color: 'bg-pink' },
    { name: 'Technology', count: 10, color: 'bg-blue' },
    { name: 'Sports', count: 42, color: 'bg-light-blue' },
    { name: 'Football', count: 5, color: 'bg-pink-alt' },
    { name: 'Cricket', count: 67, color: 'bg-blue-alt' },
    { name: 'Covid 19', count: 12, color: 'bg-light-blue' },
  ];
const LifeStyle=()=>{
    return(
        <div className="lifestyle-layout">
      {/* LEFT: MAIN CONTENT */}
      <main className="lifestyle-main">
        <header className="section-header">
          <h2 className="section-title-lifestyle">Life Style</h2>
          <div className="header-controls">
            <div className="filter-group">
              {filters.map((f) => (
                <button key={f.name} className={`filter-btn ${f.color}`}>{f.name}</button>
              ))}
            </div>
            <div className="nav-arrows">
              <button className="arrow">{'<'}</button>
              <button className="arrow active">{'>'}</button>
            </div>
          </div>
        </header>

        <div className="article-grid">
          {/* Column 1 */}
          <div className="article-column">
            <div className="featured-card">
              <div className="badge-overlay">Health & Fitness</div>
              <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528" alt="featured" />
              <div className="post-content">
                <p className="meta">Craig Bator - 27 Dec 2020</p>
                <h3>‘Institutional Delivery Vital For Reducing Maternal And Neonatal Deaths’</h3>
                <p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus lobortis augue condimentum...</p>
              </div>
            </div>
            <div className="list-posts">
              {[1, 2].map((i) => (
                <div key={i} className="small-post">
                  <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987" alt="thumb" />
                  <div className="small-post-info">
                    <p className="meta-small">Craig Bator - 27 Dec 2020</p>
                    <h4>{i === 1 ? "Best things you can do on a solo mountain climb" : "Creative decoration with houseplants"}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="article-column">
            <div className="featured-card">
              <div className="badge-overlay bg-green">Health & Fitness</div>
              <img src="src/assets/images/banner.png" alt="featured" />
              <div className="post-content">
                <p className="meta">Craig Bator - 27 Dec 2020</p>
                <h3>Being Self-Controlled Child May Lead To Healthier Middle-Age</h3>
                <p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus lobortis augue condimentum...</p>
              </div>
            </div>
            <div className="list-posts">
              {[3, 4].map((i) => (
                <div key={i} className="small-post">
                  <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858" alt="thumb" />
                  <div className="small-post-info">
                    <p className="meta-small">Craig Bator - 27 Dec 2020</p>
                    <h4>{i === 3 ? "How to use basic design principles your home" : "How to burn calories with pleasant activities"}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT: SIDEBAR */}
      <aside className="lifestyle-sidebar">
        <div className="newsletter-card">
          <h3>Get Latest Updates</h3>
          <input type="email" placeholder="Your email address" />
          <button className="btn-subscribe">Subscribe</button>
        </div>

        <div className="category-section">
          <h2 className="section-title sidebar-title">Categories</h2>
          <ul className="cat-list">
            {categories.map((cat) => (
              <li key={cat.name} className="cat-item">
                <span className="cat-link">
                  <span className="chevron">{'>'}</span> {cat.name}
                </span>
                <span className={`cat-count ${cat.color}`}>{cat.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
    )
}

export default LifeStyle