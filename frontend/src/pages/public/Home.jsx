import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { postApi } from '../../api/post.api';
import { taxonomyApi } from '../../api/taxonomy.api'; //

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]); //
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Lấy bài viết và danh mục cùng lúc
        const [postsRes, catsRes] = await Promise.all([
          postApi.getPosts(),
          taxonomyApi.getCategories() //
        ]);

        const allPosts = postsRes.data || [];
        setPosts(allPosts.filter(post => post.status === 'published'));
        setCategories(catsRes.data || []);
      } catch (error) {
        console.error('Lỗi lấy dữ liệu trang chủ:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Hàm hỗ trợ cuộn ngang bằng nút (giống prev/next-nav)
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* 1. Category Navigation Bar (Phong cách VnExpress) */}
      <nav style={styles.navWrapper}>
        <button onClick={() => scroll('left')} style={styles.scrollBtn}>❮</button>
        
        <ul ref={scrollRef} style={styles.categoryList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLinkActive}>🏠 Trang chủ</Link>
          </li>
          
          
          {categories.map(cat => (
            <li key={cat._id} style={styles.navItem}>
              <Link to={`/category/${cat.slug}`} style={styles.navLink}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>

        <button onClick={() => scroll('right')} style={styles.scrollBtn}>❯</button>
      </nav>

      {/* 2. Header Tiêu đề */}
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '32px', color: '#333' }}>📰 Tin tức mới nhất</h1>
        <p style={{ color: '#888' }}>Cập nhật kiến thức mỗi ngày</p>
      </div>

      {/* 3. Lưới bài viết */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải bài viết... ⏳</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Chưa có bài viết nào.</p>
          ) : (
            posts.map(post => (
              <div key={post._id} style={styles.postCard}>
                <Link to={`/post/${post._id}`}>
                  <img src={post.image || 'https://placehold.co/600x400'} alt={post.title} style={styles.postImg} />
                </Link>
                <div style={{ padding: '15px' }}>
                  <span style={styles.catLabel}>{post.category?.name || 'Chung'}</span>
                  <h3 style={styles.postTitle}>
                    <Link to={`/post/${post._id}`} style={{ color: '#222', textDecoration: 'none' }}>{post.title}</Link>
                  </h3>
                  <p style={styles.summary}>{post.summary}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// 4. Định nghĩa Styles (Inline cho đơn giản, bạn có thể chuyển sang CSS file)
const styles = {
  navWrapper: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    position: 'sticky',
    top: '0',
    zIndex: 100,
    padding: '0 10px'
  },
  categoryList: {
    display: 'flex',
    overflowX: 'auto',
    listStyle: 'none',
    margin: 0,
    padding: '10px 0',
    flex: 1,
    scrollbarWidth: 'none', // Ẩn scrollbar trên Firefox
    msOverflowStyle: 'none', // Ẩn scrollbar trên IE/Edge
  },
  // Lưu ý: Để ẩn hoàn toàn trên Chrome, bạn nên dùng CSS file với ::-webkit-scrollbar { display: none; }
  navItem: {
    whiteSpace: 'nowrap',
    padding: '0 15px',
    fontSize: '15px',
    fontWeight: '500'
  },
  navLink: {
    textDecoration: 'none',
    color: '#444',
    transition: 'color 0.2s',
  },
  navLinkActive: {
    textDecoration: 'none',
    color: '#9f224e', // Màu đỏ VnExpress
    fontWeight: 'bold'
  },
  scrollBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '10px',
    color: '#888'
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  postImg: { width: '100%', height: '180px', objectFit: 'cover' },
  catLabel: { fontSize: '11px', fontWeight: 'bold', color: '#9f224e', textTransform: 'uppercase' },
  postTitle: { margin: '10px 0', fontSize: '18px', fontWeight: 'bold' },
  summary: { 
    fontSize: '14px', 
    color: '#666', 
    display: '-webkit-box', 
    WebkitLineClamp: 2, 
    WebkitBoxOrient: 'vertical', 
    overflow: 'hidden' 
  }
};