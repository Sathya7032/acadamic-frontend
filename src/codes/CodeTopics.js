import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import axios from "axios";
import {  Paper } from "@mui/material";

const CodeTopics = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

  const { url } = useParams();

  const [codes, setCodes] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + `/languages/${url}/codes/`)
      .then((response) => {
        setCodes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tutorials:", error);
      });
  }, [url]);

  return (
    <div>
      <Base>
        <Paper style={{ margin: 20, backgroundColor: "darkslategrey" }}>
          <h2 style={{ textAlign: "center", color: 'white', padding: 10 }}>Programs</h2>
        </Paper>
          {codes ? (
            <ul className='list-group '>
              {codes.map((code, index) => (
                <div key={code.id}>
                 
                  <a href={`/languages/codes/${code.url}/`}>
                    <li className='list-group-item'>

                      <span style={{fontSize:15,color:'darkslategrey',fontWeight:'bolder',padding:5}}>{index + 1}.     {code.title}</span>

                    </li>
                  </a>
                 
                </div>
              ))}
            </ul>
          ) : (
            <h1 className="text-white">No codes yet</h1>
          )}
      
      </Base>
    </div>
  );
};

export default CodeTopics;
