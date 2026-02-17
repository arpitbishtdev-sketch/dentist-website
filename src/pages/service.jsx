import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./service.css";

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState("Teeth Cleaning");
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);

  const services = [
    {
      name: "Teeth Cleaning",
      url: "https://res.cloudinary.com/dirixa5no/image/upload/v1771319305/img1_y1bltj.jpg",
    },
    {
      name: "Root Canal Treatment",
      url: "https://res.cloudinary.com/dirixa5no/image/upload/v1771319087/img2_z47ebn.jpg",
    },
    {
      name: "Dental Implants",
      url: "https://res.cloudinary.com/dirixa5no/image/upload/v1771319093/img3_mysrij.jpg",
    },
    {
      name: "Teeth Whitening",
      url: "https://res.cloudinary.com/dirixa5no/image/upload/v1771322125/img4_dqp2qi.jpg",
    },
    {
      name: "Braces / Aligners",
      url: "https://res.cloudinary.com/dirixa5no/image/upload/v1771322128/img5_e6zj29.jpg",
    },
    {
      name: "Emergency Dental Care",
      url: "https://res.cloudinary.com/dirixa5no/image/upload/v1771322141/img6_vmyc6q.jpg",
    },
  ];

  // GSAP: Smooth Cross-fade and Text Slide
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(imgRef.current, { opacity: 0, duration: 0.3 })
      .to(imgRef.current, { opacity: 1, duration: 0.8, ease: "power2.inOut" })
      .fromTo(
        overlayRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.5",
      );
  }, [selectedService]);

  const currentImageData = services.find((s) => s.name === selectedService);

  return (
    <div className="page-wrapper">
      <div className="booking-card">
        {/* LEFT SIDE: SLIMMER IMAGE SECTION */}
        <div className="image-column">
          <div
            ref={imgRef}
            className="bg-img-container"
            style={{ backgroundImage: `url(${currentImageData.url})` }}
          >
            <div className="img-overlay" ref={overlayRef}>
              <span className="subtitle">BOUTIQUE CLINIC</span>
              <h1 className="title">
                Elevate <br /> Your Smile
              </h1>
              <div className="divider"></div>
              <p className="description">
                Book a private session with our specialists.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CLEAN FORM SECTION */}
        <div className="form-column">
          <div className="form-header">
            <nav className="mini-nav">
              <span className="active-nav">Book Your Service</span>
            </nav>
          </div>

          <form className="booking-form">
            <div className="input-group full">
              <label>FULL NAME</label>
              <input
                type="text"
                placeholder="Enter your name"
                onFocus={() => setIsUserInteracting(true)}
              />
            </div>

            <div className="flex-row">
              <div className="input-group">
                <label>EMAIL</label>
                <input type="email" placeholder="email@example.com" />
              </div>
              <div className="input-group">
                <label>PHONE</label>
                <input type="tel" placeholder="+1 000 000 000" />
              </div>
            </div>

            <div className="flex-row">
              <div className="input-group">
                <label>DATE</label>
                <input type="date" />
              </div>
              <div className="input-group">
                <label>TIME SLOT</label>
                <select>
                  <option>Morning (9AM - 12PM)</option>
                  <option>Afternoon (1PM - 5PM)</option>
                </select>
              </div>
            </div>

            <div className="input-group full">
              <label>CHOOSE SERVICE</label>
              <select
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  setIsUserInteracting(true);
                }}
              >
                {services.map((s, i) => (
                  <option key={i} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-btn">
              BOOK APPOINTMENT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
