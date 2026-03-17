import "./Categories.css"

const Category=()=>{
    return(
        <section className="container">
  <div className="main-layout">
    
    <div className="main-content">
      <h2 className="section-title">Don't Miss</h2>

           <div className="dont-miss-grid">

        {/* Big Post */}
        <div className="big-post">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="post"
          />



          <div className="post-info">
            <p className="meta">Craig Bator - 27 Dec 2020</p>
            <h3>
              Now Is the Time to Think About Your Small Business Success
            </h3>

            <p className="desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Faucibus lobortis augue condimentum maecenas...
            </p>
          </div>
        </div>

        {/* Right Small Posts */}
        <div className="side-posts">

          <div className="side-post">
            <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85" alt="" />
            <div>
              <p className="meta">Craig Bator - 27 Dec 2020</p>
              <h4>Penn’s Expanding Political Climate Gears Up Fo 2020 Election</h4>
            </div>
          </div>

          <div className="side-post">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" alt="" />
            <div>
              <p className="meta">Craig Bator - 27 Dec 2020</p>
              <h4>Things To Look For In A Financial Trading Platform</h4>
            </div>
          </div>

          <div className="side-post">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="" />
            <div>
              <p className="meta">Craig Bator - 27 Dec 2020</p>
              <h4>The Only Thing That Overcomes Hard Luck Is Hard Work</h4>
            </div>
          </div>

          <div className="side-post">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978" alt="" />
            <div>
              <p className="meta">Craig Bator - 27 Dec 2020</p>
              <h4>Success Is Not A Good Teacher Failure Makes You Humble</h4>
            </div>
          </div>

        </div>

      </div>
    </div>

    <aside className="sidebar">
      <h2 className="section-title">Trending Now</h2>
         <div className="recent-posts">

        <div className="recent-post">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c" alt="" />
          <p>Top 10 Gadgets in 2024</p>
        </div>

        <div className="recent-post">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="" />
          <p>Best Startup Ideas for Beginners</p>
        </div>

        <div className="recent-post">
          <img src="https://images.unsplash.com/photo-1492724441997-5dc865305da7" alt="" />
          <p>Travel Destinations You Must Visit</p>
        </div>

        <div className="recent-post">
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" alt="" />
          <p>Healthy Lifestyle Tips</p>
        </div>

        </div>
    </aside>
  </div>
</section>
    )
}

export default Category