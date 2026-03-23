import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostsByCategory } from "../api/postApi";
import PostCard from "../components/PostCard";

export default function Category() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsByCategory(slug).then(setPosts);
  }, [slug]);

  return (
    <div>
      <h1>Category: {slug}</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}