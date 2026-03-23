import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { likePost } from "../api/postApi";

export default function LikeButton({ postId, likes }) {
  const { token } = useContext(AuthContext);

  return (
    <button onClick={() => likePost(postId, token)}>
      ❤️ {likes}
    </button>
  );
}