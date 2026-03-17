import "./Sports.css"
const sideArticles = [
    {
        title: "South Africa hammer injury-hit Sri Lanka Player",
        image: "src/assets/images/banner.png",
    },
    {
        title: "Southee-lead New Zealand have Pakistan on the ropes",
        image: "src/assets/images/banner.png",
    },
    {
        title: "The only thing that overcomes hard luck is hard work",
        image: "src/assets/images/banner.png",
    },
    {
        title: "Success is not a good teacher failure makes you humble",
        image: "src/assets/images/banner.png",
    },
    {
        title: "Rahane-led India bury ghosts of Adelaide at Melbourne",
        image: "src/assets/images/banner.png",
    },
];

const categories = [
    { name: 'All', color: 'bg-red' },
    { name: 'Football', color: 'bg-purple' },
    { name: 'Cricket', color: 'bg-green' },
    { name: 'Basketball', color: 'bg-blue' },
    { name: 'Badminton', color: 'bg-olive' },
    { name: 'Boxing', color: 'bg-light-blue' },
    { name: 'Esports', color: 'bg-indigo' },
];
const Sports = () => {
    return (
        <div className="sports-page-container">
            <div className="sports-main-content">
                {/* Header with Filters */}
                <div className="section-header">
                    <h2 className="section-title-sports">Sports</h2>
                    <div className="filter-nav">
                        <div className="filter-buttons">
                            {categories.map((cat) => (
                                <button key={cat.name} className={`filter-btn ${cat.color}`}>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                        <div className="nav-arrows">
                            <button className="arrow-btn">{'<'}</button>
                            <button className="arrow-btn active">{'>'}</button>
                        </div>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="sports-grid">
                    {/* Featured Article */}
                    <article className="featured-article">
                        <div className="featured-img-wrapper">
                            <img src="src/assets/images/banner.png" alt="Stadium" />
                            <span className="badge-green">Cricket</span>
                        </div>
                        <p className="meta-data">Craig Bator - 27 Dec 2020</p>
                        <h1 className="featured-title">Solskjaer dismisses Klopp comments on Man Utd penalty record</h1>
                        <p className="featured-excerpt">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus lobortis augue condimentum maecenas...
                        </p>
                    </article>

                    {/* News List */}
                    <aside className="news-list">
                        {sideArticles.map((item, index) => (
                            <div key={index} className="news-item">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="news-thumb"
                                />
                                <div className="news-info">
                                    <p className="meta-data-small">Craig Bator - 27 Dec 2020</p>
                                    {/* Now pulls the title dynamically from your array */}
                                    <h4 className="news-item-title">{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </aside>
                </div>
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
                <header className="section-header">
                    <h2 className="section-title-sports">Stay Connected</h2>
                </header>
                <div className="social-grid">
                    <div className="social-box fb"><span>15000 Followers</span></div>
                    <div className="social-box ig"><span>15000 Followers</span></div>
                    <div className="social-box yt"><span>15000 Subscribe</span></div>
                    <div className="social-box tw"><span>15000 Followers</span></div>
                    <div className="social-box be"><span>15000 Followers</span></div>
                    <div className="social-box db"><span>15000 Followers</span></div>
                </div>
                <div className="ad-box">
                    <img src="src/assets/images/banner.png" alt="Advertisement" />
                    <div className="ad-overlay">Ad</div>
                </div>
            </aside>
        </div>
    )
}

export default Sports