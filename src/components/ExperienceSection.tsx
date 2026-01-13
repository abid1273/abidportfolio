import { Building2, Calendar, MapPin, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const experiences = [
  {
    title: "Senior WordPress Developer",
    company: "Napollo Software Design",
    period: "03/2023 - Present",
    location: "Pakistan",
    responsibilities: [
      "Develop, customize, and maintain WordPress themes, plugins, and custom functionalities",
      "Optimize website performance, security, and SEO",
      "Develop and customize WooCommerce stores, payment gateways, and API integration",
      "Lead development projects, mentor junior developers, and conduct code reviews",
      "Troubleshoot, debug, and maintain WordPress websites",
      "Collaborate with designers, marketers, and project managers"
    ]
  },
  {
    title: "WordPress Developer",
    company: "Mavenup Creatives",
    period: "12/2021 - 02/2023",
    location: "Pakistan",
    responsibilities: [
      "Assist in developing, customizing, and maintaining WordPress websites",
      "Modify and create custom themes and plugins as needed",
      "Implement front-end changes using HTML, CSS, JavaScript, and PHP",
      "Ensure website performance, security, and responsiveness",
      "Troubleshoot and debug WordPress-related issues",
      "Collaborate with designers, senior developers, and project managers"
    ]
  }
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-background relative bg-lines">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card text-primary text-sm font-medium mb-4 border border-border">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building digital excellence through years of dedicated WordPress development
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`reveal relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 shadow-warm z-10" />
              
              {/* Content */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="p-6 rounded-2xl bg-card border border-border hover-lift group shadow-card">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="font-semibold">{exp.company}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{exp.title}</h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.responsibilities.slice(0, 3).map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="reveal max-w-4xl mx-auto mt-16">
          <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-primary font-medium">Education</span>
                <h3 className="text-2xl font-bold text-foreground mt-1">BSCS - Computer Science</h3>
                <p className="text-muted-foreground mt-2">Government College University Faisalabad</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gradient">3.03 / 4.00</div>
                <p className="text-muted-foreground">2017 - 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;