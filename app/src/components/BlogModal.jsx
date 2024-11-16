import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../redux/blogSlice"; // Assuming you have a blogSlice for Redux

export const CategoryList = ["Technology", "Sports", "Finance", "Education", "Design", "Entertainment"];

function BlogModal({ closeModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const { token } = useSelector((state) => state.auth);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = () => {
    console.log(image, title, category, content)
    if (!title || !category || !content || !image) {
      setError("All fields are required.");
      return;
    }
    // Dispatch action to create a new blog (you can update the API call in the blogSlice)
    dispatch(createBlog({ 
      title, 
      category,
      description,
      content, 
      image: imageFile 
    }, token));
    alert("Created Blog Successfully")
    closeModal();
  };

  return (
    <div className="fixed inset-0 top-0 flex items-center justify-center bg-gray-800 bg-opacity-50 h-screen m-0 p-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full  md:w-1/3 max-h-screen overflow-auto">
        <h2 className="text-xl font-bold text-center">Create New Blog</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4 mt-4">
          {/* Image Upload Section */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Blog Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {image && (
              <div className="mt-2">
                <img src={image} alt="Preview" className="max-w-full h-auto rounded-md" />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Blog Title"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select a Category</option>
              {CategoryList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Blog Description"
              rows="2"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Blog Content"
              rows="4"
              required
            />
          </div>

          {/* Submit and Close Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Create Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogModal;
