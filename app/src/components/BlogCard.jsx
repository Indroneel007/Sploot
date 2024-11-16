// src/BlogCard.js
import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <img
        src={"http://localhost:5000" + blog.imageURL}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-xl font-semibold">{blog.title}</p>
        <p className="text-gray-600 text-sm">{blog.category}</p>
        <p className="text-gray-800 mt-3">{blog.content.slice(0, 100)}...</p>

        <p>~ {blog.author.email}</p>
        <Link
          to={`/blogs/${blog._id}`}
          className="inline-block mt-4 text-blue-600 hover:text-blue-800"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
