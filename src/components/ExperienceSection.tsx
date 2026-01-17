import { Building2, Calendar, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="experience" className="py-24 bg-background relative bg-lines">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-card text-primary text-sm font-medium mb-4 border border-border"
          >
            Career Journey
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Building digital excellence through years of dedicated WordPress development
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2 origin-top"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
          />

          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {/* Timeline dot */}
              <motion.div 
                className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 shadow-warm z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
              />
              
              {/* Content */}
              <motion.div 
                className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                variants={timelineVariants}
              >
                <motion.div 
                  className="p-6 rounded-2xl bg-card border border-border hover-lift group shadow-card"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
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
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        viewport={{ once: true }}
                      >
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {resp}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="p-8 rounded-2xl bg-card border border-border shadow-card"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <motion.span 
                  className="text-primary font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Education
                </motion.span>
                <h3 className="text-2xl font-bold text-foreground mt-1">BSCS - Computer Science</h3>
                <p className="text-muted-foreground mt-2">Government College University Faisalabad</p>
              </div>
              <div className="text-right">
                <motion.div 
                  className="text-3xl font-bold text-gradient"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  viewport={{ once: true }}
                >
                  3.03 / 4.00
                </motion.div>
                <p className="text-muted-foreground">2017 - 2021</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
