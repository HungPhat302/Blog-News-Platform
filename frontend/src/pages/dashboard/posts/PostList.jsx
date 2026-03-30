import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { postApi } from '../../../api/post.api';
import { useAuth } from '../../../context/AuthContext';

export default function PostList() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Xây dựng query params dựa trên role
      const params = {};
      
      // Nếu là author thì chỉ lấy bài viết của chính mình
      if (user.role === 'author') {
        params.author = user._id || user.userId || user.id;
      }
      // Admin hoặc editor có thể xem tất cả (không cần truyền params)

      const res = await postApi.getPosts(params);
      
      // Xử lý cả 2 dạng response phổ biến: { data: [...] } hoặc [...] trực tiếp
      const postsData = res.data?.data || res.data || [];
      setPosts(Array.isArray(postsData) ? postsData : []);

    } catch (err) {
      console.error("Lỗi khi tải danh sách bài viết:", err);
      setError("Không thể tải danh sách bài viết. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load dữ liệu khi component mount hoặc user thay đổi
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;

    try {
      await postApi.deletePost(id);
      alert("Xóa bài viết thành công!");
      await loadPosts(); // Refresh danh sách
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Không thể xóa bài viết. Vui lòng thử lại!");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'published':
        return { bg: '#d4edda', color: '#155724', text: 'ĐÃ XUẤT BẢN' };
      case 'review':
        return { bg: '#fff3cd', color: '#856404', text: 'ĐANG DUYỆT' };
      case 'draft':
        return { bg: '#e9ecef', color: '#495057', text: 'BẢN NHÁP' };
      default:
        return { bg: '#e9ecef', color: '#495057', text: status?.toUpperCase() || 'UNKNOWN' };
    }
  };

  if (!user) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Vui lòng đăng nhập để xem danh sách bài viết.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <h2 style={{ margin: 0 }}>
          📝 Quản lý bài viết 
          {user.role === 'author' && ' (Của tôi)'}
        </h2>
        
        <Link 
          to="/dashboard/posts/create" 
          style={{
            textDecoration: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: '600',
            boxShadow: '0 2px 6px rgba(0,123,255,0.25)',
            transition: 'all 0.2s'
          }}
        >
          + Viết bài mới
        </Link>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '80px 20px', 
          color: '#666',
          fontSize: '16px'
        }}>
          Đang tải bài viết... ⏳
        </div>
      ) : (
        <div style={{ 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Tiêu đề</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Trạng thái</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Ngày tạo</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => {
                  const statusStyle = getStatusStyle(post.status);
                  return (
                    <tr key={post._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '16px', fontWeight: '500', color: '#212529' }}>
                        {post.title}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '600',
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                        }}>
                          {statusStyle.text}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: '#6c757d', fontSize: '14px' }}>
                        {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                          <Link 
                            to={`/dashboard/posts/edit/${post._id}`}
                            style={{ 
                              color: '#007bff', 
                              textDecoration: 'none', 
                              fontWeight: '600',
                              fontSize: '14px'
                            }}
                          >
                            ✏️ Sửa
                          </Link>
                          <button 
                            onClick={() => handleDelete(post._id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#dc3545',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '14px',
                              padding: 0
                            }}
                          >
                            🗑️ Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" style={{ 
                    padding: '60px', 
                    textAlign: 'center', 
                    color: '#999',
                    fontSize: '16px'
                  }}>
                    Chưa có bài viết nào. Hãy tạo bài viết mới!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}