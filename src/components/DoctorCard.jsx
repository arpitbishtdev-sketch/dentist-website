// import { useEffect, useState, useRef } from "react";
// import "./DoctorCard.css";
// import { doctors } from "../data/doctors";

// export default function DoctorCard({ onOpenTeam }) {
//   const [index, setIndex] = useState(0);

//   const cardRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % doctors.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const doctor = doctors[index];

//   const handleClick = () => {
//     const rect = cardRef.current.getBoundingClientRect();

//     onOpenTeam(rect);
//   };

//   return (
//     <div className="doctor-card-wrapper">
//       <div className="doctor-card" ref={cardRef}>
//         <div className="know-more" onClick={handleClick}>
//           Know More →
//         </div>

//         <img src={doctor.img} className="doctor-img" />

//         <div className="doctor-info">
//           <div className="doctor-name">{doctor.name}</div>
//           <div className="doctor-role">{doctor.role}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import gsap from "gsap"; // Import GSAP
import "./DoctorCard.css";
import { doctors } from "../data/doctors";

export default function DoctorCard({ onOpenTeam }) {
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);
  const infoRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Start Exit Animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIndex((prev) => (prev + 1) % doctors.length);
        },
      });

      tl.to(infoRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      }).to(
        imgRef.current,
        { scale: 1.1, filter: "blur(5px)", opacity: 0, duration: 0.5 },
        "-=0.2",
      );
    }, 4000); // 4 seconds for a slower, premium feel

    return () => clearInterval(interval);
  }, []);

  // 2. Entrance Animation whenever Index changes
  useEffect(() => {
    gsap.fromTo(
      imgRef.current,
      { scale: 1.2, opacity: 0, filter: "blur(10px)" },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "expo.out",
      },
    );

    gsap.fromTo(
      infoRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power4.out" },
    );
  }, [index]);

  const doctor = doctors[index];

  return (
    <div className="doctor-card-wrapper">
      <div className="doctor-card" ref={cardRef}>
        <div
          className="know-more"
          onClick={() => onOpenTeam(cardRef.current.getBoundingClientRect())}
        >
          Know More →
        </div>

        {/* Added ref to Image and Info */}
        <img
          src={doctor.img}
          className="doctor-img"
          ref={imgRef}
          alt={doctor.name}
        />

        <div className="doctor-info" ref={infoRef}>
          <div className="doctor-name gold-text">{doctor.name}</div>
          <div className="doctor-role">{doctor.role}</div>
        </div>
      </div>
    </div>
  );
}
