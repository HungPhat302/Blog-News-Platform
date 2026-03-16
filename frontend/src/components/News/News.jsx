import "./News.css"
const News = () => {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-grid">

                    <div className="hero-item item-main">
                        <img
                            src="src/assets/news/v3_117.png"
                            alt="News"
                        />
                        <div className="hero-content">
                            <span className="tag">Business</span>
                            <h2>After All Is Said And Done, More Is Done</h2>
                            <p style={{ fontSize: "14px", marginTop: "5px" }}>
                                October 12, 2023
                            </p>
                        </div>
                    </div>
                    <div className="hero-item item-bottom-right-1">
                        <img
                            src="src/assets/news/v3_138.png"
                            alt="News"
                        />
                        <div className="hero-content">
                            <span className="tag food">Food</span>
                            <h4 style={{ fontSize: "14px" }}>Healthy Eating Habits</h4>
                        </div>
                    </div>

                    <div className="hero-item item-bottom-right-2">
                        <img
                            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                            alt="News"
                        />
                        <div className="hero-content">
                            <span className="tag travel">Travel</span>
                            <h4 style={{ fontSize: "14px" }}>Tourism in Japan</h4>
                        </div>
                    </div>

                    <div className="hero-item item-top-right">
                        <img
                            src="src/assets/news/v3_124.png"
                            alt="News"
                        />
                        <div className="hero-content">
                            <span className="tag tech">Technology</span>
                            <h3>Smartest Applications For Your Smart Phone</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default News