// File: src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";

export default function ProductDetails() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Single Page Header */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Single Product</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Single Product</li>
        </ol>
      </div>

      {/* Single Products Start */}
      <div className="container-fluid shop py-5">
        <div className="container py-5">
          <div className="row g-4">
            {/* LEFT SIDEBAR */}
            <div className="col-lg-5 col-xl-3">
              {/* Search */}
              <div className="input-group w-100 mx-auto d-flex mb-4">
                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search"></i>
                </span>
              </div>

              {/* Categories */}
              <div className="product-categories mb-4">
                <h4>Products Categories</h4>
                <ul className="list-unstyled">
                  {[
                    { name: "Accessories", count: 3 },
                    { name: "Electronics & Computer", count: 5 },
                    { name: "Laptops & Desktops", count: 2 },
                    { name: "Mobiles & Tablets", count: 8 },
                    { name: "SmartPhone & Smart TV", count: 5 },
                  ].map((c) => (
                    <li key={c.name}>
                      <div className="categories-item">
                        <a href="#" className="text-dark">
                          <i className="fas fa-apple-alt text-secondary me-2"></i>
                          {c.name}
                        </a>
                        <span>({c.count})</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Select By Color */}
              <div className="additional-product mb-4">
                <h4>Select By Color</h4>

                <div className="additional-product-item">
                  <input type="radio" className="me-2" id="color-gold" name="color" defaultChecked />
                  <label htmlFor="color-gold" className="text-dark">
                    {" "}
                    Gold
                  </label>
                </div>

                <div className="additional-product-item">
                  <input type="radio" className="me-2" id="color-green" name="color" />
                  <label htmlFor="color-green" className="text-dark">
                    {" "}
                    Green
                  </label>
                </div>

                <div className="additional-product-item">
                  <input type="radio" className="me-2" id="color-white" name="color" />
                  <label htmlFor="color-white" className="text-dark">
                    {" "}
                    White
                  </label>
                </div>
              </div>

              {/* Featured products */}
              <div className="featured-product mb-4">
                <h4 className="mb-3">Featured products</h4>

                {[
                  { img: "/img/product-3.png", title: "SmartPhone" },
                  { img: "/img/product-4.png", title: "Smart Camera" },
                  { img: "/img/product-5.png", title: "Smart Camera" },
                  { img: "/img/product-6.png", title: "Smart Camera" },
                  { img: "/img/product-7.png", title: "Camera Leance" },
                  { img: "/img/product-8.png", title: "Smart Camera" },
                ].map((p, idx) => (
                  <div className="featured-product-item" key={idx}>
                    <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                      <img src={p.img} className="img-fluid rounded" alt="Image" />
                    </div>
                    <div>
                      <h6 className="mb-2">{p.title}</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary"></i>
                        <i className="fa fa-star text-secondary"></i>
                        <i className="fa fa-star text-secondary"></i>
                        <i className="fa fa-star text-secondary"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-center my-4">
                  <a href="#" className="btn btn-primary px-4 py-3 rounded-pill w-100">
                    Vew More
                  </a>
                </div>
              </div>

              {/* Banner */}
              <a href="#">
                <div className="position-relative">
                  <img src="/img/product-banner-2.jpg" className="img-fluid w-100 rounded" alt="Image" />
                  <div
                    className="text-center position-absolute d-flex flex-column align-items-center justify-content-center rounded p-4"
                    style={{
                      width: "100%",
                      height: "100%",
                      top: 0,
                      right: 0,
                      background: "rgba(242, 139, 0, 0.3)",
                    }}
                  >
                    <h5 className="display-6 text-primary">SALE</h5>
                    <h4 className="text-secondary">Get UP To 50% Off</h4>
                    <a href="#" className="btn btn-primary rounded-pill px-4">
                      Shop Now
                    </a>
                  </div>
                </div>
              </a>

              {/* Tags */}
              <div className="product-tags my-4">
                <h4 className="mb-3">PRODUCT TAGS</h4>
                <div className="product-tags-items bg-light rounded p-3">
                  {["New", "brand", "black", "white", "tablats", "phone", "camera", "drone", "talevision", "slaes"].map(
                    (t) => (
                      <a key={t} href="#" className="border rounded py-1 px-2 mb-2 me-1 d-inline-block">
                        {t}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-lg-7 col-xl-9">
              <div className="row g-4 single-product">
                {/* Product images (tĩnh - thay cho owl carousel) */}
                <div className="col-xl-6">
                  <div className="bg-light rounded p-3">
                    <img src="/img/product-4.png" className="img-fluid rounded" alt="Image" />
                    <div className="d-flex gap-2 mt-3 flex-wrap">
                      {["/img/product-4.png", "/img/product-5.png", "/img/product-6.png", "/img/product-7.png", "/img/product-3.png"].map(
                        (img) => (
                          <img
                            key={img}
                            src={img}
                            alt="thumb"
                            className="img-fluid rounded"
                            style={{ width: 60, height: 60, objectFit: "cover", border: "2px solid var(--bs-primary)" }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Product info */}
                <div className="col-xl-6">
                  <h4 className="fw-bold mb-3">Smart Camera</h4>
                  <p className="mb-3">Category: Electronics</p>
                  <h5 className="fw-bold mb-3">3,35 $</h5>

                  <div className="d-flex mb-4">
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star"></i>
                  </div>

                  <div className="mb-3">
                    <div className="btn btn-primary d-inline-block rounded text-white py-1 px-4 me-2">
                      <i className="fab fa-facebook-f me-1"></i> Share
                    </div>
                    <div className="btn btn-secondary d-inline-block rounded text-white py-1 px-4 ms-2">
                      <i className="fab fa-twitter ms-1"></i> Share
                    </div>
                  </div>

                  <div className="d-flex flex-column mb-3">
                    <small>Product SKU: N/A</small>
                    <small>
                      Available: <strong className="text-primary">20 items in stock</strong>
                    </small>
                  </div>

                  <p className="mb-4">
                    The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.
                  </p>
                  <p className="mb-4">
                    Susp endisse ultricies nisi vel quam suscipit. Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish
                  </p>

                  <div className="input-group quantity mb-5" style={{ width: 100 }}>
                    <div className="input-group-btn">
                      <button type="button" className="btn btn-sm btn-minus rounded-circle bg-light border">
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <input type="text" className="form-control form-control-sm text-center border-0" value="1" readOnly />
                    <div className="input-group-btn">
                      <button type="button" className="btn btn-sm btn-plus rounded-circle bg-light border">
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <a href="#" className="btn btn-primary border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
                    <i className="fa fa-shopping-bag me-2 text-white"></i> Add to cart
                  </a>
                </div>

                {/* Tabs */}
                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button className="nav-link active border-white border-bottom-0" type="button">
                        Description
                      </button>
                      <button className="nav-link border-white border-bottom-0" type="button">
                        Reviews
                      </button>
                    </div>
                  </nav>

                  <div className="tab-content mb-5">
                    <div className="tab-pane active">
                      <p>
                        Our new <b className="fw-bold">HPB12 / A12 battery</b> is rated at 2000mAh and designed to power up Black and Decker / FireStorm line...
                      </p>
                      <b className="fw-bold">Black &amp; Decker Drills and Drivers:</b>
                      <p className="small">
                        BD12PSK, BDG1200K, BDGL12K, BDID1202, CD1200SK, CD12SFK...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Leave a Reply */}
                <form action="#">
                  <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input type="text" className="form-control border-0 me-4" placeholder="Yur Name *" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input type="email" className="form-control border-0" placeholder="Your Email *" />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="border-bottom rounded my-4">
                        <textarea className="form-control border-0" cols="30" rows="8" placeholder="Your Review *" spellCheck="false"></textarea>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="d-flex justify-content-between py-3 mb-5">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 me-3">Please rate:</p>
                          <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                            <i className="fa fa-star text-muted"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                        </div>

                        <a href="#" className="btn btn-primary border border-secondary text-primary rounded-pill px-4 py-3">
                          Post Comment
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Single Products End */}

      {/* Related Product Start (tĩnh) */}
      <div className="container-fluid related-product">
        <div className="container">
          <div className="mx-auto text-center pb-5" style={{ maxWidth: 700 }}>
            <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
              Related Products
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, asperiores ducimus sint quos tempore officia similique quia?
            </p>
          </div>

          {/* Thay owl-carousel bằng grid để giống layout */}
          <div className="row g-4 pb-5">
            {[1, 2, 3, 4].map((i) => (
              <div className="col-md-6 col-lg-4 col-xl-3" key={i}>
                <div className="related-item rounded">
                  <div className="related-item-inner border rounded">
                    <div className="related-item-inner-item">
                      <img src="/img/product-3.png" className="img-fluid w-100 rounded-top" alt="" />
                      <div className="related-new">New</div>
                      <div className="related-details">
                        <a href="#"><i className="fa fa-eye fa-1x"></i></a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                      <a href="#" className="d-block mb-2">SmartPhone</a>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>

                  <div className="related-item-add border border-top-0 rounded-bottom text-center p-4 pt-0">
                    <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4">
                      <i className="fas fa-shopping-cart me-2"></i> Add To Cart
                    </a>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary"></i>
                        <i className="fas fa-star text-primary"></i>
                        <i className="fas fa-star text-primary"></i>
                        <i className="fas fa-star text-primary"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="d-flex">
                        <a href="#" className="text-primary d-flex align-items-center justify-content-center me-3">
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random"></i>
                          </span>
                        </a>
                        <a href="#" className="text-primary d-flex align-items-center justify-content-center me-0">
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart"></i>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      {/* Related Product End */}
    </>
  );
}
