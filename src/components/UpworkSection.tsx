import { Star, Award, TrendingUp, Users, CheckCircle2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Award,
    value: "Top Rated",
    label: "Upwork Badge",
    description: "Elite status for consistent excellence"
  },
  {
    icon: TrendingUp,
    value: "100%",
    label: "Job Success",
    description: "Perfect track record maintained"
  },
  {
    icon: Star,
    value: "5.0",
    label: "Average Rating",
    description: "All projects rated 5 stars"
  },
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
    description: "From startups to enterprises"
  }
];

const achievements = [
  "Consistently delivered projects on time and within budget",
  "Expert in WordPress, WooCommerce, and custom development",
  "Strong communication with clients worldwide",
  "Proven ability to handle complex technical challenges",
  "Long-term relationships with repeat clients",
  "Quick turnaround without compromising quality"
];

const UpworkSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    hidden: { opacity: 0, scale: 0.9 },
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
    <section id="upwork" className="py-24 bg-background relative bg-diagonal-lines overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14a800]/10 text-[#14a800] text-sm font-semibold mb-4"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
            </svg>
            Verified Freelancer
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6"
          >
            Top Rated on <span className="text-[#14a800]">Upwork</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Recognized as a top-performing freelancer with an impeccable track record of delivering 
            exceptional results and maintaining 100% client satisfaction.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-[#14a800]/50 transition-all duration-300 hover:shadow-lg text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-[#14a800]/10 flex items-center justify-center mb-4 group-hover:bg-[#14a800]/20 transition-colors">
                <stat.icon className="w-7 h-7 text-[#14a800]" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-[#14a800] mb-2">{stat.label}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Left - Badge Display */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#14a800]/5 rounded-3xl blur-3xl" />
            <motion.div 
              className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#14a800] to-[#0d7a00] text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold">Muhammad Abid</h3>
                  <p className="text-white/80">Senior WordPress Developer</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/10">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-white/80">5-Star Reviews</p>
                </div>
                <div className="p-4 rounded-xl bg-white/10">
                  <div className="text-2xl font-bold mb-1">100%</div>
                  <p className="text-sm text-white/80">Job Success</p>
                </div>
              </div>

              <motion.div 
                className="flex items-center gap-3 p-4 rounded-xl bg-white/10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="font-bold text-lg">Top Rated Badge</div>
                  <p className="text-sm text-white/80">Top 10% of talent on Upwork</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Why Choose */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6">Why Clients Choose Me</h3>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#14a800] flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{achievement}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="https://www.upwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#14a800] text-white font-semibold rounded-lg hover:bg-[#0d7a00] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase className="w-5 h-5" />
              Hire Me on Upwork
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpworkSection;
