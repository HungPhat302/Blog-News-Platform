import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <h2>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>

      <p>
        By <b>{post.author}</b> · {post.publishDate}
      </p>

      <div className="tags">
        {post.tags.map(tag => (
          <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>
        ))}
      </div>

      <LikeButton postId={post.id} likes={post.likes} />
      <BookmarkButton postId={post.id} />
    </div>
  );
}