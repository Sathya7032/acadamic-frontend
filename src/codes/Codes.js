import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import CodeDisplay from "./CodeDisplay";

const Codes = () => {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const { url } = useParams();
    const [topics, setTopics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(baseUrl + `/languages/codes/${url}/`)
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => {
                setError("Error fetching tutorials");
                console.error("Error fetching tutorials:", error);
            });
    }, [url]);

    return (
        <Base>
            <div>
                {error && (
                    <Typography color="error" style={{ margin: 20 }}>
                        {error}
                    </Typography>
                )}
                {topics && (
                    <>
                        <Paper style={{ margin: 20, backgroundColor: "darkslategrey" }}>
                            <h2 style={{ textAlign: "center", color: 'white', padding: 10, textTransform: 'uppercase' }}>
                                {topics.title}
                            </h2>
                            <script
                                async
                                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
                                crossorigin="anonymous"
                            ></script>
                            <ins
                                className="adsbygoogle"
                                style={{ display: "block", textAlign: "center" }}
                                data-ad-layout="in-article"
                                data-ad-format="fluid"
                                data-ad-client="ca-pub-6919135852803356"
                                data-ad-slot="9140112864"
                            ></ins>
                           
                        </Paper>
                        <Paper style={{ margin: 20, backgroundColor: "snow", padding: 20 }}>
                            <CodeDisplay code={topics.code} />
                        </Paper>
                        <Paper style={{ margin: 20, backgroundColor: "snow", padding: 20 }}>
                            <p dangerouslySetInnerHTML={{ __html: topics.content }}></p>
                        </Paper>
                    </>
                )}
            </div>
        </Base>
    );
};

export default Codes;
