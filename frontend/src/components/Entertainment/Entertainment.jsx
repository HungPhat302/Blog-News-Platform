import "./Entertainment.css"


const articles = [
  {
    id: 1,
    category: "Hollywood",
    title: "Amanda Seyfried became ‘really obsessed’ with ghost stories",
    author: "Craig Bator",
    date: "27 Dec 2020",
    image: "src/assets/images/banner.png",
  },
  {
    id: 2,
    category: "Bollywood",
    title: "Irrfan Khan’s Last film “The Song of Scorpions” to release in 2021",
    author: "Craig Bator",
    date: "27 Dec 2020",
    image: "src/assets/images/banner.png",
  },
  {
    id: 3,
    category: "Entertainment",
    title: "Apee Karim blessed with a daughter",
    author: "Craig Bator",
    date: "27 Dec 2020",
    image: "src/assets/images/banner.png",
  },
];

const Entertainment = () => {
  return (
    <section className="ent-container">
      {/* Header Section */}
      <div className="ent-header">
        <h2 className="ent-title">Entertainment</h2>
        <div className="ent-nav-arrows">
          <button className="nav-btn">{'<'}</button>
          <button className="nav-btn active">{'>'}</button>
        </div>
      </div>

      {/* Hero Featured Article */}
      <section className="ent-hero-container">
        {/* 1. The actual background image */}
        <img
          src="hero-bg.jpg"
          className="ent-hero-image"
          alt="Amanda Seyfried"
        />

        {/* 2. The gradient layer (replicates your linear-gradient) */}
        <div className="ent-hero-gradient"></div>

        {/* 3. The content layer (handles the flexbox and text) */}
        <div className="ent-hero-content">
          <div className="ent-hero-overlay">
            <span className="badge badge-blue">Hollywood</span>
            <h1 className="hero-title">Amanda Seyfried became 'really obsessed' with ghost stories</h1>
            <hr className="hero-divider" />
            <p className="hero-excerpt">
              Hollywood actress Amanda Seyfried has recalled the time when she became obsessed with ghost stories
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Grid Section */}
      <div className="ent-grid">
        {articles.map((item) => (
          <div key={item.id} className="ent-card">
            <div className="card-image-wrapper">
              <img src={item.image} alt={item.title} className="card-img" />
              <span className={`badge badge-small ${item.category.toLowerCase()}`}>
                {item.category}
              </span>
            </div>
            <div className="card-content">
              <p className="card-meta">{item.author} - {item.date}</p>
              <h3 className="card-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Entertainment