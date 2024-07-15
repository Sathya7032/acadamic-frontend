import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Divider, List, ListItem, Paper, Typography } from "@mui/material";

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
        <Paper style={{ margin: 20 }}>
          {codes ? (
            <ul style={{ listStyle: 'none' }}>
              {codes.map((code, index) => (
                <div key={code.id}>
                  <Divider/>
                  <a href={`/languages/codes/${code.url}/`}>
                    <li>

                      <span style={{fontSize:15,color:'darkslategrey',fontWeight:'bolder',padding:15}}>{index + 1}.     {code.title}</span>

                    </li>
                  </a>
                  <Divider />
                </div>
              ))}
            </ul>
          ) : (
            <h1 className="text-white">No codes yet</h1>
          )}
        </Paper>
      </Base>
    </div>
  );
};

export default CodeTopics;
