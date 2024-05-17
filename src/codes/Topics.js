import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Topics() {
    const baseUrl = "https://www.acadamicfolio.online/app";

    const { id } = useParams();

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + `/languages/${id}/topics/`)
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
                                <div key={topic.id}>
                                    <a href={`/languages/${topic.id}/codes/`}>
                                        <li className='list-group-item'>
                                            <span style={{fontSize:15,color:'darkslategrey',textTransform:'uppercase',fontWeight:'bold',padding:5}}>{index+1}.  {topic.topic}</span>
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
