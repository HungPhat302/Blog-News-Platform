import './Article.css';

const Article = () => {
  return (
    <div className="article-page-container">
      {/* Main Content Area */}
      <main className="main-article-content">
        

        <header className="article-header">
          <h1 className="article-headline">
            The Future of Artificial Intelligence: How Machine Learning Is Reshaping Our World
          </h1>
          
          <div className="author-metadata">
            <div className="author-avatar">JD</div>
            <div className="author-details">
              <span className="author-name">Jessica Davis</span>
              <span className="publish-date">March 18, 2026</span>
            </div>
          </div>
        </header>

        <section className="article-body">
          <p className="intro-text">
            As artificial intelligence continues to advance at an unprecedented pace, industry leaders and researchers 
            are grappling with both the extraordinary potential and the profound challenges that these technologies 
            present for society.
          </p>

          <figure className="article-figure">
            <img src="ai-circuit-image.jpg" alt="AI Neural Networks" className="article-hero-img" />
            <figcaption className="img-caption">
              Advanced neural networks are transforming how we interact with technology. Photo: Unsplash
            </figcaption>
          </figure>

          <p>
            The landscape of artificial intelligence has transformed dramatically over the past decade. What once 
            seemed like science fiction has become an integral part of our daily lives, from the smartphones 
            in our pockets to the autonomous vehicles navigating our streets.
          </p>

          <p>
            According to recent research from leading technology institutes, AI systems are now capable of 
            performing tasks that were considered impossible just five years ago. Machine learning models 
            can diagnose diseases with accuracy rivaling experienced physicians.
          </p>

          <blockquote className="article-quote">
            "We're at an inflection point," says Dr. Sarah Chen, director of the AI Research Lab at Stanford 
            University. "The question is no longer whether AI will transform society, but how we can ensure 
            that transformation benefits everyone."
          </blockquote>

          <figure className="article-figure">
            <img src="asimo-robot.jpg" alt="Asimo Robot" className="article-body-img" />
            <figcaption className="img-caption">
              Modern data centers power the computational infrastructure behind AI systems. Photo: Unsplash
            </figcaption>
          </figure>

          <p>
            The ethical implications of AI development have become a central focus for policymakers and 
            technologists alike. Issues of bias in algorithmic decision-making, privacy concerns, and 
            the potential displacement of workers have sparked intense debate across industries.
          </p>
        </section>



        <section className="comments-section">
            <div className="comments-header">
              <h2 className="comments-title">Comments (3)</h2>
            </div>

            <form className="comment-form" onSubmit={(e) => e.preventDefault()}>
              <textarea className="comment-textarea" placeholder="Join the discussion..."></textarea>
              <div className="comment-form-actions">
                <button type="submit" className="post-comment-btn">Post Comment</button>
              </div>
            </form>

            <div className="comments-list">
              <CommentItem 
                initial="M" author="Michael Roberts" date="March 18, 2026" 
                text="Excellent article! The ethical considerations around AI are often overlooked..." likes="24"
              />
              <CommentItem 
                initial="E" author="Emma Thompson" date="March 18, 2026" 
                text="The comparison to the Industrial Revolution is apt..." likes="18"
              />
              <CommentItem 
                initial="D" author="David Chen" date="March 18, 2026" 
                text="As someone working in the AI field, I appreciate the balanced perspective..." likes="31"
              />
            </div>
          </section>
      </main>

      {/* Sidebar Area */}
      <aside className="article-sidebar">
        <section className="sidebar-section">
          <h3 className="sidebar-title">Trending News</h3>
          <div className="trending-list">
            <div className="trending-item">
              <img src="news-thumb-1.jpg" alt="" className="trending-thumb" />
              <div className="trending-info">
                <span className="category-tag">WORLD</span>
                <p className="trending-headline">Global Climate Summit Reaches Historic Agreement on Emissions</p>
              </div>
            </div>
            
            <div className="trending-item">
              <img src="news-thumb-2.jpg" alt="" className="trending-thumb" />
              <div className="trending-info">
                <span className="category-tag">BUSINESS</span>
                <p className="trending-headline">Tech Giants Announce Major Investment in Renewable Energy</p>
              </div>
            </div>

            <div className="trending-item">
              <img src="news-thumb-3.jpg" alt="" className="trending-thumb" />
              <div className="trending-info">
                <span className="category-tag">HEALTH</span>
                <p className="trending-headline">New Study Reveals Breakthrough in Cancer Treatment</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sidebar-section">
          <div className="ad-placeholder">
            <span className="ad-label">Advertisement</span>
            <div className="ad-box-article">300 x 250</div>
          </div>
        </section>

        <section className="sidebar-section">
          <h3 className="sidebar-title">Related Articles</h3>
          <ul className="related-articles-list">
            <li>How AI Is Transforming Healthcare Diagnostics</li>
            <li>The Ethics of Algorithmic Decision-Making</li>
            <li>Understanding Machine Learning: A Beginner's Guide</li>
            <li>The Future of Work in an AI-Driven Economy</li>
          </ul>
        </section>
      </aside>
    </div>
  );
};







const CommentItem = ({ initial, author, date, text, likes }) => {
  return (
    <div className="comment-item">
      <div className="comment-avatar">{initial}</div>
      <div className="comment-details">
        <p className="comment-author-meta">
          <strong>{author}</strong> <span className="comment-separator">·</span> <span className="comment-date">{date}</span>
        </p>
        <p className="comment-text">{text}</p>
        <div className="comment-actions">
          <a href="#" className="comment-reply-link">Reply</a>
          <span className="comment-likes">{likes} likes</span>
        </div>
      </div>
    </div>
  );
};

export default Article;