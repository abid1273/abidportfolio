import { ArrowDown, Star, CircleDot } from "lucide-react";
// ... keep existing code
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8 shadow-card"
          >
            <CircleDot className="text-green-600 w-[20px] h-[20px]" />
            <span className="text-muted-foreground font-semibold text-base">Available for projects</span>
            <div className="flex items-center gap-0.5">
// ... keep existing code
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
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
