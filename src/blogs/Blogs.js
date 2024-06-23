import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import axios from "axios";
import moment from "moment";
import { Divider } from "@mui/material";

const Blogs = () => {
  const baseUrl = "https://www.acadamicfolio.online/app";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState(""); // State to hold search query

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, query]); // Fetch blogs on page or query change

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/blogs/`, {
        params: {
          page: currentPage,
          query: query.trim() // Include query parameter if it's not empty
        }
      });
      setBlogs(response.data.results);

      // Assuming the API response includes a count field indicating the total number of blog entries
      const totalEntries = response.data.count;

      // Assuming each page returns 10 entries, calculate total pages
      const entriesPerPage = 10;
      setTotalPages(Math.ceil(totalEntries / entriesPerPage));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchBlogs(); // Fetch blogs with the current query
  };

  const clearSearch = () => {
    setQuery(""); // Clear the search query
    setCurrentPage(1); // Reset to first page when clearing search
    fetchBlogs(); // Fetch all blogs without search query
  };

  return (
    <div>
      <Base>
        <div className="container-fluid page-header" style={{ marginBottom: "90px" }}>
          <div className="container">
            <div className="d-flex flex-column justify-content-center" style={{ minHeight: "300px" }}>
              <h3 className="display-4 text-white text-uppercase">Blogs</h3>
              <div className="d-inline-flex text-white">
                <p className="m-0 text-uppercase"><a className="text-white" href="/">Home</a></p>
                <i className="fa fa-angle-double-right pt-1 px-3"></i>
                <p className="m-0 text-uppercase">Blogs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Search form */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">Search</button>
              </div>
              {query && (
                <div className="input-group-append">
                  <button className="btn btn-secondary" onClick={clearSearch} type="button">Clear</button>
                </div>
              )}
            </div>
          </form>

          <div className="row">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className="mt-4">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="card mb-2">
                      <div className="card-body">
                        <h3 className="card-title">{blog.title}</h3>
                        <Divider />
                        <p className="card-text" dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 400) }} />
                        <p className="card-text"><small className="text-muted">Views: {blog.views}</small></p>
                        <p className="card-text"><small className="text-muted">{moment(blog.date).format("DD-MMMM-YYYY")}</small></p>
                        <a href={`/blogs/${blog.id}/`} className="btn btn-primary" rel="noopener noreferrer">
                          Continue Reading
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Pagination controls */}
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-secondary mr-2"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button
              className="btn btn-secondary ml-2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Blogs;
