import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
          }`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#009E66]/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, aosType, ...other }) {
  useEffect(() => {
    if (value === index) {
      AOS.refresh();
    }
  }, [value, index]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      data-aos={value === index ? aosType : ""}
      data-aos-duration="1500" // Slower animation duration
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  aosType: PropTypes.string,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Static Mock Data
const mockProjects = [
  {
    id: 1,
    Img: "/images/pro1.png",
    Title: "Project One",
    Description: "This is the description for project one.",
    Link: "#",
  },
  {
    id: 2,
    Img: "/images/pro2.jpg",
    Title: "Project Two",
    Description: "This is the description for project two.",
    Link: "#",
  },
  {
    id: 3,
    Img: "/images/pro3.jpg",
    Title: "Project Three",
    Description: "This is the description for project three.",
    Link: "#",
  },
  {
    id: 4,
    Img: "/images/pro4.jpg",
    Title: "Project Four",
    Description: "This is the description for project four.",
    Link: "#",
  },
  {
    id: 5,
    Img: "/images/pro5.jpg",
    Title: "Project Five",
    Description: "This is the description for project five.",
    Link: "#",
  },
  {
    id: 6,
    Img: "/images/pro6.jpg",
    Title: "Project Six",
    Description: "This is the description for project six.",
    Link: "#",
  },
  {
    id: 7,
    Img: "/images/pro7.jpg",
    Title: "Project Seven",
    Description: "This is the description for project seven.",
    Link: "#",
  },
  {
    id: 8,
    Img: "/images/pro8.jpg",
    Title: "Project Eight",
    Description: "This is the description for project eight.",
    Link: "#",
  },
];

const mockCertificates = [
  {
    id: 1,
    Img: "/images/cert7.jpg",
  },
  {
    id: 2,
    Img: "/images/cert2.jpg",
  },
  {
    id: 3,
    Img: "/images/cert3.jpg",
  },
  {
    id: 4,
    Img: "/images/cert4.jpg",
  },
  {
    id: 5,
    Img: "/images/cert5.jpg",
  },
  {
    id: 6,
    Img: "/images/cert6.jpg",
  },
  {
    id: 7,
    Img: "/images/cert8.jpg"
  },
  {
    id: 8,
    Img: "/images/cert1.png"
  }
  // Add more mock certificates as needed
];

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? mockProjects : mockProjects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? mockCertificates : mockCertificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#111011] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1500">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#009E66] to-[#00C77B]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#F1F1F0",
                "&.Mui-selected": {
                  color: "#009E66",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#009E66",
              },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />} label="Skills" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} aosType="fade-up-right">
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <CardProject key={index} {...project} />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
          </div>
        </TabPanel>

        <TabPanel value={value} index={1} aosType="fade-up-right">
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayedCertificates.map((certificate, index) => (
                <Certificate key={index} ImgSertif={certificate.Img} />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
          </div>
        </TabPanel>

        <TabPanel value={value} index={2} aosType="fade-up-left">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {techStacks.map((stack, index) => (
              <TechStackIcon key={index} TechStackIcon={stack.icon} Language={stack.language} />
            ))}
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}