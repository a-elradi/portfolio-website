"use client";
import React, { useState } from 'react';
import { 
  Menu, X, Github, Linkedin, Mail, ExternalLink, ArrowRight,
  GraduationCap, Trophy, Briefcase, Folder, Award, ChevronRight, FileText,
  User
} from 'lucide-react';

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const projects = [
    { title: "AI-Powered Rehabilitation & Educational System (TECHTRAP)", category: "AI/ML", description: "Huawei ICT Competition - Top 10 National Ranking. Developed intelligent system for children with special needs using ML and adaptive algorithms.", technologies: ["Python", "OpenCV", "Machine Learning", "Signal Processing"], highlight: "🏆 Top 10 National Ranking" },
    { title: "Advanced Firefighter Robot", category: "Robotics", description: "Annual Fire Festival - Ministry of Interior & Civil Defense Partnership. Autonomous firefighter robot with thermal imaging, obstacle detection, and autonomous navigation.", technologies: ["PID",  "Computer Vision", "Thermal Imaging", "C++"], highlight: "🤝 Government Partnership" },
    { title: "AMR Warehouse Robot", category: "Robotics", description: "Capstone Project - Shifa National Medical Supply. Autonomous mobile robot with SLAM navigation, computer vision, reducing manual operations by 40%.", technologies: ["ROS", "SLAM", "Python", "OpenCV", "YOLO"], highlight: "📦 60% Efficiency Gain" },
    { title: "Advanced Computer Vision Projects", category: "Computer Vision", description: "Real-time object detection, image processing, and visual analysis systems using state-of-the-art techniques.", technologies: ["OpenCV", "PyTorch", "YOLO", "Python"], highlight: "👁️ Vision Expert" },
    { title: "IoT-Based Automation Systems", category: "IoT", description: "Scalable IoT solutions for academic and industrial applications with real-time monitoring and control.", technologies: ["Arduino", "Embedded Systems", "MQTT", "IoT"], highlight: "✓ Production Deployed" },
    { title: "Full-Stack Web Platforms", category: "Web", description: "Complete e-commerce and web applications with modern frameworks and responsive design.", technologies: ["React", "Node.js", "MongoDB", "Shopify"], highlight: "🌐 Full-Stack" }
  ];

  const skills = [
    { category: "AI & ML", items: ["Python", "TensorFlow", "PyTorch", "Deep Learning"] },
    { category: "Computer Vision", items: ["OpenCV", "YOLO", "Image Processing", "Object Detection"] },
    { category: "Robotics & IoT", items: ["Esp32", "Arduino", "Embedded Systems"] },
    { category: "Web Development", items: ["React", "Node.js", "Shopify", "Full-Stack"] },
    { category: "Languages", items: ["Python", "C/C++", "JavaScript", "Java"] },
    { category: "Cloud & DevOps", items: ["Docker", "Git", "Linux", "Cloud Platforms"] }
  ];

  const experiences = [
    { title: "President & Founder – IoT Club", company: "University of Technology Bahrain", period: "2023 - Present (3 Years)", highlights: ["Led 130+ active members", "Organized quarterly innovation challenges", "Award-winning projects"] },
    { title: "IT Technical Support & Web Developer", company: "Glam Moda", period: "2024 - 2025", highlights: ["Shopify specialization", "System optimization","Digital Marketing"] },
    { title: "Robotics& IoT Workshop Instructor", company: "University of Technology Bahrain", period: "2023 - Present", highlights: ["Led workshops", " Robot Competition ", "Mentored 40+ students"] }
  ];

  return (
    <div className="min-h-screen bg-[#030611] text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex justify-between items-center h-24">
            <div className="text-xl font-bold tracking-tight">ABDALLA ELSIDDIG</div>
            <div className="hidden md:flex items-center space-x-12">
              {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item)}
                  className="text-gray-300 hover:text-white transition-all text-sm font-medium tracking-wide uppercase"
                >
                  {item}
                </button>
              ))}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-400">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-[#030611]">
        {/* Profile Image Background Container */}
        <div className="absolute top-0 right-0 w-1/2 h-full z-0">
          <div className="relative w-full h-full">
            <img 
              src="/profile.png" 
              alt="Abdalla Elsiddig" 
              className="w-full h-full object-cover"
            />
            {/* Fade effect to blend image into background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030611] via-[#030611]/80 to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#0a1120] border border-[#1b263b] rounded-full mb-8">
                <GraduationCap className="text-[#1bd1e3]" size={16} />
                <span className="text-[#1bd1e3] text-xs font-semibold tracking-wide uppercase">Senior Informatics Engineering Student</span>
              </div>
              <h1 className="text-7xl font-extrabold mb-5 tracking-tight">Abdalla Elsiddig</h1>
              
              <h2 className="text-3xl font-medium text-gray-200 leading-tight mb-6">
                Informatics Engineer <span className="text-[#1bd1e3] font-bold">&</span> AI & Computer Vision | Robotics
              </h2>
              
              <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-xl">
                Building intelligent systems that solve real-world problems through innovation and technical excellence.
              </p>
              
              <div className="grid grid-cols-2 gap-x-5 gap-y-5 mb-16 max-w-lg">
                <a 
                  href="mailto:Abdallaelsiddig.m@gmail.com" 
                  className="px-8 py-4 bg-[#1bd1e3] hover:bg-[#18b9c9] text-black rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#1bd1e3]/10"
                >
                  <Mail size={18} /> Get In Touch
                </a>
                
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-[#0a1120] hover:bg-[#0e1629] border border-[#1b263b] rounded-xl font-bold transition-all flex items-center justify-center gap-3 group"
                >
                  <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform" size={18} /> View My Work
                </button>
                
                <a 
                  href="/Abdalla-Elsiddig.Resume.pdf" 
                  download 
                  className="px-8 py-4 bg-[#0a1120] hover:bg-[#0e1629] border border-[#1b263b] rounded-xl font-bold transition-all flex items-center justify-center gap-3"
                >
                  <FileText size={18} /> Download Resume
                </a>
                <a 
                  href="/Abdalla-Elsiddig.Resume.pdf" 
                  target="_blank"
                  className="px-8 py-4 bg-[#0a1120] hover:bg-[#0e1629] border border-[#1b263b] rounded-xl font-bold transition-all flex items-center justify-center gap-3"
                >
                  <FileText size={18} /> Preview Resume
                </a>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Trophy, value: "Top 10", label: "National Ranking" },
                  { icon: Briefcase, value: "1.5+", label: "Years Experience" },
                  { icon: Award, value: "12+", label: "Certifications" },
                  { icon: Folder, value: "15+", label: "Projects" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#0a1120]/60 border border-[#1b263b]/50 rounded-2xl p-5 backdrop-blur-sm">
                    <item.icon className="text-[#1bd1e3] mb-3" size={20} />
                    <div className="text-2xl font-bold text-white mb-0.5">{item.value}</div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty Right Side to allow background image visibility */}
            <div className="hidden lg:block h-full"></div>
          </div>
        </div>
      </section>

      {/* ... rest of the sections (About, Projects, Skills, Experience, Contact) ... */}
    </div>
  );
};

export default Portfolio;
