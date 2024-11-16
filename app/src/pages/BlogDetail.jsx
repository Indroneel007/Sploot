import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`); // Fetch blog details from the backend
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch the blog");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
    <img
        src={"http://localhost:5000" + blog.imageURL}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <h1 className="text-4xl font-bold mb-4 mt-8">{blog.title}</h1>
      <p className="text-gray-600 mb-6">{blog.description}</p>
      <div className="text-gray-500">
        <span>Author: {blog.author.username}</span> | <span>Category: {blog.category}</span>
      </div>

      <p className="my-8">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
