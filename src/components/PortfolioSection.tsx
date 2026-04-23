import { useState, useEffect, useCallback } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fallbackProjects = [
  {
    title: "E-Commerce Platform",
    category: "WooCommerce",
    description: "Custom WooCommerce store with advanced payment gateways, inventory management, and API integrations.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["WordPress", "WooCommerce", "PHP", "API"],
    live_project_link: "",
  },
  {
    title: "Corporate Website",
    category: "Theme Development",
    description: "Custom WordPress theme with Elementor integration, optimized for speed and SEO performance.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["WordPress", "Elementor", "Custom Theme"],
    live_project_link: "",
  },
  {
    title: "Real Estate Portal",
    category: "Plugin Development",
    description: "Custom property listing plugin with advanced search, CRM integration, and lead management.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    tags: ["WordPress", "PHP", "CRM", "Custom Plugin"],
    live_project_link: "",
  },
  {
    title: "Healthcare Platform",
    category: "Full Stack",
    description: "Complete healthcare management system with booking, patient portal, and payment processing.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    tags: ["WordPress", "API", "Automation"],
    live_project_link: "",
  },
  {
    title: "Marketing Automation",
    category: "GHL Integration",
    description: "GoHighLevel integration with WordPress for automated marketing funnels and lead tracking.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["GHL", "Automation", "API"],
    live_project_link: "",
  },
  {
    title: "Shopify Store",
    category: "E-Commerce",
    description: "Custom Shopify theme with advanced product filtering and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    tags: ["Shopify", "Liquid", "JavaScript"],
    live_project_link: "",
  },
];

const PROJECTS_PER_SLIDE = 6;
const AUTO_SLIDE_INTERVAL = 6000;

const PortfolioSection = () => {
  const { data: dbProjects } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio_projects").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const projects = dbProjects && dbProjects.length > 0
    ? dbProjects.map((p) => ({
        title: p.title,
        category: p.category,
        description: p.description,
        image: p.image_url,
        tags: p.tags || [],
        live_project_link: p.live_project_link || "",
      }))
    : fallbackProjects;

  const totalSlides = Math.ceil(projects.length / PROJECTS_PER_SLIDE);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(goNext, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext, totalSlides]);

  const currentProjects = projects.slice(
    currentSlide * PROJECTS_PER_SLIDE,
    currentSlide * PROJECTS_PER_SLIDE + PROJECTS_PER_SLIDE
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="portfolio" className="py-24 bg-card relative bg-wave-lines">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="text-primary font-semibold tracking-wider uppercase text-sm">
            My Work
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of my best work across WordPress, WooCommerce, Shopify, and custom web development.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={goPrev}
                className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goNext}
                className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentProjects.map((project) => (
                <motion.div
                  key={project.title}
                  whileHover={{ y: -12, transition: { duration: 0.3 } }}
                  className="group relative bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 shadow-card hover:shadow-warm"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.live_project_link && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href={project.live_project_link} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="w-full gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Live
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
