// src/BlogsPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, searchBlogs } from "../redux/blogSlice"; // Assuming you have a blogSlice for Redux
import BlogModal, { CategoryList } from "../components/BlogModal"; // The modal for creating new blog
import BlogCard from "../components/BlogCard"; // The modal for creating new blog


function BlogsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.items);
  const { token } = useSelector((state) => state.auth);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryClick = async (category) => {
    setCategory(category)
    // await populateBlogs()
  };

  const filteredBlogs = blogs.filter((blog) =>
    (blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.content.toLowerCase().includes(search.toLowerCase())) &&
    (category ? blog.category === category : true)
  );

  const populateBlogs = async () => {
    dispatch(searchBlogs(token, search, category));
  }

  // useEffect(() => {
  //   if (search.length == 0 || search.length >= 3) populateBlogs();
  // }, [search])
  useEffect(() => {
    populateBlogs();
  }, [search, category]);

  return (
    <>
    <div className="p-8 space-y-6">
        <div className="mb-2 flex justify-center items-center space-x-4">
            <button
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={openModal} // Assuming you have a function for creating a blog
          >
                Create Blog
            </button>
            <input
            type="text"
            placeholder="Search Blogs..."
            value={search}
            onChange={handleSearchChange}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-md"
            />
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex justify-center space-x-6 overflow-auto">
          {/* "All" Button */}
          <button
            onClick={() => handleCategoryClick("")}
            className={`px-4 py-2 text-white rounded-lg ${
              category === "" ? "bg-blue-800" : "bg-blue-600"
            } hover:bg-blue-700`}
          >
            All
          </button>

          {/* Category Buttons */}
          {CategoryList.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 text-white rounded-lg ${
                category === cat ? "bg-blue-800" : "bg-blue-600"
              } hover:bg-blue-700`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:mx-16 my-16">
            {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    </div>

    {isModalOpen && <BlogModal closeModal={closeModal} />}
    </>
  );
}

export default BlogsPage;
