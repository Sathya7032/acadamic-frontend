import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Divider } from '@mui/material';


export default function TutorialTopics() {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

    const { url } = useParams();

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + `/tutorials/${url}/posts`)
            .then((response) => {
                setTopics(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tutorials:", error);
            });
    }, [url]);

    return (
        <div>
            <Base>

                <Divider />
                <div className="container mt-4">
                    <h1 className='text-center m-5' style={{ color: 'black' }}>Topics</h1>
                    <div className="shorts-video-container">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {topics ? (
                                topics.map(topic => (
                                    <div key={topic.id} className="col mb-4">
                                        <div className="card h-120">
                                            <iframe
                                                className="card-img-top"
                                                src={topic.post_video} // Assuming your API returns video_url for each video
                                                title={topic.title} // Assuming your API returns title for each video
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                            <div className="card-body">
                                                <a href={`/tutorials/posts/${topic.post_id}`}>
                                                    <h5 className="card-title">{topic.post_title}</h5>
                                                </a>
                                                <a href={`/tutorials/posts/${topic.post_id}`}  className="btn btn-info" rel="noopener noreferrer">
                                                    Explore full topic
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No videos available in this category.</div>
                            )}
                        </div>
                    </div>
                </div>
            </Base>
        </div>
    )
}
