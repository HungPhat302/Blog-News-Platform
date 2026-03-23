import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchPosts } from "../api/postApi";
import PostCard from "../components/PostCard";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (q) searchPosts(q).then(setPosts);
  }, [q]);

  return (
    <div>
      <h1>Search: "{q}"</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}