import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./price.css";

gsap.registerPlugin(ScrollTrigger);

const Price = () => {
  const priceRef = useRef(null);

  const priceData = [
    {
      name: "Teeth Cleaning",
      price: "₹2,499",
      detail: "Deep scaling & polishing with airflow technology",
      popular: false,
    },
    {
      name: "Laser Whitening",
      price: "₹8,999",
      detail: "Instant shade improvement in one session",
      popular: true,
    },
    {
      name: "Root Canal",
      price: "₹4,500",
      detail: "Single sitting, painless specialized treatment",
      popular: false,
    },
    {
      name: "Dental Implants",
      price: "₹25,000",
      detail: "Lifetime warranty, premium titanium finish",
      popular: false,
    },
  ];

  useEffect(() => {
    const cards = priceRef.current.querySelectorAll(".price-card");

    // set initial state (depth feel)
    gsap.set(cards, {
      opacity: 0,
      y: 60,
      scale: 0.92,
      rotationY: 8,
      transformPerspective: 1000,
    });

    // premium entrance animation
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 1.2,
      stagger: {
        each: 0.18,
        ease: "power2.out",
      },
      ease: "expo.out",
      scrollTrigger: {
        trigger: priceRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // subtle floating effect for premium feel
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: "+=6",
        duration: 2 + i * 0.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, []);

  return (
    <section className="price-section">
      <div className="price-container" ref={priceRef}>
        <div className="price-header">
          <span className="subtitle">EXPERIENCE EXCELLENCE</span>
          <h2 className="title">Premium Care, Honest Pricing</h2>
          <p className="header-desc">
            Invest in a smile that lasts a lifetime with our world-class
            treatments.
          </p>
        </div>

        <div className="price-grid">
          {priceData.map((item, index) => (
            <div
              className={`price-card ${item.popular ? "popular-card" : ""}`}
              key={index}
            >
              {item.popular && <div className="badge">MOST POPULAR</div>}
              <div className="card-inner">
                <h3>{item.name}</h3>
                <p className="detail">{item.detail}</p>
                <div className="price-divider"></div>
                <div className="price-value">
                  <span className="from">Investment starts at</span>
                  <span className="amount">{item.price}</span>
                </div>
                <button className="book-mini-btn">Book Consultation</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Price;
