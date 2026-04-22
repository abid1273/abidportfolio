import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
const fallbackTestimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "Muhammad exceeded all expectations. His WordPress expertise transformed our outdated website into a modern, high-performing platform. The attention to detail and communication was exceptional.",
    rating: 5,
    project: "Corporate Website Redesign",
  },
  {
    name: "Michael Chen",
    role: "Founder, E-Shop Pro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "Working with Muhammad on our WooCommerce store was a game-changer. He implemented complex payment integrations and custom features that boosted our sales by 40%. Highly recommended!",
    rating: 5,
    project: "WooCommerce Development",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, GrowthHub",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "Muhammad's expertise in GoHighLevel automation saved us countless hours. He built custom workflows that streamlined our entire lead management process. Outstanding work!",
    rating: 5,
    project: "Marketing Automation",
  },
  {
    name: "David Thompson",
    role: "Owner, Premium Realty",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "The custom property listing plugin Muhammad built is exactly what we needed. His understanding of our requirements and technical execution was flawless. A true professional!",
    rating: 5,
    project: "Custom Plugin Development",
  },
  {
    name: "Lisa Park",
    role: "E-Commerce Manager, StyleBox",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    content: "Muhammad helped us migrate from a slow, outdated WordPress site to a lightning-fast, optimized platform. Page load times dropped by 70%. Incredible results!",
    rating: 5,
    project: "Speed Optimization",
  },
];
const TestimonialsSection = () => {
  const { data: dbReviews } = useQuery({
    queryKey: ["client-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_reviews").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const testimonials = dbReviews && dbReviews.length > 0
    ? dbReviews.map((r) => ({ name: r.name, role: r.role, avatar: r.avatar_url, content: r.content, rating: r.rating, project: r.project }))
    : fallbackTestimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden bg-dots">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.8, 0.5, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

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
            className="text-primary font-semibold tracking-wider uppercase text-sm"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6"
          >
            Client <span className="text-gradient">Success Stories</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="relative">
            {/* Main testimonial card */}
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-card relative overflow-hidden">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />

              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                    <div>
                      <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                      <p className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                        >
                          <Star className="w-5 h-5 text-primary fill-primary" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-lg md:text-xl leading-relaxed mb-6 text-foreground/90">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <motion.span 
                      className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {testimonials[currentIndex].project}
                    </motion.span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
