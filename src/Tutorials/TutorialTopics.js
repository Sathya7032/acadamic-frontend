import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from "react-router-dom";
import axios from "axios";


export default function TutorialTopics() {
    const baseUrl = "https://www.acadamicfolio.online/app";

    const { id } = useParams();

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + `/tutorials/${id}/posts`)
            .then((response) => {
                setTopics(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tutorials:", error);
            });
    }, [id]);

    return (
        <div>
            <Base>
                <h1 className='text-center m-5' style={{ color: 'black' }}>Topics</h1>
                <div>
                    {topics ? (
                        <ul className='list-group '>
                            {topics.map((topic, index) => (
                                <div key={topic.post_id}>
                                    <a href={`/tutorials/posts/${topic.post_id}`}>
                                        <li className='list-group-item'>
                                            <span style={{fontSize:20,color:'darkslategrey'}}>{index+1}.  {topic.post_title}</span>
                                        </li>
                                        
                                    </a>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p>No posts yet</p>
                    )}
                </div>
            </Base>
        </div>
    )
}
