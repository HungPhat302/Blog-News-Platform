import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";

export default function Bookmarks() {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/me/bookmarks", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h1>Saved Posts</h1>
      {posts.map(p => <PostCard key={p.id} post={p} />)}
    </div>
  );
}