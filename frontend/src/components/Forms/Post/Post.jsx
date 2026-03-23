import { joiResolver } from "@hookform/resolvers/joi";
import "./Post.css"
import { useForm } from "react-hook-form";
import PostSchema from "../../../formSchema/PostSchema";
import { useEffect, useState, useRef } from "react";

const Post = () => {
  useEffect(() => {

    if (isSubmitSuccessful) {
      reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false });
    }
    
  });
  const { register, handleSubmit, formState: { isSubmitting, errors, isSubmitSuccessful }, reset, setValue } = useForm({
    resolver: joiResolver(PostSchema),
    mode: "onSubmit",
    shouldFocusError: true
  })

  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setValue("image", e.dataTransfer.files, { shouldValidate: true });
      setFileName(file.name);
      setPreview(URL.createObjectURL(file)); // ✅ ADD THIS

      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
    console.log(data);

    reset();
    setFileName("");
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }
  return (
    <div className="editor-container">
      <header className="editor-header">
        <div className="header-left">
          <span className="editor-status">Draft</span>
          <h1 className="editor-main-title">Create New Post</h1>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Save Draft</button>
          <button className="btn-primary" type="submit" form="postform">Publish Post</button>
        </div>
      </header>

      <form id="postform" className="editor-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Main Writing Area */}
        <main className="editor-main">
          <div className="form-group">
            <input
              {...register("title")}
              type="text"
              className="input-title"
              placeholder="Post Title"
            />
            {
              errors.title && (
                <div className="error-message">{`${errors.title.message}`}</div>
              )
            }
          </div>

          <div className="form-group">
            <textarea
              {...register("content")}
              className="input-content"
              placeholder="Start writing your story..."
            ></textarea>
            {
              errors.content && (
                <div className="error-message">{`${errors.content.message}`}</div>
              )
            }
          </div>
        </main>

        {/* Post Settings Sidebar */}
        <aside className="editor-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-label">Post Settings</h3>

            <div className="form-group">
              <label>URL Slug</label>
              <input
                {...register("slug")}
                type="text" className="input-field" placeholder="the-future-of-ai"
              />
              {
                errors.slug && (
                  <div className="error-message">{`${errors.slug.message}`}</div>
                )
              }
            </div>

            <div className="form-group">
              <label>Category</label>
              <select {...register("category")} className="input-field">
                <option value="">Select Category</option>
                <option value="tech">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="business">Business</option>
              </select>
              {
                errors.category && (
                  <div className="error-message">{`${errors.category.message}`}</div>
                )
              }
            </div>

            <div className="input-group"> {/* Changed from form-group to match your CSS wrapper */}
              <label>Tags (Hold Ctrl/Cmd to select multiple)</label>
              <select multiple {...register("tags")} className="input-field">
                <option value="ai">AI</option>
                <option value="ml">Machine Learning</option>
                <option value="web3">Web3</option>
                <option value="design">Design</option>
              </select>

              {errors.tags && (
                <div className="error-message">
                  {errors.tags.message}
                </div>
              )}
            </div>
          </div>

          <div
            className={`image-upload-placeholder ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-icon">+</div>
            <span>Drag & drop image here or click to upload</span>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="preview" />
              </div>
            )}
            {fileName && <p>{fileName}</p>}
            <input
              {...register("image")}
              type="file"
              className="hidden-file-input"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFileName(file.name);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
             <input type="file" 
             className="input-field mt-10" 
             placeholder="https://..."
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFileName(file.name);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              />
            {errors.image && (
              <div className="error-message">{errors.image.message}</div>
            )}
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-label">Author</h3>
            <input
              {...register("author")}
              type="text"
              className="input-field readonly"
              readOnly
            />
            {errors.author && (
              <div className="error-message">{`${errors.author.message}`}</div>
            )}
          </div>
        </aside>
      </form>
    </div>
  )
}

export default Post