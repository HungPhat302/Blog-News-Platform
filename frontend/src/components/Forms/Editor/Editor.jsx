import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import PostSchema from "../../../formSchema/PostSchema"; // Ensure this matches your schema
import "./Editor.css";

const EditorForm = ({ existingPost }) => {
  // 1. Setup Form
  const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({
    resolver: joiResolver(PostSchema),
    defaultValues: existingPost || { tags: [], status: "draft" },
    mode:"onChange",
    shouldFocusError:true
  });

  // 2. Local state for Tags (to avoid 'watch')
  const [selectedTags, setSelectedTags] = useState([]);

  // 3. Populate form when data arrives
  useEffect(() => {
    if (existingPost) {
      reset(existingPost);
      setSelectedTags(existingPost.tags || []);
    }
  }, [existingPost, reset]);

  const handleTagToggle = (tagId) => {
    const current = getValues("tags") || [];
    const next = current.includes(tagId)
      ? current.filter((id) => id !== tagId)
      : [...current, tagId];
    
    setValue("tags", next, { shouldValidate: true, shouldDirty: true });
    setSelectedTags(next);
  };

  const onSave = (data) => {
    console.log("Updated Post Data:", data);
    reset()
    // API Call here: axios.put(`/api/posts/${existingPost._id}`, data)
  };

  return (
    <div className="edit-container">
      <header className="edit-header">
        <div className="header-left">
          <h1 className="edit-main-title">Edit Publication</h1>
          <p className="edit-subtitle">Post ID: {existingPost?._id || "---"}</p>
        </div>
        <div className="header-actions">
          <button  className="btn-ghost">Discard Changes</button>
          <button type="submit" form="edit-form" className="btn-save">Publish Post</button>
        </div>
      </header>

      <form id="edit-form" className="edit-layout" onSubmit={handleSubmit(onSave)}>
        {/* LEFT COLUMN: Main Content */}
        <main className="edit-main">
          <div className="edit-card">
            <div className="form-group">
              <label className="field-label">Article Title</label>
              <input 
                {...register("title")} 
                className="input-title" 
                placeholder="Enter a catchy title..." 
              />
              {errors.title && <span className="error">{errors.title.message}</span>}
            </div>

            <div className="form-group">
              <label className="field-label">Content Editor</label>
              <textarea 
                {...register("content")} 
                className="input-content" 
                placeholder="Write your masterpiece here..."
              />
              {errors.content && <span className="error">{errors.content.message}</span>}
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: Settings */}
        <aside className="edit-sidebar">
          {/* Status Section */}
          <div className="sidebar-card">
            <h3 className="sidebar-label">Publication Status</h3>
            <select {...register("status")} className={`status-select status-${getValues("status")}`}>
              <option value="draft">Draft</option>
              <option value="review">In Review</option>
              <option value="published">Published</option>
            </select>
             {errors.status && <span className="error">{errors.status.message}</span>}
          </div>

          {/* Metadata Section */}
          <div className="sidebar-card">
            <h3 className="sidebar-label">Metadata & Taxonomy</h3>
            
            <div className="form-group">
              <label>Category</label>
              <select {...register("category")} className="input-field">
                <option value="">Select Category</option>
                <option value="tech-id">Technology</option>
                <option value="design-id">Design</option>
              </select>
              {errors.category && <span className="error">{errors.category.message}</span>}
            </div>

            <div className="form-group">
              <label>URL Slug</label>
              <input {...register("slug")} className="input-field" />
              {errors.slug && <span className="error">{errors.slug.message}</span>}
            </div>

            <div className="tags-section">
              <label>Tags</label>
              <div className="tag-cloud">
                {["tag1", "tag2", "tag3", "tag4"].map((tagId) => (
                  <button
                    key={tagId}
                    type="button"
                    className={`tag-pill ${selectedTags.includes(tagId) ? "selected" : ""}`}
                    onClick={() => handleTagToggle(tagId)}
                  >
                    {tagId.toUpperCase()}
                  </button>
                ))}
              </div>
              <input type="hidden" {...register("tags")} />
            </div>
          </div>

          {/* Logistics Section */}
          <div className="sidebar-card">
            <h3 className="sidebar-label">Publishing Details</h3>
            <div className="form-group">
              <label>Author Name</label>
              <input {...register("author")} className="input-field readonly" readOnly  />
            </div>
            <div className="form-group">
              <label>Publish Date</label>
              <input type="date" {...register("publishdate")} className="input-field" />
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default EditorForm;