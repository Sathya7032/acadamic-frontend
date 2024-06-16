import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import CodeDisplay from "./CodeDisplay";


const Codes = () => {
    const baseUrl = "https://acadamicfolio.online/app";

    const { id } = useParams();

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + `/languages/codes/${id}/`)
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
                <div>
                    <Paper style={{ margin: 20, backgroundColor: "darkslategrey" }}>
                        <h2 style={{ textAlign: "center", color: 'white', padding: 10, textTransform: 'uppercase' }}>{topics.title}</h2>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
                        crossorigin="anonymous"></script>
                    <ins class="adsbygoogle"
                        style={{display:"block",textAlign:"center"}}
                        data-ad-layout="in-article"
                        data-ad-format="fluid"
                        data-ad-client="ca-pub-6919135852803356"
                        data-ad-slot="9140112864"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({ });
                    </script>
                    </Paper>
                    <Paper style={{ margin: 20, backgroundColor: "snow", padding: 20 }}>
                        <CodeDisplay code={topics.code} />
                    </Paper>
                    <Paper style={{ margin: 20, backgroundColor: "snow", padding: 20 }}>
                        <Typography>{topics.content}</Typography>
                    </Paper>
                </div>
            </Base>
        </div>
    );
};

export default Codes;