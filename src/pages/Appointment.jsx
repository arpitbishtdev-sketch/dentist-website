import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Appointment.css";
import Footer from "../components/Footer";

export default function Appointment() {
  const pageRef = useRef();

  // State for Form Handling
  const [formData, setFormData] = useState({
    fullName: "",
    date: "",
    time: "Morning (9AM - 12PM)",
    service: "Premium Whitening",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment Requested for ${formData.fullName}`);
    console.log("Form Data:", formData);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".appointment-card", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        ".anim-item",
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5",
      );

      tl.from(
        ".gold-line",
        {
          scaleX: 0,
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.8",
      );

      // FIX: allow interaction
      gsap.set(".appointment-card", { clearProps: "transform" });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="appointment-page" ref={pageRef}>
        <div className="appointment-card">
          {/* LEFT SIDE - Lightened Navy */}
          <div className="card-left">
            <span className="anim-item label-gold">Boutique Clinic</span>
            <h1 className="anim-item">Elevate Your Smile</h1>
            <p className="anim-item">
              Book a private session with our specialists in a serene, luxury
              environment.
            </p>
            <div className="gold-line"></div>

            <div className="contact-details anim-item">
              <p>Direct: +1 800 LUX DENT</p>
              <p>Location: Beverly Hills, CA</p>
            </div>
          </div>

          {/* RIGHT SIDE - Interactive Form */}
          <div className="card-right">
            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-group anim-item">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-row anim-item">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time Slot</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  >
                    <option>Morning (9AM - 12PM)</option>
                    <option>Afternoon (1PM - 4PM)</option>
                    <option>Evening (5PM - 8PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group anim-item">
                <label>Choose Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option>Premium Whitening</option>
                  <option>Invisible Aligners</option>
                  <option>Smile Makeover</option>
                  <option>Routine Checkup</option>
                </select>
              </div>

              <button type="submit" className="submit-premium anim-item">
                Confirm Reservation
                <div className="shine-line"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
