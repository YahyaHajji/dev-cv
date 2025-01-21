import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Language = [
  { name: "English", value: 80 },
  { name: "French", value: 60 },
  { name: "Russian", value: 30 },
  { name: "Arabic", value: 90 },
];

const Languages = () => {
  const [progress, setProgress] = useState(Language.map(() => 0));
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });

    // Intersection Observer to trigger animation
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.5 } // Start animation when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (startAnimation) {
      // Animating the progress bars
      Language.forEach((lang, index) => {
        const interval = setInterval(() => {
          setProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            if (updatedProgress[index] < lang.value) {
              updatedProgress[index] += 1; // Increment by 1% at a time
            } else {
              clearInterval(interval);
            }
            return updatedProgress;
          });
        }, 50); // Adjust speed by changing this value
      });
    }
  }, [startAnimation]);

  return (
    <div ref={sectionRef} id="Languages" className="flex flex-col items-center text-white py-8">
      <h2
        data-aos="fade-down"
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#009E66] to-[#00C77B] mb-6"
      >
        Languages I Speak 
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {Language.map((Lang, index) => (
          <motion.div
            key={Lang.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-36 h-36"> {/* Increased size */}
              <CircularProgressbar
                value={progress[index]}
                text={`${progress[index]}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "rgba(0, 199, 123, 1)",
                  trailColor: "#1e293b",
                })}
              />
            </div>
            <div className="mt-2 text-lg font-semibold">{Lang.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Languages;