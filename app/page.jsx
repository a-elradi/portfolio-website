
"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  Trophy,
  Briefcase,
  Folder,
  Award,
  ChevronRight,
  FileText,
} from "lucide-react";

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id) => {
    const section = document.getElementById(id.toLowerCase());

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id.toLowerCase());
      setMobileMenuOpen(false);
    }
  };

  const projects = [
    {
      title:
        "AI-Powered Rehabilitation & Educational System (TECHTRAP)",
      category: "AI/ML",
      description:
        "Huawei ICT Competition - Top 10 National Ranking. Developed intelligent system for children with special needs using ML and adaptive algorithms.",
      technologies: [
        "Python",
        "OpenCV",
        "Machine Learning",
        "Signal Processing",
      ],
      highlight: "🏆 Top 10 National Ranking",
    },

    {
      title: "Advanced Firefighter Robot",
      category: "Robotics",
      description:
        "Annual Fire Festival - Ministry of Interior & Civil Defense Partnership. Autonomous firefighter robot with thermal imaging, obstacle detection, and autonomous navigation.",
      technologies: [
        "PID",
        "Computer Vision",
        "Thermal Imaging",
        "C++",
      ],
      highlight: "🔥 Government Partnership",
    },

    {
      title: "AMR Warehouse Robot",
      category: "Robotics",
      description:
        "Capstone Project - Shifa National Medical Supply. Autonomous mobile robot with SLAM navigation, computer vision, reducing manual operations by 40%.",
      technologies: ["ROS", "SLAM", "Python", "OpenCV", "YOLO"],
      highlight: "📦 60% Efficiency Gain",
    },

    {
      title: "Advanced Computer Vision Projects",
      category: "Computer Vision",
      description:
        "Real-time object detection, image processing, and visual analysis systems using state-of-the-art techniques.",
      technologies: ["OpenCV", "PyTorch", "YOLO", "Python"],
      highlight: "✓ Real-Time Systems",
    },

    {
      title: "IoT-Based Automation Systems",
      category: "IoT",
      description:
        "Scalable IoT solutions for academic and industrial applications with real-time monitoring and control.",
      technologies: [
        "Arduino",
        "Embedded Systems",
        "MQTT",
        "IoT",
      ],
      highlight: "✓ Production Deployed",
    },

    {
      title: "Full-Stack Web Platforms",
      category: "Web",
      description:
        "Complete e-commerce and web applications with modern frameworks and responsive design.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Shopify",
      ],
      highlight: "✓ Full-Stack",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE */}
            <div className="order-2 lg:order-1">

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full mb-8">
                <GraduationCap
                  className="text-teal-400"
                  size={16}
                />
                <span className="text-gray-300 text-xs font-semibold tracking-wide uppercase">
                  Senior Informatics Engineering Student
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
                Abdalla{" "}
                <span className="text-teal-400">
                  Elsiddig
                </span>
              </h1>

              <div className="mt-6 mb-8">
                <h2 className="text-2xl md:text-3xl font-medium text-gray-300 leading-relaxed">
                  Informatics Engineer{" "}
                  <span className="text-teal-400 font-bold">
                    &
                  </span>{" "}
                  AI & Computer Vision | Robotics
                </h2>

                <div className="mt-4 w-32 h-1 bg-gradient-to-r from-teal-400 to-transparent rounded-full" />
              </div>

              <p className="text-lg text-gray-400 leading-relaxed max-w-xl mb-10">
                Building intelligent systems that solve
                real-world problems through innovation
                and technical excellence.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mb-14">

                <a
                  href="mailto:Abdallaelsiddig.m@gmail.com"
                  className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white rounded-xl font-bold transition-all flex items-center gap-2.5"
                >
                  <Mail size={18} />
                  Get In Touch
                </a>

                <button
                  onClick={() =>
                    scrollToSection("projects")
                  }
                  className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2.5"
                >
                  <ChevronRight
                    size={18}
                    className="text-teal-400"
                  />
                  View My Work
                </button>

                <a
                  href="/Abdalla-Elsiddig.Resume.pdf"
                  download
                  className="px-8 py-3.5 bg-slate-900 border border-slate-800 hover:border-teal-500/50 text-gray-300 rounded-xl font-bold transition-all flex items-center gap-2.5"
                >
                  <FileText size={18} />
                  Download Resume
                </a>

                <a
                  href="/Abdalla-Elsiddig.Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2.5"
                >
                  <FileText size={18} />
                  Preview Resume
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: Trophy,
                    value: "Top 10",
                    label: "National Ranking",
                  },
                  {
                    icon: Briefcase,
                    value: "1.5+",
                    label: "Years Experience",
                  },
                  {
                    icon: Award,
                    value: "12+",
                    label: "Certifications",
                  },
                  {
                    icon: Folder,
                    value: "15+",
                    label: "Projects",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/40 border border-white/5 rounded-2xl p-5"
                  >
                    <item.icon
                      className="text-teal-400 mb-3"
                      size={20}
                    />
                    <div className="text-xl font-bold">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-500 uppercase">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">

              <div className="absolute w-[500px] h-[500px] bg-teal-500/10 blur-[100px] rounded-full" />

              <div className="relative">
                <img
                  src="/me.png"
                  alt="Abdalla Elsiddig"
                  className="w-[480px] max-w-full object-cover rounded-none"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

