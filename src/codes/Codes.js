import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import CodeDisplay from "./CodeDisplay";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Codes = () => {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const { url } = useParams();
    const [topics, setTopics] = useState(null);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            <div style={{ margin: isMobile ? 0 : 20, padding: isMobile ? '10px' : '40px' }}>
                {error && (
                    <Typography color="error" style={{ margin: 20 }}>
                        {error}
                    </Typography>
                )}
                {topics && (
                    <>
                        <Paper style={{ margin: isMobile ? 0 : 20, backgroundColor: "darkslategrey" }}>
                            <Typography
                                variant={isMobile ? "h6" : "h4"}
                                style={{ textAlign: "center", color: 'white', padding: isMobile ? 10 : 20, textTransform: 'uppercase' }}
                            >
                                {topics.title}
                            </Typography>
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
                        <Paper style={{ margin: isMobile ? 0 : 20, backgroundColor: "snow", padding: isMobile ? 10 : 20 }}>
                            <CodeDisplay code={topics.code} />
                        </Paper>
                        <Paper style={{ margin: isMobile ? 0 : 20, backgroundColor: "snow", padding: isMobile ? 10 : 20 }}>
                            <Typography
                                style={{ fontSize: isMobile ? '14px' : 'inherit' }}
                                dangerouslySetInnerHTML={{ __html: topics.content }}
                            />
                        </Paper>
                    </>
                )}
            </div>
        </Base>
    );
};

export default Codes;
