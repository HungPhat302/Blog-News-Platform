import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { postApi } from '../../../api/post.api';
import { taxonomyApi } from '../../../api/taxonomy.api';

export default function CreatePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',        // Đây là content_markdown
    category: '',
    tags: []
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load categories, tags và dữ liệu bài viết khi edit
  useEffect(() => {
    const initData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          taxonomyApi.getCategories(),
          taxonomyApi.getTags()
        ]);

        setCategoriesList(catRes.data || []);
        setTagsList(tagRes.data || []);

        if (isEditMode) {
          const response = await postApi.getDetailPost(id);
          const post = response.data?.data || response.data || response;

          // Ưu tiên lấy content_markdown
          let markdownContent = post.content_markdown || post.content || '';

          setFormData({
            title: post.title || '',
            summary: post.summary || '',
            content: markdownContent,
            category: post.category?._id || post.category || '',
            tags: Array.isArray(post.tags)
              ? post.tags.map(tag => tag._id || tag).filter(Boolean)
              : []
          });

          // Preview ảnh
          if (post.image) {
            setImagePreview(post.image);
          }
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        alert('Không thể tải dữ liệu. Vui lòng thử lại!');
      } finally {
        setFetching(false);
      }
    };

    initData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tagId) => {
    setFormData(prev => {
      const isSelected = prev.tags.includes(tagId);
      return {
        ...prev,
        tags: isSelected
          ? prev.tags.filter(id => id !== tagId)
          : [...prev.tags, tagId]
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) return alert("Vui lòng nhập tiêu đề bài viết!");
    if (!formData.content.trim()) return alert("Vui lòng nhập nội dung bài viết!");
    if (!formData.category) return alert("Vui lòng chọn danh mục!");

    setLoading(true);

    try {
      const submitData = new FormData();

      submitData.append('title', formData.title);
      submitData.append('summary', formData.summary || '');
      submitData.append('content', formData.content);        // backend sẽ xử lý thành markdown + html
      submitData.append('category', formData.category);

      // Tags - cách an toàn nhất
      if (formData.tags && formData.tags.length > 0) {
        formData.tags.forEach(tagId => {
          submitData.append('tags[]', tagId);
        });
      }

      if (imageFile) {
        submitData.append('image', imageFile);
      }

      if (isEditMode) {
        await postApi.updatePost(id, submitData);
        alert('Cập nhật bài viết thành công!');
      } else {
        await postApi.createPost(submitData);
        alert('Tạo bài viết thành công!');
      }

      navigate('/dashboard/posts');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi lưu bài viết!';
      alert(errorMsg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      maxWidth: '1000px',
      margin: '20px auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0 }}>
          {isEditMode ? '✏️ Sửa Bài Viết' : '✍️ Tạo Bài Viết Mới'}
        </h2>
        <Link 
          to="/dashboard/posts" 
          style={{ color: '#6c757d', textDecoration: 'none', fontWeight: '600' }}
        >
          ✕ Hủy bỏ
        </Link>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Tiêu đề */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Tiêu đề <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Nhập tiêu đề bài viết..."
            style={{ width: '100%', padding: '14px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
          />
        </div>

        {/* Tóm tắt */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Tóm tắt (Summary)
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="3"
            placeholder="Tóm tắt ngắn gọn về bài viết..."
            style={{ width: '100%', padding: '14px', border: '1px solid #ddd', borderRadius: '6px', resize: 'vertical' }}
          />
        </div>

        {/* Nội dung Markdown */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Nội dung bài viết (Markdown) <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="15"
            placeholder="Viết nội dung bài viết ở đây... Hỗ trợ Markdown"
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '15px',
              lineHeight: '1.6'
            }}
          />
          <p style={{ fontSize: '13px', color: '#666', marginTop: '6px' }}>
            Hỗ trợ Markdown: # Heading, **bold**, *italic*, - list, ```code...
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
          {/* Ảnh bìa */}
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>
              Ảnh bìa
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            {imagePreview && (
              <div style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          {/* Category & Tags */}
          <div>
            {/* Danh mục */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                Danh mục <span style={{ color: 'red' }}>*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '14px', border: '1px solid #ddd', borderRadius: '6px' }}
              >
                <option value="">-- Chọn danh mục --</option>
                {categoriesList.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>
                Thẻ (Tags) - Có thể chọn nhiều
              </label>
              <div style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ddd',
                borderRadius: '6px',
                maxHeight: '160px',
                overflowY: 'auto'
              }}>
                {tagsList.length === 0 ? (
                  <p style={{ color: '#888', fontStyle: 'italic' }}>Chưa có thẻ nào.</p>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {tagsList.map(tag => (
                      <label
                        key={tag._id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          backgroundColor: '#fff',
                          border: '1px solid #ddd',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.tags.includes(tag._id)}
                          onChange={() => handleTagChange(tag._id)}
                        />
                        {tag.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nút submit */}
        <div style={{ textAlign: 'right', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px 32px',
              backgroundColor: loading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 6px rgba(0,123,255,0.3)'
            }}
          >
            {loading 
              ? 'Đang xử lý...' 
              : isEditMode 
                ? '💾 Cập nhật bài viết' 
                : '💾 Tạo bài viết mới'
            }
          </button>
        </div>
      </form>
    </div>
  );
}