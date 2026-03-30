import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { postApi } from '../../api/post.api';
import { taxonomyApi } from '../../api/taxonomy.api';

export default function Search() {
  const [searchType, setSearchType] = useState('keyword');
  const [searchValue, setSearchValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const scrollRef = useRef(null);

  // Load danh sách danh mục để hiện thị thanh bar
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await taxonomyApi.getCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Lỗi lấy danh mục cho thanh bar:", err);
      }
    };
    fetchCats();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      alert('Vui lòng nhập nội dung tìm kiếm!');
      return;
    }

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      let response;
      // Gọi API tương ứng với Router ở Backend
      switch (searchType) {
        case 'keyword':
          response = await postApi.searchByKeyword(searchValue);
          break;
        case 'category':
          // Backend yêu cầu categorySlug
          response = await postApi.searchByCategory(searchValue);
          break;
        case 'tag':
          // Backend yêu cầu tagSlug
          response = await postApi.searchByTag(searchValue);
          break;
        default:
          throw new Error('Loại tìm kiếm không hợp lệ');
      }

      setResults(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Không tìm thấy kết quả phù hợp.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* 1. Category Bar (Đồng bộ với Home/Category) */}
      <nav style={styles.navWrapper}>
        <button onClick={() => scroll('left')} style={styles.scrollBtn}>❮</button>
        <ul ref={scrollRef} style={styles.categoryList}>
          <li style={styles.navItem}><Link to="/" style={styles.navLink}>🏠 Trang chủ</Link></li>
          {categories.map(cat => (
            <li key={cat._id} style={styles.navItem}>
              <Link to={`/category/${cat.slug}`} style={styles.navLink}>{cat.name}</Link>
            </li>
          ))}
        </ul>
        <button onClick={() => scroll('right')} style={styles.scrollBtn}>❯</button>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', color: '#333', fontWeight: 'bold' }}>🔍 Tìm Kiếm Nội Dung</h1>
          <p style={{ color: '#666' }}>Khám phá kho tàng bài viết theo từ khóa, chuyên mục hoặc thẻ</p>
        </div>

        {/* 2. Form Tìm Kiếm (Giao diện Bo tròn hiện đại) */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
            style={styles.select}
          >
            <option value="keyword">Từ khóa</option>
            <option value="category">Chuyên mục (Slug)</option>
            <option value="tag">Thẻ tag (Slug)</option>
          </select>

          <input 
            type="text" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={
              searchType === 'keyword' ? "Nhập từ khóa tìm kiếm..." : 
              searchType === 'category' ? "Ví dụ: cong-nghe, xa-hoi..." : "Ví dụ: hot, tin-moi..."
            }
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.searchBtn}>
            {loading ? '...' : 'Tìm ngay'}
          </button>
        </form>

        {/* 3. Khu vực Kết quả */}
        {error && <div style={{ color: 'red', textAlign: 'center', margin: '20px' }}>{error}</div>}
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Đang quét dữ liệu bài viết... ⏳</div>
        ) : hasSearched && results.length === 0 ? (
          <div style={styles.noResult}>Không có bài viết nào khớp với yêu cầu của bạn. 🥲</div>
        ) : (
          <div style={styles.resultGrid}>
            {results.map((post) => (
              <div key={post._id} style={styles.card}>
                <Link to={`/post/${post._id}`}>
                  {/* Sử dụng post.image thay cho post.thumbnail */}
                  <img 
                    src={post.image || 'https://placehold.co/600x400?text=No+Image'} 
                    alt={post.title} 
                    style={styles.cardImg} 
                  />
                </Link>
                <div style={styles.cardBody}>
                  <span style={styles.cardCat}>{post.category?.name || 'Chung'}</span>
                  <h3 style={styles.cardTitle}>
                    <Link to={`/post/${post._id}`} style={{ color: '#222', textDecoration: 'none' }}>{post.title}</Link>
                  </h3>
                  <div style={styles.cardFooter}>
                    {/* Backend lưu author là String */}
                    <span style={styles.author}>✍️ {post.author || 'Ẩn danh'}</span>
                    <Link to={`/post/${post._id}`} style={styles.readMore}>Xem thêm →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  navWrapper: {
    display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', 
    backgroundColor: '#fff', position: 'sticky', top: '0', zIndex: 100, padding: '0 10px'
  },
  categoryList: {
    display: 'flex', overflowX: 'auto', listStyle: 'none', margin: 0, 
    padding: '12px 0', flex: 1, scrollbarWidth: 'none'
  },
  navItem: { whiteSpace: 'nowrap', padding: '0 15px' },
  navLink: { textDecoration: 'none', color: '#555', fontWeight: '500' },
  scrollBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: '10px', color: '#aaa' },
  searchForm: {
    display: 'flex', gap: '10px', maxWidth: '800px', margin: '0 auto 50px auto', 
    backgroundColor: '#fff', padding: '10px', borderRadius: '50px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid #eee'
  },
  select: {
    padding: '0 20px', borderRadius: '50px', border: 'none', outline: 'none', 
    backgroundColor: '#f8f9fa', cursor: 'pointer', fontWeight: 'bold'
  },
  input: { flex: 1, padding: '15px 20px', border: 'none', outline: 'none', fontSize: '16px' },
  searchBtn: {
    padding: '0 30px', backgroundColor: '#007BFF', color: '#fff', border: 'none', 
    borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold'
  },
  resultGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' },
  card: { backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' },
  cardImg: { width: '100%', height: '180px', objectFit: 'cover' },
  cardBody: { padding: '20px' },
  cardCat: { fontSize: '11px', fontWeight: 'bold', color: '#007BFF', textTransform: 'uppercase' },
  cardTitle: { margin: '10px 0 20px 0', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.4', height: '50px', overflow: 'hidden' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '15px' },
  author: { fontSize: '13px', color: '#888', fontWeight: 'bold' },
  readMore: { fontSize: '13px', color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' },
  noResult: { textAlign: 'center', color: '#888', padding: '50px', fontSize: '18px' }
};