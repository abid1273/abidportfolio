import { 
  Code2, 
  Palette, 
  Zap, 
  Database, 
  Globe, 
  Server,
  ShoppingCart,
  Plug,
  Gauge,
  Bug,
  Webhook,
  Bot,
  Workflow
} from "lucide-react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Core Development",
    icon: Code2,
    skills: ["WordPress", "PHP", "JavaScript", "HTML", "CSS", "WooCommerce"]
  },
  {
    title: "Customization",
    icon: Palette,
    skills: ["Plugin Customization", "Theme Customization", "PSD/Figma/XD to Development"]
  },
  {
    title: "Performance",
    icon: Zap,
    skills: ["WordPress Speed Optimization", "Bug Inspection", "WordPress Hooks"]
  },
  {
    title: "Integration & APIs",
    icon: Plug,
    skills: ["API Integration", "CRM Integration", "GTM", "Data Scraping"]
  },
  {
    title: "AI & Automation",
    icon: Bot,
    skills: ["n8n", "GoHighLevel", "Lovable", "AI Workflows", "Workflow Automation"]
  },
  {
    title: "Platforms",
    icon: Globe,
    skills: ["Shopify", "Webflow", "WordPress Multisite"]
  }
];

const allSkills = [
  { name: "WordPress", icon: Globe, level: 98 },
  { name: "PHP", icon: Code2, level: 95 },
  { name: "JavaScript", icon: Code2, level: 90 },
  { name: "WooCommerce", icon: ShoppingCart, level: 95 },
  { name: "Plugin Customization", icon: Palette, level: 92 },
  { name: "Theme Customization", icon: Palette, level: 94 },
  { name: "Speed Optimization", icon: Gauge, level: 90 },
  { name: "API Integration", icon: Plug, level: 90 },
  { name: "GoHighLevel", icon: Database, level: 88 },
  { name: "n8n / Automation", icon: Workflow, level: 85 },
  { name: "AI Workflows", icon: Bot, level: 85 },
  { name: "Server Management", icon: Server, level: 85 },
];


const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="skills" className="py-24 bg-card relative overflow-hidden bg-diagonal-lines">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
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
            className="inline-block px-4 py-1.5 rounded-full bg-background text-primary text-sm font-medium mb-4 border border-border"
          >
            Technical Expertise
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Skills & <span className="text-gradient">Technologies</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Mastering the tools and technologies that power modern web development
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="p-6 rounded-2xl bg-background border border-border hover-lift group shadow-card"
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <category.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{category.title}</h3>
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={containerVariants}
              >
                {category.skills.map((skill, i) => (
                  <motion.span 
                    key={i}
                    variants={tagVariants}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-sm bg-card rounded-full text-muted-foreground border border-border"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Bars */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-8"
          >
            Proficiency Levels
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {allSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="group"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <skill.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </div>
                  <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Additional Skills Tags */}
        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground mb-6"
          >
            Also experienced with
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
          >
            {["Shopify", "Webflow", "GoHighLevel", "n8n", "Lovable", "Data Scraping", "GTM", "PSD to WordPress", "Figma to WordPress"].map((skill, index) => (
              <motion.span 
                key={index}
                variants={tagVariants}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-4 py-2 rounded-full bg-background border border-border text-foreground hover:border-primary transition-colors cursor-default shadow-sm"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
