import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import GoogleMap from "../components/GoogleMap";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (!recaptchaToken) {
      Swal.fire({
        title: "Error!",
        text: "Please verify that you're not a robot.",
        icon: "error",
        confirmButtonColor: "#009E66",
      });
      setIsSubmitting(false);
      return;
    }
  
    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we send your message",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          recaptchaToken,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success",
          confirmButtonColor: "#009E66",
          timer: 2000,
          timerProgressBar: true,
        });
  
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setRecaptchaToken(null);
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#009E66",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div id="contacts">
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#009E66] to-[#00C77B]"
        >
          <span
            style={{
              color: "#009E66",
              backgroundImage:
                "linear-gradient(45deg, #009E66 10%, #00C77B 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[#009E66]/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#009E66] to-[#00C77B]">
                  Get in Touch
                </h2>
                <p className="text-gray-400">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#009E66] opacity-50" />
            </div>

            <form
              action=""
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#009E66] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#009E66]/30 transition-all duration-300 hover:border-[#009E66]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#009E66] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#009E66]/30 transition-all duration-300 hover:border-[#009E66]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#009E66] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#009E66]/30 transition-all duration-300 hover:border-[#009E66]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <ReCAPTCHA
                sitekey="6LdY_roqAAAAAAvV512vTwltl5_Bjx_zRNa-g4Hs" 
                onChange={handleRecaptchaChange}
                theme="dark" 
                size="normal" 
              />
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#009E66] to-[#00C77B] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#009E66]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          <div id="map" className="text-center pl-7 pt-[100px]">
            <GoogleMap />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;