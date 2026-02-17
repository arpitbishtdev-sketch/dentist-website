import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./implants.css";

gsap.registerPlugin(ScrollTrigger);

const Implants = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Text stagger animation
      gsap.from(".reveal-item", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="implants-section" ref={sectionRef}>
      <div className="implants-container">
        {/* Left Side: Visual/Image */}
        <div className="implants-image-area" ref={imageRef}>
          <div className="experience-tag">15+ YEARS OF EXPERTISE</div>
          <img
            src="https://res.cloudinary.com/dirixa5no/image/upload/v1771319093/img3_mysrij.jpg"
            alt="Dental Implant"
          />
          <div className="image-accent-box"></div>
        </div>

        {/* Right Side: Content */}
        <div className="implants-content" ref={textRef}>
          <span className="subtitle reveal-item">RESTORATIVE EXCELLENCE</span>
          <h2 className="title reveal-item">
            Precision Dental <br /> Implants
          </h2>
          <p className="description reveal-item">
            Regain your confidence with India's leading implant technology. We
            use high-grade Bio-compatible Titanium to ensure a lifetime of
            strength and natural aesthetics.
          </p>

          <div className="implant-features">
            <div className="feature-card reveal-item">
              <span className="icon">◈</span>
              <div>
                <h4>Lifetime Durability</h4>
                <p>Designed to last 25+ years with proper care.</p>
              </div>
            </div>
            <div className="feature-card reveal-item">
              <span className="icon">◈</span>
              <div>
                <h4>Natural Feel</h4>
                <p>Indistinguishable from your natural teeth.</p>
              </div>
            </div>
          </div>

          <div className="cta-area reveal-item">
            <div className="price-tag">Starts at ₹25,000</div>
            <button className="premium-btn">Check Eligibility</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Implants;
