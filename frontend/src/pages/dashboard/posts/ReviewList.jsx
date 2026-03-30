import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { postApi } from '../../../api/post.api';

export default function ReviewList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviewPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await postApi.getEditorPosts();

      // Xử lý linh hoạt nhiều dạng response
      let postsArray = [];
      if (Array.isArray(res?.data)) {
        postsArray = res.data;
      } else if (res?.data?.data && Array.isArray(res.data.data)) {
        postsArray = res.data.data;
      } else if (Array.isArray(res)) {
        postsArray = res;
      }

      setPosts(postsArray);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bài chờ duyệt:", err);
      
      const errorMessage = err.response?.data?.message 
        || err.message 
        || "Không thể kết nối với server. Vui lòng thử lại sau.";
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviewPosts();
  }, [fetchReviewPosts]);

  const handleApprove = async (id) => {
    if (!window.confirm('Xác nhận duyệt và xuất bản bài viết này?')) return;

    try {
      await postApi.approvePost(id);
      alert('✅ Bài viết đã được duyệt và xuất bản thành công!');
      fetchReviewPosts(); // Refresh danh sách
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Không thể duyệt bài viết. Vui lòng thử lại!');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Xác nhận từ chối bài viết này và trả về cho tác giả?')) return;

    try {
      await postApi.rejectPost(id);
      alert('❌ Bài viết đã bị từ chối!');
      fetchReviewPosts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Không thể từ chối bài viết. Vui lòng thử lại!');
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
      borderTop: '5px solid #ffc107'
    }}>
      <div style={{ marginBottom: '24px', borderBottom: '2px solid #eee', paddingBottom: '16px' }}>
        <h2 style={{ margin: 0, color: '#856404', fontSize: '24px' }}>
          🛡️ Khu vực Kiểm duyệt bài viết
        </h2>
        <p style={{ color: '#666', margin: '8px 0 0 0', fontSize: '15px' }}>
          Danh sách bài viết đang chờ phê duyệt từ Tác giả
        </p>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          borderLeft: '4px solid #dc3545'
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#666',
          fontSize: '16px'
        }}>
          Đang tải danh sách bài viết chờ duyệt... ⏳
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '16px', textAlign: 'left' }}>Tiêu đề</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Tác giả</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Ngày gửi</th>
                <th style={{ padding: '16px', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{
                    padding: '60px',
                    textAlign: 'center',
                    color: '#28a745',
                    fontSize: '17px',
                    fontWeight: '500'
                  }}>
                    🎉 Hiện tại không có bài viết nào đang chờ duyệt.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ 
                      padding: '16px', 
                      fontWeight: '500', 
                      maxWidth: '380px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {post.title}
                    </td>
                    <td style={{ padding: '16px', color: '#495057' }}>
                      {post.author?.username || post.author?.name || 'Ẩn danh'}
                    </td>
                    <td style={{ padding: '16px', color: '#6c757d', fontSize: '14px' }}>
                      {post.createdAt 
                        ? new Date(post.createdAt).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : '—'
                      }
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link 
                          to={`/post/${post._id}`}
                          style={{
                            padding: '8px 14px',
                            backgroundColor: '#17a2b8',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}
                        >
                          👁️ Xem
                        </Link>
                        <button 
                          onClick={() => handleApprove(post._id)}
                          style={{
                            padding: '8px 14px',
                            backgroundColor: '#28a745',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}
                        >
                          ✅ Duyệt
                        </button>
                        <button 
                          onClick={() => handleReject(post._id)}
                          style={{
                            padding: '8px 14px',
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}
                        >
                          ❌ Từ chối
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}