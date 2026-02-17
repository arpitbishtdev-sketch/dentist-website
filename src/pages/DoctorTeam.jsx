import { useRef, useLayoutEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./DoctorTeam.css";
import { doctors } from "../data/doctors";
import gsap from "gsap";

export default function DoctorTeam({ rect, onClose }) {
  const overlayRef = useRef(null);
  const cardsRef = useRef([]);
  const bgTextRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Clear refs on re-render
  cardsRef.current = [];

  useLayoutEffect(() => {
    if (!rect) return;

    const ctx = gsap.context(() => {
      const el = overlayRef.current;

      // 1. Position the overlay exactly over the small card
      gsap.set(el, {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        borderRadius: "20px",
        opacity: 1,
      });

      const tl = gsap.timeline({
        onComplete: () => setShowContent(true),
      });

      // 2. The Big Expansion
      tl.to(el, {
        x: 0,
        y: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        duration: 1.2,
        ease: "expo.inOut",
      });
    });

    return () => ctx.revert();
  }, [rect]);

  // Handle Entrance of Content
  useLayoutEffect(() => {
    if (showContent) {
      const tl = gsap.timeline();

      // entrance
      tl.fromTo(
        bgTextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.05, scale: 1, duration: 2, ease: "power4.out" },
      );

      // infinite horizontal movement (carousel feel)
      gsap.to(bgTextRef.current, {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      tl.fromTo(
        ".team-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
        "-=1.5",
      );

      tl.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=1",
      );
    }
  }, [showContent]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // Fade out content first
    tl.to([".team-grid", ".doctor-team-header", ".bg-watermark"], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
    });

    // Shrink back to card
    tl.to(overlayRef.current, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      borderRadius: "20px",
      duration: 0.8,
      ease: "expo.inOut",
    });
  };

  return (
    <div ref={overlayRef} className="doctor-team-overlay">
      {/* 4. Animated Watermark */}
      <div className="bg-watermark" ref={bgTextRef}>
        LUXE DENTAL CARE
      </div>

      {showContent && (
        <>
          <Navbar />
          <section className="doctor-team-section">
            <div className="doctor-team-container">
              <div className="doctor-team-header">
                <h1 className="team-title gold-gradient-text">
                  Master Professionals
                </h1>
                <button className="close-btn" onClick={handleClose}>
                  BACK TO HOME
                </button>
              </div>

              <div className="team-grid">
                {doctors.map((doctor, index) => (
                  <div
                    key={doctor.id}
                    className="team-card"
                    ref={(el) => (cardsRef.current[index] = el)}
                  >
                    <div className="img-wrapper">
                      <img
                        src={doctor.img}
                        className="team-img"
                        alt={doctor.name}
                      />
                    </div>
                    <div className="team-card-content">
                      <h2 className="gold-text-small">{doctor.name}</h2>
                      <p className="role">{doctor.role}</p>
                      <p className="team-desc">{doctor.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
