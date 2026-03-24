import React from 'react';
import './EditorDash.css';
import { Link } from 'react-router-dom';

const ReviewPosts = () => {
    // Mock data following your Mongoose Schema
    const mockPosts = [
        {
            _id: "1",
            title: "The Future of AI in Editorial Design",
            author: "Jane Doe",
            status: "review",
            category: [{ name: "Technology" },{name:"Artificial Intelligence"}],
            publishdate: "2026-03-24T12:00:00Z",
            image: "https://via.placeholder.com/150",
            slug: "future-of-ai-design"
        },
        {
            _id: "2",
            title: "10 Minimalist CSS Frameworks for 2026",
            author: "John Smith",
            status: "draft",
            category: [{ name: "Technology" }, { name: "AI" }, { name: "Design" }],
            publishdate: "2026-03-22T09:30:00Z",
            image: "https://via.placeholder.com/150",
            slug: "minimalist-css-2026"
        },
        {
            _id: "3",
            title: "The Renaissance of Print Media",
            author: "Alex Rivera",
            status: "published",
            category: [{ name: "Lifestyle" },{name:"Fashion"},{name:"Europe"}],
            publishdate: "2026-03-20T15:45:00Z",
            image: "https://via.placeholder.com/150",
            slug: "renaissance-print-media"
        }
    ];

    return (
        <div className="review-container">
            <div className="review-header">
                <div>
                    <h1 className="review-title">Editorial Review</h1>
                    <p className="review-subtitle">Manage and approve pending publications</p>
                </div>
                <button className="btn-refresh">Refresh Feed</button>
            </div>

            <div className="posts-table-wrapper">
                <table className="posts-table">
                    <thead>
                        <tr>
                            <th>Article</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockPosts.map((post) => (
                            <tr key={post._id} className="post-row">
                                <td className="post-info-cell">
                                    <div className="post-main-flex">
                                        <img src={post.image} alt="thumb" className="post-thumb" />
                                        <div className="post-details">
                                            <span className="post-title-text">{post.title}</span>
                                            <span className="post-author-text">by {post.author}</span>
                                        </div>
                                    </div>
                                </td>
                                {/* data-label is the secret sauce for mobile labels */}
                                <td data-label="Status">
                                    <span className={`status-pill status-${post.status}`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td data-label="Categories">
                                    <div className="category-list">
                                        {Array.isArray(post.category) && post.category.length > 0 ? (
                                            post.category.map((cat, index) => (
                                                <span key={cat._id || index} className="category-tag">
                                                    {cat.name}
                                                </span>
                                            ))
                                        ) : (
                                            /* This shows if category is an object, null, or an empty array */
                                            <span className="category-tag muted">Uncategorized</span>
                                        )}
                                    </div>
                                </td>
                                <td data-label="Date" className="date-text">
                                    {new Date(post.publishdate).toLocaleDateString()}
                                </td>
                                <td className="text-right action-cell">
                                    <div className="post-actions">
                                        {/* Style the Link directly with your button classes */}
                                        <Link
                                            to={`edit_post/${post._id}`}
                                            className="action-btn btn-edit-content"
                                            style={{ textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            Edit
                                        </Link>

                                        <button className="action-btn btn-edit-settings">
                                            Settings
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewPosts;