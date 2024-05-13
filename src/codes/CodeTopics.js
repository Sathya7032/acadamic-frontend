import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Divider, List, ListItem, Paper, Typography } from "@mui/material";

const CodeTopics = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

  const { id } = useParams();

  const [codes, setCodes] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + `/languages/${id}/codes/`)
      .then((response) => {
        setCodes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tutorials:", error);
      });
  }, [id]);

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
                  <a href={`/languages/codes/${code.code_id}/`}>
                    <li>
                      <span style={{fontSize:15,color:'darkslategrey',fontWeight:'bolder'}}>{index + 1}.     {code.title}</span>
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
