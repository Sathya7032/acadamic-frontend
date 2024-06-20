import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Base from '../components/Base';
import '../styles/css/shorts.css'; // Custom CSS file for styling

const App = () => {
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        axios.get('https://acadamicfolios.pythonanywhere.com/app/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }, []);

    useEffect(() => {
        let url = 'https://acadamicfolios.pythonanywhere.com/app/api/shorts/';
        if (selectedCategory) {
            url += `?category_id=${selectedCategory}`;
        }

        axios.get(url)
            .then(response => {
                setVideos(response.data);
                setCurrentVideoIndex(0); // Reset to the first video when category changes
            })
            .catch(error => {
                console.error("There was an error fetching the videos!", error);
            });
    }, [selectedCategory]);

    const handleNext = () => {
        if (videos.length > 0) {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }
    };

    const handlePrevious = () => {
        if (videos.length > 0) {
            setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
        }
    };

    const currentVideo = videos[currentVideoIndex];

    return (
        <Base>
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
                <div className="form-group mb-4">
                    <label htmlFor="categorySelect">Select Category:</label>
                    <select
                        id="categorySelect"
                        className="form-select"
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
                        <>
                            <div className="video-wrapper">
                                <iframe
                                    className="video-frame"
                                    src={currentVideo.video_url}
                                    title={currentVideo.title}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                               
                            </div>
                            {/* Navigation Buttons */}
                            <div className="navigation-buttons m-4">
                                <button onClick={handlePrevious} className="nav-button" style={{backgroundColor:'green'}}>Previous</button>
                                <button onClick={handleNext} className="nav-button" style={{backgroundColor:'green'}}>Next</button>
                            </div>
                        </>
                    ) : (
                        <div>No videos available in this category.</div>
                    )}
                </div>
            </div>
        </Base>
    );
};

export default App;
