import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CommentBox({ postId }) {
  const { user, token } = useContext(AuthContext);
  const [content, setContent] = useState("");

  if (!user) return <p>Please login to comment.</p>;

  const submitComment = () => {
    fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={submitComment}>Comment</button>
    </div>
  );
}