import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Base from '../components/Base'; // Assuming Base is your layout component
import '../styles/css/shorts.css';
import ReactPlayer from 'react-player';
import AddComponent from '../AddComponent';

const Shorts = () => {
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        // Fetch categories from API
        axios.get('https://acadamicfolios.pythonanywhere.com/app/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch videos based on selected category from API
        let url = 'https://acadamicfolios.pythonanywhere.com/app/api/shorts/';
        if (selectedCategory) {
            url += `?category_id=${selectedCategory}`;
        }

        axios.get(url)
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error("Error fetching videos:", error);
            });
    }, [selectedCategory]);

    return (
        <Base> {/* Assuming Base is your layout component */}
            <div className="container-fluid page-header" style={{ marginBottom: "90px" }}>
                <div className="container">
                    <div className="d-flex flex-column justify-content-center" style={{ minHeight: "300px" }}>
                        <h3 className="display-4 text-white text-uppercase">SHORTS</h3>
                        <div className="d-inline-flex text-white">
                            <p className="m-0 text-uppercase"><a className="text-white" href="/">Home</a></p>
                            <i className="fa fa-angle-double-right pt-1 px-3"></i>
                            <p className="m-0 text-uppercase">Shorts</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mt-4">
                <h1 className="mb-4">Video Library</h1>
                {/* Category Selector */}
                <div className="custom-select-container mb-4">
                    <label className="custom-select-label" htmlFor="categorySelect">Select Category:</label>
                    <select
                        id="categorySelect"
                        className="custom-select"
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Video Display */}
                <div className="shorts-video-container">
                    {videos.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {videos.map(video => (
                                <div key={video.id} className="col">
                                    <div className="card h-100">
                                        <ReactPlayer
                                            url={video.video_url}
                                            playing={false} // Ensure videos do not play automatically
                                            controls
                                            width="100%"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{video.title}</h5>
                                            <p className="card-text">{video.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No videos available in this category.</div>
                    )}
                </div>
            </div>
            <div className='container-sm'>
                <AddComponent />
            </div>
        </Base>
    );
};

export default Shorts;
