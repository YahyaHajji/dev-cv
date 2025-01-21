import React, { useEffect } from "react";

const LanguagesButton = () => {
  useEffect(() => {
    // Set gtranslate settings
    window.gtranslateSettings = {
      default_language: "en",
      native_language_names: true,
      detect_browser_language: true,
      languages: ["en", "fr", "es", "ar", "ru"],
      wrapper_selector: ".gtranslate_wrapper",
      flag_style: "3d",
    };

    // Create script element
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="gtranslate_wrapper"
      style={{
        backgroundColor: "#111",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        display: "inline-block",
      }}
    ></div>
  );
};

export default LanguagesButton;