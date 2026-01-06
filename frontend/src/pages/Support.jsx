// File: src/pages/Support.jsx
import React, { useEffect } from "react";

export default function Support() {
  useEffect(() => {
    const spinner = document.getElementById("spinner");
    if (spinner) spinner.classList.remove("show");
  }, []);

  return (
    <>
      {/* Spinner (giữ lại nhưng sẽ tự tắt) */}
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Contact Us</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Contact</li>
        </ol>
      </div>

      {/* Contact Section */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-lg-7">
                <h5 className="text-primary">Let’s Connect</h5>
                <h1 className="display-5 mb-4">Send Your Message</h1>

                <form>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="name" placeholder="Your Name" />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" placeholder="Your Email" />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="phone" placeholder="Phone" />
                        <label htmlFor="phone">Your Phone</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="project" placeholder="Project" />
                        <label htmlFor="project">Your Project</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="subject" placeholder="Subject" />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: "160px" }}
                        ></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100 py-3">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-lg-5">
                <iframe
                  className="rounded w-100"
                  style={{ height: "100%" }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5139338597123!2d106.70124969999999!3d10.771894099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEvhu7kgdGh14bqtdCBDYW8gVGjhuq9uZw!5e0!3m2!1svi!2s!4v1767679492315!5m2!1svi!2s"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="map"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <a href="#" className="btn btn-primary btn-lg-square back-to-top">
        <i className="fa fa-arrow-up"></i>
      </a>
    </>
  );
}
