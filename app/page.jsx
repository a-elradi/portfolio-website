"use client";
import React, { useState } from 'react';
import { 
  Menu, X, Github, Linkedin, Mail, ExternalLink, ArrowRight,
  GraduationCap, Trophy, Briefcase, Folder, Award, ChevronRight, FileText 
} from 'lucide-react';

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id.toLowerCase());
      setMobileMenuOpen(false);
    }
  };

  const projects = [
    { title: "AI-Powered Rehabilitation & Educational System (TECHTRAP)", category: "AI/ML", description: "Huawei ICT Competition - Top 10 National Ranking. Developed intelligent system for children with special needs using ML and adaptive algorithms.", technologies: ["Python", "OpenCV", "Machine Learning", "Signal Processing"], highlight: "🏆 Top 10 National Ranking" },
    { title: "Advanced Firefighter Robot", category: "Robotics", description: "Annual Fire Festival - Ministry of Interior & Civil Defense Partnership. Autonomous firefighter robot with thermal imaging, obstacle detection, and autonomous navigation.", technologies: ["PID", "LIDAR", "Computer Vision", "Thermal Imaging", "C++"], highlight: " Government Partnership" },
    { title: "AMR Warehouse Robot", category: "Robotics", description: "Capstone Project - Shifa National Medical Supply. Autonomous mobile robot with SLAM navigation, computer vision, reducing manual operations by 40%.", technologies: ["ROS", "SLAM", "Python", "OpenCV", "YOLO"], highlight: "📦 60% Efficiency Gain" },
    { title: "Advanced Computer Vision Projects", category: "Computer Vision", description: "Real-time object detection, image processing, and visual analysis systems using state-of-the-art techniques.", technologies: ["OpenCV", "PyTorch", "YOLO", "Python"], highlight: "✓ 95%+ Accuracy" },
    { title: "IoT-Based Automation Systems", category: "IoT", description: "Scalable IoT solutions for academic and industrial applications with real-time monitoring and control.", technologies: ["Arduino", "Embedded Systems", "MQTT", "IoT"], highlight: "✓ Production Deployed" },
    { title: "Full-Stack Web Platforms", category: "Web", description: "Complete e-commerce and web applications with modern frameworks and responsive design.", technologies: ["React", "Node.js", "MongoDB", "Shopify Liquid"], highlight: "✓ Full-Stack" }
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
    { title: "President & Founder – IoT Club", company: "University of Technology Bahrain", period: "2023 - Present (3 Years)", highlights: ["Led 130+ active members", "Organized quarterly innovation challenges", "Award-winning projects"] },
    { title: "IT Technical Support & Web Developer", company: "Glam Moda & Almahmoudia Company", period: "2024 - 2025", highlights: ["Shopify specialization", "System optimization"] },
    { title: "Robotics Workshop Instructor", company: "University of Technology Bahrain", period: "2023 - Present", highlights: ["Led workshops", "Sumo Robot Competition Winner", "Mentored 20+ students"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="text-xl font-bold tracking-tight"> ABDALLA ELSIDDIG </div>
            <div className="hidden md:flex items-center space-x-10">
              {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item)}
                  className="text-gray-400 hover:text-white transition-all text-sm font-medium tracking-wide uppercase"
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
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden bg-[#020617]">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-1/4 -left-20 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/50 border border-slate-800 rounded-full mb-8 shadow-sm">
                <GraduationCap className="text-teal-400" size={16} />
                <span className="text-gray-300 text-xs font-semibold tracking-wide uppercase">Senior Informatics Engineering Student</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight"> Abdalla Elsiddig </h1>
              <div className="relative inline-block mb-10">
                <h2 className="text-2xl md:text-3xl font-medium text-gray-300 leading-tight"> Informatics Engineer <span className="text-teal-400 font-bold">&</span> AI & Computer Vision | Robotics </h2>
                <div className="absolute -bottom-4 left-0 w-32 h-1 bg-gradient-to-r from-teal-400 to-transparent rounded-full" />
              </div>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl"> Building intelligent systems that solve real-world problems through innovation and technical excellence. </p>
              
              <div className="flex flex-wrap gap-4 mb-16">
                <a 
                  href="mailto:Abdallaelsiddig.m@gmail.com" 
                  className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white rounded-xl font-bold transition-all flex items-center gap-2.5 shadow-[0_4px_20px_rgba(20,184,166,0.3)] hover:-translate-y-0.5"
                >
                  <Mail size={18} /> Get In Touch
                </a>
                
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2.5 backdrop-blur-sm group"
                >
                  <ChevronRight className="text-teal-400 group-hover:translate-x-1 transition-transform" size={18} /> View My Work
                </button>
                
                <a 
                  href="/Abdalla-Elsiddig.Resume.pdf" 
                  download 
                  className="px-8 py-3.5 bg-slate-900 border border-slate-800 hover:border-teal-500/50 text-gray-300 rounded-xl font-bold transition-all flex items-center gap-2.5"
                >
                  <FileText size={18} /> Download Resume
                </a>
                <a 
                  href="/Abdalla-Elsiddig.Resume.pdf" 
                  target="_blank"
                  className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2.5"
                >
                  <FileText size={18} /> Preview Resume
                </a>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Trophy, value: "Top 10", label: "National Ranking" },
                  { icon: Briefcase, value: "1.5+", label: "Years Experience" },
                  { icon: Award, value: "12+", label: "Certifications" },
                  { icon: Folder, value: "15+", label: "Projects" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 group backdrop-blur-sm">
                    <item.icon className="text-teal-400 mb-3 group-hover:scale-110 transition-transform" size={20} />
                    <div className="text-xl font-bold text-white mb-0.5">{item.value}</div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Profile Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px]">
                <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-[80px]" />
                <div className="absolute inset-[-20px] border border-teal-500/20 rounded-full animate-[spin_20s_linear_infinite] opacity-50" style={{ borderStyle: 'dashed' }} />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-teal-500/50 p-2 bg-slate-900 shadow-[0_0_50px_rgba(45,212,191,0.2)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                    <img src="/profile.png" alt="Abdalla Elsiddig" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 uppercase tracking-wide">About Me</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-gray-300 text-lg leading-relaxed mb-6"> Final-year Informatics Engineering student with demonstrated expertise in artificial intelligence, computer vision, IoT, and robotics. With 1.5+ years of professional experience and a passion for emerging technologies, I combine academic excellence with real-world problem-solving. </p>
              <p className="text-gray-300 text-lg leading-relaxed"> I've led the IoT Club at my university for 3 years, mentoring 160+ students and organizing innovation challenges. My work consistently demonstrates the ability to take complex technical problems and deliver innovative, production-ready solutions. </p>
            </div>
            <div className="bg-slate-700/50 border border-teal-500/20 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-teal-400 uppercase text-sm tracking-widest">Key Specialties</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-center gap-2">✓ Autonomous Systems</li>
                <li className="flex items-center gap-2">✓ Deep Learning</li>
                <li className="flex items-center gap-2">✓ Robotics Design</li>
                <li className="flex items-center gap-2">✓ IoT Solutions</li>
                <li className="flex items-center gap-2">✓ Computer Vision</li>
                <li className="flex items-center gap-2">✓ Full-Stack Development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 uppercase tracking-wide">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-teal-500/20 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-teal-400 text-xs font-bold bg-teal-500/10 px-3 py-1 rounded-full tracking-wider uppercase"> {project.category} </span>
                  <span className="text-lg">{project.highlight}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-teal-400 transition-colors"> {project.title} </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed"> {project.description} </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, tidx) => (
                    <span key={tidx} className="text-[10px] uppercase font-bold bg-slate-700 text-gray-300 px-2 py-1 rounded"> {tech} </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 uppercase tracking-wide">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <div key={idx} className="bg-slate-700/50 border border-teal-500/20 rounded-xl p-6">
                <h3 className="font-bold text-teal-400 mb-4 uppercase text-xs tracking-widest">{skill.category}</h3>
                <div className="space-y-2">
                  {skill.items.map((item, iidx) => (
                    <div key={iidx} className="text-gray-300 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full shadow-[0_0_5px_rgba(45,212,191,0.5)]"></div> {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 uppercase tracking-wide">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-teal-500 pl-8 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-teal-500 rounded-full border-4 border-[#020617]"></div>
                <h3 className="text-2xl font-bold text-teal-400 mb-1">{exp.title}</h3>
                <p className="text-gray-400 mb-4 text-sm uppercase tracking-wider">{exp.company} • {exp.period}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hidx) => (
                    <li key={hidx} className="text-gray-300 text-sm flex items-start gap-2">
                      <ChevronRight size={14} className="mt-1 text-teal-500 min-w-[14px]" /> {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-r from-teal-600/10 to-transparent border-t border-teal-500/20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-wide">Let's Work Together</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto"> Open to exciting opportunities in AI, computer vision, and robotics. Let's build the future together. </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:Abdallaelsiddig.m@gmail.com" 
              className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <Mail size={20} /> Get In Touch
            </a>
            <div className="flex gap-4">
              <a 
                href="https://github.com/a-elradi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 border border-teal-500/20 rounded-xl hover:border-teal-500/50 transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/abdalla-elradi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 border border-teal-500/20 rounded-xl hover:border-teal-500/50 transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 text-gray-500 text-xs tracking-widest uppercase">
            <p className="mb-2 tracking-normal text-sm lowercase">✉️ Abdallaelsiddig.m@gmail.com • 📍 Riffa, Bahrain</p>
            <p>© 2026 Abdalla Elsiddig. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
