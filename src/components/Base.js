import React from 'react';
import '../styles/css/style.css'
import AuthContext from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Base = ({ children }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const token = localStorage.getItem("authTokens");

    const location = useLocation();
    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const { logoutUser } = React.useContext(AuthContext);

    return (
        <div>
            <div className="container-fluid d-none d-lg-block">
                <div className="row align-items-center py-4 px-xl-5">
                    <div className="col-lg-3">
                        <a href="/" className="text-decoration-none">
                            <h1 className="m-0">Academic<span className="text-primary">Folio</span></h1>
                        </a>
                    </div>

                    <div className="col-lg-3 text-right">
                        <div className="d-inline-flex align-items-center">
                            <i className="fa fa-2x fa-map-marker-alt text-primary mr-3"></i>
                            <div className="text-left">
                                <h6 className="font-weight-semi-bold mb-1">Our Office</h6>
                                <small>Lingampally, Hyderabad</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 text-right">
                        <div className="d-inline-flex align-items-center">
                            <i className="fa fa-2x fa-envelope text-primary mr-3"></i>
                            <div className="text-left">
                                <h6 className="font-weight-semi-bold mb-1">Email Us</h6>
                                <small>academicfolio@gmail.com</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 text-right">
                        <div className="d-inline-flex align-items-center">
                            <i className="fa fa-2x fa-phone text-primary mr-3"></i>
                            <div className="text-left">
                                <h6 className="font-weight-semi-bold mb-1">Call Us</h6>
                                <small>+91 7032488372</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row border-top px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">

                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="/" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0">Academic<span className="text-primary">Folio</span></h1>
                            </a>

                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                              
                            </button>
                            
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav py-0">
                                    <a href="/" className={`nav-item nav-link ${isActiveLink("/") ? "active" : ""}`}>Home</a>
                                    <a href="/tutorials" className={`nav-item nav-link ${isActiveLink("/tutorials") ? "active" : ""}`}>Tutorials</a>
                                    <a href="/blogs" className={`nav-item nav-link ${isActiveLink("/blogs") ? "active" : ""}`}>Blogs</a>
                                    <a href="/languages" className={`nav-item nav-link ${isActiveLink("/languages") ? "active" : ""}`}>Code</a>
                                    <a href="/contact" className={`nav-item nav-link ${isActiveLink("/contact") ? "active" : ""}`}>Contact</a>
                                    <a href="/shorts" className={`nav-item nav-link ${isActiveLink("/shorts") ? "active" : ""}`}>Shorts</a>
                                    {token ?(
                                        <a href="/dashboard" className={`nav-item nav-link ${isActiveLink("/dashboard") ? "active" : ""}`}>Dashboard</a>
                                    ):(
                                        <a href="/signin" className={`nav-item nav-link ${isActiveLink("/signin") ? "active" : ""}`}>Login</a>
                                    )}
                                </div>
                                {token ? (
                                    <>
                                        <a onClick={logoutUser} className="btn btn-primary py-2  px-3 ml-auto" >Logout</a>
                                    </>
                                ) : (
                                    <a className="btn btn-primary py-2  px-3 ml-auto" href="/signup">Register</a>
                                )}

                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            {children}

            <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" style={{ marginTop: "90px" }}>
                <div className="row pt-5">
                    <div className="col-lg-7 col-md-12">
                        <div className="row">
                            <div className="col-md-6 mb-5">
                                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Get In Touch</h5>
                                <p><i className="fa fa-map-marker-alt mr-2"></i>Lingampally, Hyderabad, India</p>
                                <p><i className="fa fa-phone-alt mr-2"></i>+91 7032488372</p>
                                <p><i className="fa fa-envelope mr-2"></i>sathichary581@gmail.com</p>
                                <div className="d-flex justify-content-start mt-4">
                                    <a className="btn btn-outline-light btn-square mr-2" href="/"><i className="fab fa-youtube"></i></a>
                                    <a className="btn btn-outline-light btn-square mr-2" href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-outline-light btn-square mr-2" href="/"><i className="fab fa-linkedin-in"></i></a>
                                    <a className="btn btn-outline-light btn-square" href="/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div className="col-md-6 mb-5">
                                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Our Courses</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <a className="text-white mb-2" href="/blogs"><i className="fa fa-angle-right mr-2"></i>Blogs</a>
                                    <a className="text-white mb-2" href="/tutorials"><i className="fa fa-angle-right mr-2"></i>Tutorials</a>
                                    <a className="text-white mb-2" href="/languages"><i className="fa fa-angle-right mr-2"></i>Code Snippets</a>
                                    <a className="text-white" href="/contact"><i className="fa fa-angle-right mr-2"></i>Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 mb-5">
                        <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Newsletter</h5>
                        <p>Stay updated with our latest news, offers, and tips! Subscribe to our newsletter for exclusive content delivered straight to your inbox. Don't miss out, sign up now!</p>
                        <div className="w-100">
                            <div className="input-group">
                                <input type="text" className="form-control border-light" style={{ padding: "30px" }} placeholder="Your Email Address" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary px-4" href="/">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5" style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}>
                <div className="row">
                    <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
                        <p className="m-0 text-white">&copy; <a href="/">AcadamicFolio</a>. All Rights Reserved. Designed by <a href="https://htmlcodex.com">AcadamicFolio</a>
                        </p>
                    </div>
                    <div className="col-lg-6 text-center text-md-right">
                        <ul className="nav d-inline-flex">
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="/">Privacy</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="/">Terms</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="/">FAQs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="/">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Base;
