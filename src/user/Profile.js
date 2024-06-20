import React from 'react'
import Base1 from "./Base1";
import '../styles/css/profile.css'

const Profile = () => {
    return (
        <div>
            <Base1>
                <div className="container">
                    <div className="main-body">
                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb" className="main-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                <li className="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
                                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                            </ol>
                        </nav>

                        <div className="row gutters-sm">
                            {/* Profile Card */}
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                            <div className="mt-3">
                                                <h4>John Doe</h4>
                                                <p className="text-secondary mb-1">Full Stack Developer</p>
                                                <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                                <button className="btn btn-primary">Follow</button>
                                                <button className="btn btn-outline-primary">Message</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Social Links */}
                                <div className="card mt-3">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">Website</h6>
                                            <span className="text-secondary">https://bootdey.com</span>
                                        </li>
                                        {/* Add other list items for GitHub, Twitter, Instagram, Facebook */}
                                    </ul>
                                </div>
                            </div>

                            {/* Profile Details and Project Status */}
                            <div className="col-md-8">
                                {/* Profile Details */}
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                Kenneth Valdez
                                            </div>
                                        </div>
                                        <hr />
                                        {/* Add other profile details like Email, Phone, etc. */}
                                    </div>
                                </div>

                                {/* Project Status */}
                                <div className="row gutters-sm">
                                    <div className="col-sm-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                                                {/* Render project status details */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add another col-sm-6 card for the second project status */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Base1>
        </div>
    )
}

export default Profile
