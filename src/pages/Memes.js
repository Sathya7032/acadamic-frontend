import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import axios from "axios";

const Memes = () => {
    const baseUrl = "https://www.acadamicfolio.online/app";

    const [memes, setMemes] = useState([]);

    useEffect(() => {
        fetchMemes();
    }, []);

    const fetchMemes = async () => {
        try {
            const response = await axios.get(baseUrl + "/memes/");
            console.log(response.data);
            setMemes(response.data);
        } catch (error) {
            console.error("Error fetching memes:", error);
        }
    };

    return (
        <div>
            <Base>
                <div className="main-wrapper">
                    <div className="container-fluid page-header" style={{ marginBottom: "90px" }}>
                        <div className="container">
                            <div className="d-flex flex-column justify-content-center" style={{ minHeight: "300px" }}>
                                <h3 className="display-4 text-white text-uppercase">Memes</h3>
                                <div className="d-inline-flex text-white">
                                    <p className="m-0 text-uppercase"><a className="text-white" href="/">Home</a></p>
                                    <i className="fa fa-angle-double-right pt-1 px-3"></i>
                                    <p className="m-0 text-uppercase">Memes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="section blog-wrap bg-gray">
                        <div className="container">
                            <div className="row">
                                {memes.map((meme) => (
                                    <div key={meme.id} className="col-lg-4 col-md-4 mb-5" style={{border:'tomato solid 1px'}}>
                                        <div className="blog-item">
                                            <img
                                                src={meme.images}
                                                alt=""
                                                className="img-fluid rounded"
                                            />

                                            <div className="blog-item-content bg-white p-4">
                                              

                                                <h3 className="mt-3 mb-3">
                                                    <a href="blog-single.html">
                                                        {meme.description}
                                                    </a>
                                                </h3>
                                                <p className="mb-4">
                                                    <span style={{ color: "red", fontWeight: "bold" }}>
                                                        Posted by:{" "}
                                                    </span>
                                                    <span style={{ color: "black", fontWeight: "bold", textTransform: "uppercase" }}>
                                                        {meme.user.username}
                                                    </span>
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </Base>
        </div>
    );
};

export default Memes;
