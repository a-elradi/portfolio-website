"use client";
import React, { useState } from 'react';
import { 
  Menu, X, Github, Linkedin, Mail, ExternalLink, ArrowRight, 
  GraduationCap, Trophy, Briefcase, Folder, Award, ChevronRight, FileText
} from 'lucide-react';

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth Scroll Function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const projects = [
    {
      title: "AI-Powered Rehabilitation & Educational System (TECHTRAP)",
      category: "AI/ML",
      description: "Huawei ICT Competition - Top 10 National Ranking. Developed intelligent system for children with special needs using ML and adaptive algorithms.",
      technologies: ["Python", "OpenCV", "Machine Learning", "Signal Processing"],
      highlight: "🏆 Top 10 National Ranking"
    },
    {
      title: "Advanced Firefighter Robot",
      category: "Robotics",
      description: "Annual Fire Festival - Ministry of Interior & Civil Defense Partnership. Autonomous firefighter robot with thermal imaging, obstacle detection, and autonomous navigation.",
      technologies: ["PID", "LIDAR", "Computer Vision", "Thermal Imaging", "C++"],
      highlight: "🔥 Government Partnership"
    },
    {
      title: "AMR Warehouse Robot",
      category: "Robotics",
      description: "Capstone Project - Shifa National Medical Supply. Autonomous mobile robot with SLAM navigation, computer vision, reducing manual operations by 40%.",
      technologies: ["ROS", "SLAM", "Python", "OpenCV", "YOLO"],
      highlight: "📦 60% Efficiency Gain"
    },
    {
      title: "Advanced Computer Vision Projects",
      category: "Computer Vision",
      description: "Real-time object detection, image processing, and visual analysis systems using state-of-the-art techniques.",
      technologies: ["OpenCV", "PyTorch", "YOLO", "Python"],
      highlight: "✓ 95%+ Accuracy"
    },
    {
      title: "IoT-Based Automation Systems",
      category: "IoT",
      description: "Scalable IoT solutions for academic and industrial applications with real-time monitoring and control.",
      technologies: ["Arduino", "Embedded Systems", "MQTT", "IoT"],
      highlight: "✓ Production Deployed"
    },
    {
      title: "Full-Stack Web Platforms",
      category: "Web",
      description: "Complete e-commerce and web applications with modern frameworks and responsive design.",
      technologies: ["React", "Node.js", "MongoDB", "Shopify Liquid"],
      highlight: "💻 Full-Stack"
    }
  ];

  const skills = [
    { category: "AI & ML", items: ["Python", "TensorFlow", "PyTorch", "Deep Learning"] },
    { category: "Computer Vision", items: ["OpenCV", "YOLO", "Image Processing", "Object Detection"] },
    { category: "Robotics & IoT", items: ["ROS", "Esp32", "Arduino", "Embedded Systems"] },
    { category: "Web Development", items: ["React", "Node.js", "Shopify", "Full-Stack"] },
    { category: "Languages", items: ["Python", "C/C++", "JavaScript", "Java"] },
    { category: "Cloud & DevOps", items: ["Docker", "Git", "Linux", "Cloud Platforms"] }
  ];

  const experiences = [
    {
      title: "President & Founder – IoT Club",
      company: "University of Technology Bahrain",
      period: "2023 - Present (3 Years)",
      highlights: ["Led 130+ active members", "Organized quarterly innovation challenges", "Award-winning projects"]
    },
    {
      title: "IT Technical Support & Web Developer",
      company: "Glam Moda & Almahmoudia Company",
      period: "2024 - 2025",
      highlights: ["Shopify specialization",  "System optimization"]
    },
    {
      title: "Robotics Workshop Instructor",
      company: "University of Technology Bahrain",
      period: "2023 - Present",
      highlights: ["Led workshops", "Sumo Robot Competition Winner", "Mentored 20+ students"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans">

      {/* Navigation */}
      <nav className="fixed w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              ABDALLA ELSIDDIG
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {['home','projects','skills','experience','contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-400 hover:text-white transition-all text-sm font-medium tracking-wide uppercase hover:scale-105"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28}/> : <Menu size={28}/>}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-white/10 p-6 flex flex-col space-y-4">
            {['home','projects','skills','experience','contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-300 text-left py-2 text-lg capitalize"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-24 px-6">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-blue-400 font-medium tracking-widest uppercase">Robotics & AI Engineer</h2>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none">
                Abdalla <br/><span className="text-slate-400">Elsiddig</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                Specializing in Autonomous Mobile Robots (AMR), Computer Vision, and AI-driven systems. President of the IoT Club with a passion for building innovative solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all active:scale-95"
              >
                View My Work <ArrowRight size={18}/>
              </button>
              
              <a 
                href="https://github.com/a-elradi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-slate-800 border border-white/10 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-700 transition-all"
              >
                <Github size={20}/> Full Code
              </a>
            </div>

            <div className="flex gap-6 items-center pt-4">
               <a href="https://linkedin.com/in/abdalla-elradi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={24}/>
               </a>
               <a href="https://github.com/a-elradi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={24}/>
               </a>
               <a href="mailto:Abdallaelsiddig.m@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  <Mail size={24}/>
               </a>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
             <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
             <div className="relative border border-white/10 bg-slate-800/50 backdrop-blur-2xl rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="grid grid-cols-2 gap-4">
                   {skills.slice(0, 4).map((s, idx) => (
                      <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                         <div className="text-blue-400 mb-2 font-bold">{s.category}</div>
                         <div className="text-xs text-gray-500">{s.items.join(", ")}</div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
            <Folder className="text-blue-500"/> Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-slate-800/40 border border-white/5 rounded-2xl p-8 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all hover:-translate-y-2">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">{project.category}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-sm font-medium text-slate-300 italic">{project.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
            <Trophy className="text-yellow-500"/> Core Expertise
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {skills.map((skillGroup, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-300 border-l-2 border-blue-500 pl-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, i) => (
                    <div key={i} className="px-4 py-2 bg-slate-800/50 border border-white/5 rounded-lg text-sm hover:border-blue-500/50 transition-all cursor-default">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
            <Briefcase className="text-green-500"/> Professional Journey
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l border-white/10 pb-12 last:pb-0 group">
                <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-all"></div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-gray-500 font-medium">{exp.period}</div>
                  <div className="md:col-span-3 space-y-2">
                    <h3 className="text-2xl font-bold">{exp.title}</h3>
                    <div className="text-blue-400 font-medium">{exp.company}</div>
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-gray-400 flex items-center gap-2">
                          <ChevronRight size={14} className="text-blue-500"/> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold">Let's Connect</h2>
            <p className="text-gray-400 text-lg">Interested in Robotics, AI, or IOT? I'm always open to discussing new projects and opportunities.</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <a 
              href="mailto:Abdallaelsiddig.m@gmail.com"
              className="px-10 py-5 bg-blue-600 rounded-2xl font-bold text-xl flex items-center gap-3 hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-900/20"
            >
              <Mail size={24}/> Send Message
            </a>

            <div className="flex gap-8 pt-6">
              <a 
                href="https://github.com/a-elradi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                  <Github size={32}/>
                </div>
                <span className="text-xs text-gray-500">GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/abdalla-elradi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                  <Linkedin size={32} className="text-blue-400"/>
                </div>
                <span className="text-xs text-gray-500">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          © {new Date().getFullYear()} Abdalla Elsiddig. Built with React & Lucide.
        </div>
      </footer>

    </div>
  );
};

export default Portfolio;
