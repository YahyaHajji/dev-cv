import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const Hobbies = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-8"
      id="Hobbies"
    >
      <div
        data-aos="fade-up"
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#009E66] to-[#00C77B] mb-6"
      >
        Hobbies
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 justify-center">
        <motion.div
          data-aos="fade-right"
          whileHover={{ scale: 1.1, rotate: 6 }}
          transition={{ duration: 0.2 }}
          className="hobitem uppercase font-semibold text-center p-4"
        >
          <img
            src="/images/sport.jpg"
            alt="Sport"
            className="w-3/4 h-4/4 object-cover rounded-t-xl mx-auto"
          />
          <div className="text-2xl text-white font-semibold mt-2">Sport</div>
        </motion.div>
        <motion.div
          data-aos="zoom-in"
          data-aos-delay="300"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="hobitem uppercase font-semibold text-center p-4"
        >
          <img
            src="/images/travel.jpg"
            alt="Traveling"
            className="w-3/4 h-4/4 object-cover rounded-t-xl mx-auto"
          />
          <div className="text-2xl text-white font-semibold mt-2">
            Traveling
          </div>
        </motion.div>
        <motion.div
          data-aos="fade-left"
          data-aos-delay="500"
          whileHover={{ scale: 1.1, rotate: -6 }}
          transition={{ duration: 0.2 }}
          className=" hobitem uppercase font-semibold text-center p-4"
        >
          <img
            src="/images/book.jpg"
            alt="Reading"
            className="w-3/4 h-4/4 object-cover rounded-t-xl mx-auto"
          />
          <div className="text-2xl text-white font-semibold mt-2">Reading</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hobbies;
