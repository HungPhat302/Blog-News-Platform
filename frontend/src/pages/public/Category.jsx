import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postApi } from '../../api/post.api';
import { taxonomyApi } from '../../api/taxonomy.api';

export default function Category() {
  const { slug } = useParams(); 
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]); // Danh sách cho thanh bar
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setIsError(false);
        window.scrollTo(0, 0);

        // 1. Lấy tất cả danh mục để hiển thị thanh Bar và tìm danh mục hiện tại
        const catRes = await taxonomyApi.getCategories();
        const allCategories = catRes.data || [];
        setCategories(allCategories);

        const currentCat = allCategories.find(c => c.slug === slug);

        if (!currentCat) {
          setIsError(true);
          setLoading(false);
          return;
        }

        setCategoryInfo(currentCat);

        // 2. Lấy bài viết theo ID danh mục và trạng thái 'published'
        const postsRes = await postApi.getPosts({ 
          category: currentCat._id, 
          status: 'published' 
        });
        
        setArticles(postsRes.data || []);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu category:", err);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug]);

  // Hàm cuộn ngang thanh điều hướng
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="text-center py-20">Đang tải bài viết... ⏳</div>;

  if (isError || articles.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-600">Không tìm thấy bài viết nào trong danh mục này.</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 block">Quay lại trang chủ</Link>
      </div>
    );
  }

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* 1. Category Bar (Mang theo từ trang Home) */}
      <nav style={styles.navWrapper}>
        <button onClick={() => scroll('left')} style={styles.scrollBtn}>❮</button>
        <ul ref={scrollRef} style={styles.categoryList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>🏠 Trang chủ</Link>
          </li>
          {categories.map(cat => (
            <li key={cat._id} style={styles.navItem}>
              <Link 
                to={`/category/${cat.slug}`} 
                style={cat.slug === slug ? styles.navLinkActive : styles.navLink}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={() => scroll('right')} style={styles.scrollBtn}>❯</button>
      </nav>

      <div style={{ padding: '0 20px' }}>
        {/* 2. Header Thể loại */}
        <div style={{ margin: '40px 0', textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#333', textTransform: 'capitalize' }}>
            {categoryInfo?.name || slug}
          </h1>
          <p style={{ color: '#888', fontStyle: 'italic', marginTop: '10px' }}>
            {categoryInfo?.description || `Tất cả bài viết thuộc chủ đề ${categoryInfo?.name}`}
          </p>
        </div>

        {/* 3. Bài viết Nổi bật */}
        <section style={{ marginBottom: '50px', paddingBottom: '50px', borderBottom: '1px solid #eee' }}>
          <Link to={`/post/${featuredArticle._id}`} style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <img 
              src={featuredArticle.image || "https://placehold.co/800x600"} 
              alt={featuredArticle.title} 
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ color: '#007bff', fontWeight: 'bold', fontSize: '14px' }}>MỚI NHẤT</span>
              <h2 style={{ fontSize: '32px', color: '#222', margin: '15px 0' }}>{featuredArticle.title}</h2>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{featuredArticle.summary}</p>
              <div style={{ marginTop: '20px', color: '#999', fontSize: '14px' }}>
                <span>✍️ {featuredArticle.author?.username || "Tác giả"}</span> • 
                <time> {new Date(featuredArticle.createdAt).toLocaleDateString('vi-VN')}</time>
              </div>
            </div>
          </Link>
        </section>

        {/* 4. Lưới bài viết */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
          {gridArticles.map((article) => (
            <Link key={article._id} to={`/post/${article._id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <img 
                src={article.image || "https://placehold.co/600x400"} 
                alt={article.title} 
                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} 
              />
              <h3 style={{ fontSize: '20px', color: '#222', fontWeight: 'bold', marginBottom: '10px' }}>{article.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', flex: 1 }}>{article.summary}</p>
              <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f0f0f0', fontSize: '13px', color: '#999' }}>
                {article.author?.username || "Tác giả"} • {new Date(article.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

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
    padding: '12px 0',
    flex: 1,
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  navItem: { whiteSpace: 'nowrap', padding: '0 15px' },
  navLink: { textDecoration: 'none', color: '#555', fontWeight: '500' },
  navLinkActive: { textDecoration: 'none', color: '#9f224e', fontWeight: 'bold' },
  scrollBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: '10px', color: '#aaa' }
};