import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;

    // Smooth reveal animation
    gsap.fromTo(
      el.querySelectorAll(".footer-column"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      },
    );
  }, []);

  return (
    <footer className="footer-wrapper" ref={footerRef}>
      <div className="footer-content">
        {/* BRAND COLUMN */}
        <div className="footer-column brand-col">
          <h2 className="gold-gradient-text">DENTAL EXCELLENCE</h2>
          <p className="brand-tagline">
            Precision engineering for the perfect smile. Experience world-class
            dental artistry in the heart of Mumbai.
          </p>
          <div className="social-links">
            <a href="#instagram" className="social-icon">
              IG
            </a>
            <a href="#linkedin" className="social-icon">
              LN
            </a>
            <a href="#facebook" className="social-icon">
              FB
            </a>
          </div>
        </div>

        {/* SERVICES COLUMN */}
        <div className="footer-column">
          <h3 className="column-title">Specialities</h3>
          <ul className="footer-list">
            <li>
              <a href="#">Cosmetic Dentistry</a>
            </li>
            <li>
              <a href="#">Dental Implants</a>
            </li>
            <li>
              <a href="#">Invisible Braces</a>
            </li>
            <li>
              <a href="#">Teeth Whitening</a>
            </li>
          </ul>
        </div>

        {/* VISIT COLUMN */}
        <div className="footer-column">
          <h3 className="column-title">The Clinic</h3>
          <div className="contact-info">
            <p>123 Luxury Lane, South Mumbai</p>
            <p>Maharashtra, India 400001</p>
            <a href="tel:+919876543210" className="gold-phone">
              +91 98765 43210
            </a>
            <button className="book-btn">Book Appointment</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="divider-line"></div>
        <div className="bottom-flex">
          <p>© 2026 Dental Excellence. Crafted with Precision.</p>
          <p>Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
