const API_URL = "http://localhost:3000/api";

export const getPosts = () =>
  fetch(`${API_URL}/posts`).then(res => res.json());

export const getPostDetail = (id) =>
  fetch(`${API_URL}/posts/${id}`).then(res => res.json());

export const getPostsByCategory = (slug) =>
  fetch(`${API_URL}/categories/${slug}`).then(res => res.json());

export const getPostsByTag = (slug) =>
  fetch(`${API_URL}/tags/${slug}`).then(res => res.json());

export const searchPosts = (q) =>
  fetch(`${API_URL}/posts/search?q=${q}`).then(res => res.json());

export const likePost = (id, token) =>
  fetch(`${API_URL}/posts/${id}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });

export const bookmarkPost = (id, token) =>
  fetch(`${API_URL}/posts/${id}/bookmark`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });