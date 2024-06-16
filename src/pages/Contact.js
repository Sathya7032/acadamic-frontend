import React, { useState } from 'react'
import Base from '../components/Base'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function Contact() {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({});


    const baseUrl = "https://acadamicfolio.onine/app";
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!name.trim()) {
            errors.name = 'Name is required';
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (!subject.trim()) {
            errors.subject = 'Subject is required';
        }
        if (!message.trim()) {
            errors.message = 'Message is required';
        }
        setErrors(errors);

        // If errors exist, return without submitting the form
        if (Object.keys(errors).length > 0) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);

        try {
            const response = await axios.post(baseUrl + "/contact/", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            navigate("/contact");
            Swal.fire({
              title: "Thank you for contacting us....",
              width: 400,
              timer: 2000,
              toast: true,
              timerProgressBar: true,
              padding: "3em",
              color: "#716add",
            });
            console.log(response.data);
          } catch (error) {
            console.error("Error creating blog post:", error);
          }

    };

    return (
        <div>
            <Base>
                <div>
                    {/* Header Start */}
                    <div className="container-fluid page-header" style={{ marginBottom: "90px" }}>
                        <div className="container">
                            <div className="d-flex flex-column justify-content-center" style={{ minHeight: "300px" }}>
                                <h3 className="display-4 text-white text-uppercase">Contact</h3>
                                <div className="d-inline-flex text-white">
                                    <p className="m-0 text-uppercase"><a className="text-white" href="/">Home</a></p>
                                    <i className="fa fa-angle-double-right pt-1 px-3"></i>
                                    <p className="m-0 text-uppercase">Contact</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Header End */}

                    {/* Contact Start */}
                    <div className="container-fluid py-5">
                        <div className="container py-5">
                            <div className="text-center mb-5">
                                <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>Contact</h5>
                                <h1>Contact For Any Query</h1>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="contact-form bg-secondary rounded p-5">
                                        <div id="success"></div>
                                        <form name="sentMessage" onSubmit={handleSubmit} id="contactForm" noValidate>
                                            <div className="control-group">
                                                <input type="text" className={`form-control border-0 p-4 ${errors.name ? 'is-invalid' : ''}`} id="name" onChange={(e) => setName(e.target.value)} value={name}  placeholder="Your Name" required />
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="control-group">
                                                <input type="email" className={`form-control border-0 p-4 ${errors.email ? 'is-invalid' : ''}`}   id="email" onChange={(e)=> setEmail(e.target.value)} value={email} placeholder="Your Email" required />
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="control-group">
                                                <input type="text" className={`form-control border-0 p-4 ${errors.subject ? 'is-invalid' : ''}`} id="subject" onChange={(e)=> setSubject(e.target.value)} value={subject}  placeholder="Subject" required />
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="control-group">
                                                <textarea className={`form-control border-0 py-3 px-4 ${errors.message ? 'is-invalid' : ''}`} rows="5" id="message" onChange={(e)=> setMessage(e.target.value)} value={message}  placeholder="Message" required></textarea>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="text-center">
                                                <button className="btn btn-primary py-3 px-5" type="submit" id="sendMessageButton">Send Message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Contact End */}
                </div>

            </Base>
        </div>
    )
}