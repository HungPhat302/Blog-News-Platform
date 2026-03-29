import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postApi } from '../../api/post.api';
import { interactionApi } from '../../api/interaction.api';

export default function ArticleDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        
        // 1. CHỈ TẢI BÀI VIẾT TRƯỚC
        const postRes = await postApi.getDetailPost(id);
        const postData = postRes.data || postRes;

        // 🛡️ BƯỚC BẢO VỆ FRONTEND (Không cần sửa Backend):
        // Nếu Backend không trả về status, tự động gán là 'published'
        // Nhờ vậy hàm .toUpperCase() ở dưới sẽ không bao giờ bị lỗi crash nữa!
        postData.status = postData.status || 'published';

        setPost(postData);

        // 2. LOGIC THÔNG MINH: NẾU BÀI ĐÃ XUẤT BẢN THÌ MỚI TẢI COMMENT
        if (postData.status === 'published') {
          try {
            const commentRes = await interactionApi.getCommentsByPost(id);
            setComments(commentRes.data || []);
          } catch (commentErr) {
            console.error("Lỗi tải comment:", commentErr);
          }
        }

      } catch (err) {
        console.error(err);
        setError('Không tìm thấy bài viết hoặc bạn không có quyền truy cập.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải bài viết... ⏳</div>;
  if (error || !post) return <div style={{ padding: '50px', textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      
      {/* ⚠️ HIỂN THỊ CẢNH BÁO NẾU LÀ BẢN NHÁP DÀNH CHO ADMIN/EDITOR */}
      {post.status !== 'published' && (
        <div style={{ padding: '12px 15px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '4px', marginBottom: '25px', fontWeight: 'bold', border: '1px solid #ffeeba' }}>
          ⚠️ Đây là bản xem trước (Draft/Review). Bài viết này chưa được xuất bản ra công chúng.
        </div>
      )}

      {/* TIÊU ĐỀ VÀ THÔNG TIN */}
      <h1 style={{ fontSize: '32px', marginBottom: '15px', color: '#333', lineHeight: '1.4' }}>{post.title}</h1>
      
      <div style={{ color: '#666', fontSize: '15px', marginBottom: '25px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span>👤 Tác giả: <strong>{post.author?.username || 'Ẩn danh'}</strong></span>
        <span>📁 Danh mục: <strong>{post.category?.name || 'Chưa phân loại'}</strong></span>
        <span style={{ padding: '4px 8px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{post.status.toUpperCase()}</span>
      </div>

      {/* ẢNH BÌA */}
      {post.image && (
        <img src={post.image} alt={post.title} style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: '8px', marginBottom: '30px' }} />
      )}

      {/* NỘI DUNG */}
      <div style={{ fontSize: '17px', lineHeight: '1.8', color: '#444', marginBottom: '40px' }}>
        <p style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '25px', fontSize: '18px' }}>{post.summary}</p>
        <div style={{ whiteSpace: 'pre-line' }}>{post.content}</div>
      </div>

      {/* THẺ (TAGS) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {post.tags?.map(tag => (
          <span key={tag._id || tag} style={{ padding: '6px 12px', backgroundColor: '#f1f3f5', borderRadius: '20px', fontSize: '14px', color: '#495057', fontWeight: '500' }}>
            #{tag.name || tag}
          </span>
        ))}
      </div>

      {/* KHU VỰC BÌNH LUẬN - CHỈ HIỆN KHI ĐÃ PUBLISH */}
      {post.status === 'published' && (
        <div style={{ borderTop: '2px solid #eee', paddingTop: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>💬 Bình luận ({comments.length})</h3>
          {comments.length === 0 ? (
            <p style={{ color: '#888', fontStyle: 'italic' }}>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
          ) : (
            comments.map(c => (
              <div key={c._id} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                <strong style={{ color: '#007bff' }}>{c.user?.username || 'Người dùng ẩn danh'}</strong>
                <p style={{ margin: '8px 0 0 0', color: '#333' }}>{c.content}</p>
              </div>
            ))
          )}
        </div>
      )}
      
      {/* NÚT QUAY LẠI MÀN HÌNH DASHBOARD */}
      <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px dashed #ccc', paddingTop: '20px' }}>
         <button onClick={() => window.history.back()} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
           ⬅ Quay lại
         </button>
      </div>
    </div>
  );
}