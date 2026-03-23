import "./Post.css"



const Post=()=>{
    return(
        <div className="editor-container">
      <header className="editor-header">
        <div className="header-left">
          <span className="editor-status">Draft</span>
          <h1 className="editor-main-title">Create New Post</h1>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Save Draft</button>
          <button className="btn-primary">Publish Post</button>
        </div>
      </header>

      <form className="editor-form">
        {/* Main Writing Area */}
        <main className="editor-main">
          <div className="form-group">
            <input 
              type="text" 
              className="input-title" 
              placeholder="Post Title" 
            />
          </div>

          <div className="form-group">
            <textarea 
              className="input-content" 
              placeholder="Start writing your story..."
            ></textarea>
          </div>
        </main>

        {/* Post Settings Sidebar */}
        <aside className="editor-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-label">Post Settings</h3>
            
            <div className="form-group">
              <label>URL Slug</label>
              <input type="text" className="input-field" placeholder="the-future-of-ai" />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select className="input-field">
                <option value="">Select Category</option>
                <option value="tech">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="business">Business</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tags (Comma separated)</label>
              <input type="text" className="input-field" placeholder="ai, machine learning, future" />
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-label">Featured Image</h3>
            <div className="image-upload-placeholder">
              <div className="upload-icon">+</div>
              <span>Upload Image URL</span>
              <input type="file" className="input-field mt-10" placeholder="https://..." />
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-label">Author</h3>
            <input type="text" className="input-field readonly"  readOnly />
          </div>
        </aside>
      </form>
    </div>
    )
}

export default Post