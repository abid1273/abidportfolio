import { useEffect, useRef } from "react";
import { 
  Code2, 
  Palette, 
  Zap, 
  Database, 
  Globe, 
  Settings,
  ShoppingCart,
  Server,
  Plug,
  Gauge,
  Bug,
  Webhook
} from "lucide-react";

const skillCategories = [
  {
    title: "Core Development",
    icon: Code2,
    skills: ["WordPress", "PHP", "JavaScript", "WooCommerce"]
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
    title: "Integration",
    icon: Plug,
    skills: ["API Integration", "CRM Integration", "GTM", "Automation"]
  },
  {
    title: "Infrastructure",
    icon: Server,
    skills: ["Server Management", "GHL", "Security"]
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
  { name: "Plugin Customization", icon: Settings, level: 92 },
  { name: "Theme Customization", icon: Palette, level: 94 },
  { name: "Speed Optimization", icon: Gauge, level: 90 },
  { name: "Bug Inspection", icon: Bug, level: 88 },
  { name: "WordPress Hooks", icon: Webhook, level: 92 },
  { name: "Server Management", icon: Server, level: 85 },
  { name: "API Integration", icon: Plug, level: 90 },
  { name: "CRM Integration", icon: Database, level: 88 },
];

const SkillsSection = () => {
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
    <section id="skills" ref={sectionRef} className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            Technical Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mastering the tools and technologies that power modern web development
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="reveal p-6 rounded-2xl bg-gradient-card border border-border hover-lift group"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 text-sm bg-secondary rounded-full text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skill Bars */}
        <div className="reveal max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Proficiency Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allSkills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <skill.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </div>
                  <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-gold rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${skill.level}%`,
                      transitionDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Skills Tags */}
        <div className="reveal mt-16 text-center">
          <p className="text-muted-foreground mb-6">Also experienced with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Shopify", "Webflow", "GHL", "Automation", "GTM", "PSD to WordPress", "Figma to WordPress"].map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 rounded-full bg-gradient-card border border-border text-foreground hover:border-primary transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
