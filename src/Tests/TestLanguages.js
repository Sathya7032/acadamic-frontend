import React, { useEffect, useState } from 'react'
import Base1 from '../user/Base1'
import { Divider, List, ListItem, Typography } from '@mui/material';
import axios from 'axios';


const TestLanguages = () => {
  const baseUrl = "https://www.acadamicfolio.online/app";
  const [langs, setLangs] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await axios.get(baseUrl + "/languageMcq/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res.data);
      setLangs(res.data);
    });
  };
  return (
    <div>
      <Base1>
        <Typography
          variant="h4"
          color="primary"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          Test Languages
        </Typography>
        <List
          variant="outlined"
          sx={{
            minWidth: 240,
            borderRadius: 'sm',
            marginTop: 7,
          }}
        >
          {langs.map((lang, index) => (
            <div key={index}>
              <Divider />
              <a href={`/testtopics/${lang.id}`} 
               style={{
                textDecoration: 'none',
                color: '#007bff',
                transition: 'color 0.3s ease',
                cursor: 'pointer', 
                display: 'block', 
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#0056b3';e.target.style.color='white' }} 
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'snow';e.target.style.color='#007bff' }}
              >
                <ListItem>
                  {index + 1}. {lang.name}
                </ListItem>
              </a>
            </div>
          ))}
          <Divider />
        </List>

      </Base1>
    </div>
  )
}

export default TestLanguages
