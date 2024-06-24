import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import image1 from '../styles/img/carousel-1.jpg'
import image2 from '../styles/img/carousel-2.jpg'
import image3 from '../styles/img/carousel-3.jpg'
import '../styles/lib/owlcarousel/assets/owl.carousel.min.css'
import aboutimg from '../styles/img/about.jpg'
import cat1 from '../styles/img/cat-1.jpg'
import cat2 from '../styles/img/cat-2.jpg'
import cat3 from '../styles/img/cat-3.jpg'
import cat4 from '../styles/img/cat-4.jpg'
import cat5 from '../styles/img/cat-5.jpg'
import cat6 from '../styles/img/cat-6.jpg'
import cat7 from '../styles/img/cat-7.jpg'
import cat8 from '../styles/img/cat-8.jpg'
import team1 from '../styles/img/team-1.jpg'
import team2 from '../styles/img/team-2.jpg'
import team3 from '../styles/img/team-3.jpg'
import team4 from '../styles/img/team-4.jpg'
import blog1 from '../styles/img/sathya.jpg'
import blog2 from '../styles/img/blog-2.jpg'
import blog3 from '../styles/img/blog-3.jpg'
import { useNavigate } from 'react-router-dom'
import useAxios from '../utils/useAxios'
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from 'axios'


