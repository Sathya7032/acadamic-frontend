import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Base from '../components/Base';

export default function Tutorials() {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

  const [tutorials, setTutorials] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await axios.get(baseUrl + "/tutorials/",{withCredentials: true}).then((res) => {
      console.log(res.data);
      setTutorials(res.data);
    });
  };
  return (
    <div>
      <Base>
        <div className="container-fluid page-header" style={{ marginBottom: "90px" }}>
          <div className="container">
            <div className="d-flex flex-column justify-content-center" style={{ minHeight: "300px" }}>
              <h3 className="display-4 text-white text-uppercase">Tutorials</h3>
              <div className="d-inline-flex text-white">
                <p className="m-0 text-uppercase"><a className="text-white" href="/">Home</a></p>
                <i className="fa fa-angle-double-right pt-1 px-3"></i>
                <p className="m-0 text-uppercase">Tutorials</p>
              </div>
            </div>
          </div>
        </div>


        <div class="container-fluid py-6">
          <div class="container py-6">
          
            <div class="row">
            {tutorials.map((tutorial, index) => (
              <div key={index} class="col-lg-4 col-md-5 mb-2">
                <div class="rounded overflow-hidden mb-2">
                <img class="img-fluid" src={tutorial.tutorialImage} alt=""/>
                  <div class="bg-secondary p-4">
                   <h3 className='text-center' style={{color:'tomato',textTransform:'uppercase'}}>{tutorial.tutorialName}</h3>
                    <a class="h5" href={`/tutorials/${tutorial.id}`}>{tutorial.tutorialContent}</a>
                    <div class="border-top mt-4 pt-4">
                    <a href={`/tutorials/${tutorial.id}`} className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Explore</a>
                    </div>
                  </div>
                </div>
              </div>
                 ))}

            </div>
          </div>
        </div>



      </Base>
    </div>
  )
}
