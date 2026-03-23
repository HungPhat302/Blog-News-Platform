import { Link } from "react-router-dom";
import "./Author.css"

const authUser = {
    name: "Joshua",
    bio: "Senior Editor and Technology enthusiast with over 10 years of experience in digital journalism. Passionate about AI, web development, and the future of tech.",
    avatar: "src/assets/images/banner.png",
    postCount: 12,
};

// Mock array of posts belonging to this author
const authorPosts = [
    {
        id: 1,
        category: "TECHNOLOGY",
        title: "The Rise of Quantum Computing in 2026",
        excerpt: "Quantum computing is no longer a distant dream. Recent breakthroughs have brought us closer...",
        date: "March 20, 2026",
        image: "src/assets/images/post1.jpg"
    },
    {
        id: 2,
        category: "LIFESTYLE",
        title: "Digital Nomadism: Balancing Work and Travel",
        excerpt: "How the modern workforce is shifting towards a completely remote and nomadic lifestyle...",
        date: "March 15, 2026",
        image: "src/assets/images/post2.jpg"
    },
    {
        id: 3,
        category: "BUSINESS",
        title: "The Future of Decentralized Finance",
        excerpt: "DeFi is reshaping how we think about traditional banking systems and global transactions...",
        date: "March 10, 2026",
        image: "src/assets/images/post3.jpg"
    }
];

const Author = () => {
    return (
        <div className="author-page-container">
            {/* 1. Author Profile Section */}
            <header className="author-profile-card">
                <div className="author-avatar-wrapper">
                    <img src={authUser.avatar} alt={authUser.name} className="author-avatar-img" />
                </div>
                <div className="author-info">
                    <span className="author-label">AUTHOR</span>
                    <h1 className="author-display-name">{authUser.name}</h1>
                    <p className="author-bio">{authUser.bio}</p>
                    <div className="author-stats">
                        <strong>{authUser.postCount}</strong> Posts Published
                    </div>
                </div>
            </header>

            {/* 2. Posts Grid Section */}
            <div className="posts-header-wrapper">
                <h2 className="posts-heading">Latest Posts by {authUser.name}</h2>

                <div className="author-actions">
                    <Link to={"prepare_post"}>
                        <button className="btn-action btn-edit">

                            <span className="icon">✎</span> Create Post

                        </button>
                    </Link>
                    <Link to={"delete_posts"}>
                    <button className="btn-action btn-delete">
                        <span className="icon">🗑</span> Delete All Posts
                    </button>
                    </Link>
                </div>
            </div>

            <div className="author-posts-grid">
                {authorPosts.map((post) => (
                    <article key={post.id} className="author-post-card">
                        <div className="post-card-image-wrapper">
                            <img src={post.image} alt={post.title} className="post-card-img" />
                            <span className="post-card-category">{post.category}</span>
                        </div>

                        <div className="post-card-body">
                            <span className="post-card-date">{post.date}</span>
                            <h3 className="post-card-title">{post.title}</h3>
                            <p className="post-card-excerpt">{post.excerpt}</p>

                            {/* Add this wrapper */}
                            <div className="post-card-actions">
                                <Link to={`/article/${post.id}`} className="action-link">
                                    <button className="post-card-link">Read More</button>
                                </Link>

                                <Link to={`edit_post/${post.id}`} className="action-link">
                                    <button className="post-card-link edit-btn">✎ Edit</button>
                                </Link>
                                <Link to={`delete_post/${post.id}`} className="action-link">
                                    <button className="post-card-link edit-btn">🗑 Delete</button>
                                </Link>
                            </div>
                        </div>

                    </article>
                ))}
            </div>
        </div>
    )
}

export default Author