export default function Index({ placeholder }) {
    const baseUrl = "https://www.acadamicfolio.online/app";
    const api = useAxios();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const token = localStorage.getItem("authTokens");
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(baseUrl + '/blogsindex/'); // Update the API endpoint accordingly
                setBlogs(response.data.slice(0, 6)); // Slice the response to get the first 6 blogs
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);




    const handleCreatePost = async () => {
        const formData = new FormData();
        formData.append("content", content);

        try {
            const response = await api.post(baseUrl + "/post-problem/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/blogs")
            Swal.fire({
                title: "We have received your queryand will get back soon",
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

    // Customize Quill toolbar and default text color
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }], // drop-down for selecting text color and background color
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    // Set default text color
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "align",
        "list",
        "bullet",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return date.toLocaleDateString('en-IN', options); // 'en-IN' for English (India), adjust according to your locale
    };

    return (
        <div>
            <Base>
                <div className="container-fluid p-0 pb-5 mb-5">
                    <div id="header-carousel" className="carousel slide carousel-fade" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
                            <li data-target="#header-carousel" data-slide-to="1"></li>
                            <li data-target="#header-carousel" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active" style={{ minHeight: '300px' }}>
                                <img className="position-relative w-100" src={image1} style={{ minHeight: '300px', objectFit: 'cover' }} alt="Carousel Slide 1" />
                                <div className="carousel-caption d-flex align-items-center justify-content-center">
                                    <div className="p-5" style={{ width: '100%', maxWidth: '900px' }}>
                                        <h5 className="text-white text-uppercase mb-md-3">Best Online Courses</h5>
                                        <h1 className="display-3 text-white mb-md-4">Best Education From Your Home</h1>
                                        <a href="/signup" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Register Now</a>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item" style={{ minHeight: '300px' }}>
                                <img className="position-relative w-100" src={image2} style={{ minHeight: '300px', objectFit: 'cover' }} alt="Carousel Slide 2" />
                                <div className="carousel-caption d-flex align-items-center justify-content-center">
                                    <div className="p-5" style={{ width: '100%', maxWidth: '900px' }}>
                                        <h5 className="text-white text-uppercase mb-md-3">Elevate Your Work with a Stunning Portfolio</h5>
                                        <h1 className="display-3 text-white mb-md-4">Stunning Portfolio Websites</h1>
                                        <a href="/contact" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Contact Now</a>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item" style={{ minHeight: '300px' }}>
                                <img className="position-relative w-100" src={image3} style={{ minHeight: '300px', objectFit: 'cover' }} alt="Carousel Slide 3" />
                                <div className="carousel-caption d-flex align-items-center justify-content-center">
                                    <div className="p-5" style={{ width: '100%', maxWidth: '900px' }}>
                                        <h5 className="text-white text-uppercase mb-md-3">Drive Growth with a Dynamic Business Website</h5>
                                        <h1 className="display-3 text-white mb-md-4">Empowering Small Businesses</h1>
                                        <a href="/signup" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Register Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
                    crossorigin="anonymous"></script>
                <ins class="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-6919135852803356"
                    data-ad-slot="4480234004"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>


                <div className="container-fluid py-5">
                    <div className="container py-5">
                        <div className="row align-items-center">
                            <div className="col-lg-5">
                                <img className="img-fluid rounded mb-4 mb-lg-0" src={aboutimg} alt="About Us" />
                            </div>
                            <div className="col-lg-7">
                                <div className="text-left mb-4">
                                    <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>About Us</h5>
                                    <h1>Innovative Way To Learn</h1>
                                </div>
                                <p>Our website is a dynamic hub for tech enthusiasts, offering a diverse range of content. Dive into our engaging blogs covering latest tech trends and insights. Explore a collection of hilarious memes that will tickle your funny bone. Get hands-on with our extensive library of code snippets, aiding both beginners and experts. Learn at your own pace with our comprehensive tutorials, covering a wide array of topics. Access our user-friendly dashboard for personalized experiences and easy navigation. Join our community and unleash your creativity in the world of technology!</p>
                                <a href="/signup" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-fluid py-5">
                    <div className="container py-5">
                        <div className="row align-items-center">

                            <div className="col-lg-12" style={{ justifyContent: 'center',alignContent:'center' }}>
                                <div className="text-left mb-4">
                                    <h5 className="text-primary text-uppercase mb-3 text-center" style={{ letterSpacing: '5px' }}>About Us</h5>
                                    <h1 className='text-center'>Professional Website Solutions for Portfolios & Small Businesses</h1>
                                </div>
                                <p>Transform your online presence with custom-designed websites that reflect your brand and drive growth. We create visually stunning portfolio websites and dynamic small business sites with features like responsive design, e-commerce integration, and SEO optimization. Our process includes thorough consultation, collaborative design, rigorous testing, and ongoing support to ensure your site remains effective and up-to-date.</p>
                                <center><a href="/contact"  className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Contact Now</a></center>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-fluid py-5">
                    <div className="container pt-5 pb-3">
                        <div className="text-center mb-5">
                            <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Services</h5>
                            <h1>Our Top Services</h1>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                    <img className="img-fluid" src={cat1} alt="Web Design" />
                                    <a className="cat-overlay text-white text-decoration-none" href="/tutorials">
                                        <h4 className="text-white font-weight-medium">Web Design</h4>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                    <img className="img-fluid" src={cat2} alt="Development" />
                                    <a className="cat-overlay text-white text-decoration-none" href="/tutorials">
                                        <h4 className="text-white font-weight-medium">Development</h4>

                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                    <img className="img-fluid" src={cat3} alt="Game Design" />
                                    <a className="cat-overlay text-white text-decoration-none" href="/tutorials">
                                        <h4 className="text-white font-weight-medium">Tutorials</h4>

                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                    <img className="img-fluid" src={cat4} alt="Game Design" />
                                    <a className="cat-overlay text-white text-decoration-none" href="/tutorials">
                                        <h4 className="text-white font-weight-medium">Blogs</h4>

                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                    <img className="img-fluid" src={cat5} alt="Game Design" />
                                    <a className="cat-overlay text-white text-decoration-none" href="/tutorials">
                                        <h4 className="text-white font-weight-medium">Code Snippets</h4>

                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                    <img className="img-fluid" src={cat6} alt="Game Design" />
                                    <a className="cat-overlay text-white text-decoration-none" href="/tutorials">
                                        <h4 className="text-white font-weight-medium">Short videos</h4>

                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                    <img className="img-fluid" src={cat7} alt="Game Design" />
                                    <a className="cat-overlay text-white text-decoration-none" href="/tutorials">
                                        <h4 className="text-white font-weight-medium">Tests</h4>

                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                    <img className="img-fluid" src={cat8} alt="SEO" />
                                    <a className="cat-overlay text-white text-decoration-none" href="/tutorials">
                                        <h4 className="text-white font-weight-medium">Task Manger</h4>

                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
                    crossorigin="anonymous"></script>
                <ins class="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-6919135852803356"
                    data-ad-slot="4480234004"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>


                <div class="container-fluid py-5">
                    <div class="container py-5">
                        <div class="text-center mb-5">
                            <h5 class="text-primary text-uppercase mb-3" style={{ 'letter-spacing': '5px' }}>Blogs</h5>
                            <h1>Latest Blogs</h1>
                        </div>
                        <div class="row">
                            {blogs.map(blog => (
                                <div class="col-lg-4 col-md-6 mb-4">
                                    <div class="rounded overflow-hidden mb-2">

                                        <div class="bg-secondary p-4">
                                            <div class="d-flex justify-content-between mb-3">
                                                <small class="m-0"><i class="fa fa-eye text-primary mr-2"></i>{blog.views}</small>
                                                <small class="m-0"><i class="far fa-clock text-primary mr-2"></i>{formatDate(blog.date)}</small>
                                            </div>
                                            <a class="h5" href={`/blogs/${blog.id}/`}>{blog.title}</a>
                                            <div class="border-top mt-4 pt-4">
                                                <a className="btn btn-primary py-2 px-4 ml-auto d-none d-lg-block" href={`/blogs/${blog.id}/`}>Read Blog</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="container-fluid bg-registration py-5" style={{ margin: '90px 0' }}>
                    <div className="container py-5">
                        <div className="row align-items-center">
                            <div className="col-lg-7 mb-5 mb-lg-0">
                                <div className="mb-4">
                                    <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Need Any Help</h5>
                                    <h1 className="text-white">Drop your coding issues here</h1>
                                </div>
                                <p className="text-white">
                                    "Have a problem? Drop it in the form below and let me help you out! I'll personally address your issue and send you a solution straight to your inbox. Don't hesitate, let's get it resolved together!"</p>
                                <ul className="list-inline text-white m-0">
                                    <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Errors in code</li>
                                    <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Problem in downloading new softwares</li>
                                    <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Errors in your projects</li>
                                </ul>
                            </div>
                            <div className="col-lg-5">
                                <div className="card border-0">
                                    <div className="card-header bg-light text-center p-4">
                                        <h1 className="m-0">Your Query</h1>
                                    </div>
                                    <div className="card-body rounded-bottom bg-primary p-5">
                                        <form>

                                            <ReactQuill
                                                value={content}
                                                onChange={setContent}
                                                placeholder={placeholder || "Start typing..."}
                                                modules={modules}
                                                formats={formats}
                                                style={{ color: "#000000" }} // Set default text color to black
                                            />
                                            {token ? (
                                                <div>
                                                    <button className="btn btn-dark btn-block border-0 py-3" onClick={handleCreatePost}>Send now</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className='text-center text-white'>Login now to send query</p>
                                                    <div>
                                                        <button className="btn btn-dark btn-block border-0 py-3" href='/signin'>Login</button>
                                                    </div>
                                                </>
                                            )}

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-fluid py-5">
                    <div className="container pt-5 pb-3">
                        <div className="text-center mb-5">
                            <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>Team</h5>
                            <h1>Meet Our Team</h1>
                        </div>
                        <div className="row" style={{ alignContent: 'center', justifyContent: 'center' }}>

                            <div className="col-md-6 col-lg-3 text-center team mb-4">
                                <div className="team-item rounded overflow-hidden mb-2">
                                    <div className="team-img position-relative">
                                        <img className="img-fluid" src={blog1} alt="" />
                                        <div className="team-social">
                                            <a className="btn btn-outline-light btn-square mx-1" href="#"><i className="fab fa-twitter"></i></a>
                                            <a className="btn btn-outline-light btn-square mx-1" href="#"><i className="fab fa-facebook-f"></i></a>
                                            <a className="btn btn-outline-light btn-square mx-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                                        </div>
                                    </div>
                                    <div className="bg-secondary p-4">
                                        <h5>K satyanarayana</h5>
                                        <p className="m-0">Developer</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </Base>
        </div>
    )
}
