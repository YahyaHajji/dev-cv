import React, { useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Sample static data
const educationData = [
    { year: "2015 - 2017", title: "Master's Degree in Software Engineering - University of Technology", description: "Specialized in advanced algorithms, machine learning, and cloud computing. Graduated with honors." },
    { year: "2012 - 2015", title: "Bachelor's Degree in Computer Science - International University", description: "Focused on software development, database systems, and networking principles." },
    { year: "2010 - 2012", title: "High School Diploma - Science Stream", description: "Achieved top grades in mathematics, physics, and computer science." },
];

const experienceData = [
    { year: "2021 - Present", title: "Senior Software Engineer - Tech Innovators Ltd.", description: "Leading a team of developers to build scalable web applications and APIs using modern frameworks." },
    { year: "2018 - 2021", title: "Frontend Developer - Creative Solutions Inc.", description: "Designed and implemented user interfaces for various SaaS products, improving user retention by 20%." },
    { year: "2016 - 2018", title: "Junior Web Developer - StartUp Hub", description: "Developed responsive websites and contributed to backend integrations for e-commerce platforms." },
];

const Timeline = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1500, // Slower fade duration (ms)
            easing: "ease-in-out",
        });
    }, []);

    return (
        <Box id="Education" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, p: 3 }}>
            <Typography variant="h4" className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#009E66] to-[#00C77B]" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>Education & Experience</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 4, position: "relative", width: "100%" }}>
                {/* Vertical Timeline */}
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        height: "100%",
                        width: "4px",
                        backgroundColor: "#009E66",
                    }}
                >
                    {educationData.map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: "16px",
                                height: "16px",
                                backgroundColor: "#009E66",
                                borderRadius: "50%",
                                position: "absolute",
                                top: `${(index / (educationData.length - 1)) * 100}%`,
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    ))}
                </Box>

                {/* Education Section */}
                <Box sx={{ flex: 1, pr: 6 }}>
                    <Typography variant="h5" className="w-5 h-5 text-white" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>Education</Typography>
                    {educationData.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 1.5, // Slower motion duration (seconds)
                                delay: index * 0.5, // Slower stagger delay
                            }}
                            key={index}
                        >
                            <Card sx={{ mb: 3, backgroundColor: "#111011" }} data-aos="fade-right">
                                <CardContent>
                                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "#009E66" }}>{item.year}</Typography>
                                    <Typography variant="h6" sx={{ color: "#e2e8f0" }}>{item.title}</Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "#797878" }}>{item.description}</Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </Box>

                {/* Experience Section */}
                <Box sx={{ flex: 1, pl: 6 }}>
                    <Typography variant="h5" className="w-5 h-5 text-white" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>Experience</Typography>
                    {experienceData.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 1.5, // Slower motion duration (seconds)
                                delay: index * 0.5, // Slower stagger delay
                            }}
                            key={index}
                        >
                            <Card sx={{ mb: 3, backgroundColor: "#111011" }} data-aos="fade-left">
                                <CardContent>
                                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "#009E66" }}>{item.year}</Typography>
                                    <Typography variant="h6" sx={{ color: "#e2e8f0" }}>{item.title}</Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "#797878" }}>{item.description}</Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Timeline;