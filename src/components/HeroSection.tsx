import { ArrowDown, Star, CircleDot } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden bg-dots">
      {/* Decorative elements with animations */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full" 
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-40 right-20 w-20 h-20 border border-accent/20 rounded-full" 
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-40 left-20 w-16 h-16 bg-primary/10 rounded-full" 
      />
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: 128 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute top-1/3 right-10 w-1 bg-gradient-to-b from-primary/30 to-transparent" 
      />
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: 128 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-1/3 left-10 w-1 bg-gradient-to-t from-accent/30 to-transparent" 
      />
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8 shadow-card"
          >
            <CircleDot className="text-green-600 w-[20px] h-[20px]" />
            <span className="text-muted-foreground font-semibold text-base">Available for projects</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-foreground">Muhammad</span>{" "}
            <span className="text-gradient">Abid</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl font-medium text-muted-foreground mb-4"
          >
            Senior Full Stack Web Developer
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            5+ years building scalable, high-performance digital solutions for startups and businesses worldwide. I specialize in WordPress, Shopify, WooCommerce, Webflow, and custom CMS — and extend beyond the browser to architect CRM systems and AI automation workflows that turn complex business processes into streamlined, intelligent systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <motion.a 
              href="#contact" 
              className="group px-8 py-4 bg-gradient-primary rounded-lg font-semibold text-primary-foreground hover-glow transition-all duration-300 flex items-center gap-2 shadow-warm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </motion.a>
            <motion.a 
              href="#experience" 
              className="px-8 py-4 bg-card border border-border rounded-lg font-semibold text-foreground hover:bg-secondary transition-all duration-300 shadow-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Experience
            </motion.a>
          </motion.div>

          {/* Marquee */}
          <motion.div variants={itemVariants} className="w-full overflow-hidden mb-16">
            <div className="flex animate-marquee w-max gap-3">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-3">
                  {["WordPress", "Shopify", "WooCommerce", "Webflow", "PHP", "JavaScript", "GoHighLevel", "n8n", "Lovable", "API Integrations", "AI", "CRM", "Data Scraping"].map((skill) => (
                    <span
                      key={`${setIndex}-${skill}`}
                      className="inline-flex items-center px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-card whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "4+", label: "Years Experience" },
              { value: "100%", label: "Job Success" },
              { value: "Top Rated", label: "Upwork Status" },
              { value: "5★", label: "Client Reviews" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={statVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-4 rounded-xl bg-card border border-border hover-lift shadow-card"
              >
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
