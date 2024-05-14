import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import axios from "axios";
import moment from "moment";

const Blogs = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/blogs/?page=${currentPage}`);
      setBlogs(response.data.results);
      setTotalPages(response.data.count);
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
          <div className="row">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {blogs.map((blog) => (
                  <div key={blog.id} className="col-lg-12 mb-5">
                    <div className="blog-item" style={{ border: 'black solid' }}>
                      <img
                        src="images/blog/2.jpg"
                        alt=""
                        className="img-fluid rounded"
                      />

                      <div className="blog-item-content bg-white p-4">
                        <div className="blog-item-meta py-1 px-2">
                          <span className="text-muted text-capitalize mr-3">
                            <i className="ti-pencil-alt mr-2"></i>{moment(blog.date).format("DD-MMMM-YYYY")}
                          </span>
                        </div>

                        <h3 className="mt-3 mb-3">
                          <a href="blog-single.html">
                            {blog.title}
                          </a>
                        </h3>
                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 400) }}>
                        </p>

                        <p><span style={{ color: 'tomato' }}>Views :- </span><span style={{ color: 'black' }}>{blog.views}</span></p>

                        <a
                          href={`/blogs/${blog.slug}/`}
                          className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                        >
                          Continue Reading
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
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
