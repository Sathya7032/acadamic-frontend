import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import axios from "axios";


const Languages = () => {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

    const [lang, setLang] = useState([]);
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        await axios.get(baseUrl + "/languages/").then((res) => {
            console.log(res.data);
            setLang(res.data);
        });
    };
    return (
        <div>
            <Base>
                <div class="main-wrapper ">
                    <div className="container-fluid page-header" style={{ marginBottom: "90px" }}>
                        <div className="container">
                            <div className="d-flex flex-column justify-content-center" style={{ minHeight: "300px" }}>
                                <h3 className="display-4 text-white text-uppercase">Languages</h3>
                                <div className="d-inline-flex text-white">
                                    <p className="m-0 text-uppercase"><a className="text-white" href="/">Home</a></p>
                                    <i className="fa fa-angle-double-right pt-1 px-3"></i>
                                    <p className="m-0 text-uppercase">Languages</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid py-6">
                        <div class="container py-6">
                            <div class="row">

                                {lang.map((langs, index) => (
                                    <div key={langs.id} className="col-lg-5 col-md-4 mb-2 " style={{ border: 'black solid 1px', margin: 1 , backgroundColor: 'darkslategrey', borderRadius: 15, textTransform: 'uppercase' }}>
                                        <div className="blog-item m-3">
                                            <div className="blog-item-content p-3">
                                                <h3 className="mt-3 mb-3">
                                                    <a href={`/topics/${langs.id}/`}>
                                                        {index+1}.  {langs.language}
                                                    </a>
                                                </h3>
                                                <a
                                                    href={`/topics/${langs.id}/`}
                                                    className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                                                >
                                                    Topics
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>
            </Base>
        </div>
    );
};

export default Languages;