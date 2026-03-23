import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostDetail } from "../api/postApi";
import CommentBox from "../components/CommentBox";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostDetail(id).then(setPost);
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        By {post.author} · {post.publishDate}
      </p>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      <CommentBox postId={post.id} />
    </div>
  );
}