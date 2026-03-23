import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { bookmarkPost } from "../api/postApi";

export default function BookmarkButton({ postId }) {
  const { token } = useContext(AuthContext);

  return (
    <button onClick={() => bookmarkPost(postId, token)}>
      🔖 Save
    </button>
  );
}