import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fallbackProjects = [
  {
    title: "E-Commerce Platform",
    category: "WooCommerce",
    description: "Custom WooCommerce store with advanced payment gateways, inventory management, and API integrations.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["WordPress", "WooCommerce", "PHP", "API"],
  },
  {
    title: "Corporate Website",
    category: "Theme Development",
    description: "Custom WordPress theme with Elementor integration, optimized for speed and SEO performance.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["WordPress", "Elementor", "Custom Theme"],
  },
  {
    title: "Real Estate Portal",
    category: "Plugin Development",
    description: "Custom property listing plugin with advanced search, CRM integration, and lead management.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    tags: ["WordPress", "PHP", "CRM", "Custom Plugin"],
  },
  {
    title: "Healthcare Platform",
    category: "Full Stack",
    description: "Complete healthcare management system with booking, patient portal, and payment processing.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    tags: ["WordPress", "API", "Automation"],
  },
  {
    title: "Marketing Automation",
    category: "GHL Integration",
    description: "GoHighLevel integration with WordPress for automated marketing funnels and lead tracking.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["GHL", "Automation", "API"],
  },
  {
    title: "Shopify Store",
    category: "E-Commerce",
    description: "Custom Shopify theme with advanced product filtering and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    tags: ["Shopify", "Liquid", "JavaScript"],
  },
];

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
    ? dbProjects.map((p) => ({ title: p.title, category: p.category, description: p.description, image: p.image_url, tags: p.tags || [] }))
    : fallbackProjects;

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
    hidden: { opacity: 0, y: 50 },
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
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
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
          <motion.span 
            variants={itemVariants}
            className="text-primary font-semibold tracking-wider uppercase text-sm"
          >
            My Work
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            A showcase of my best work across WordPress, WooCommerce, Shopify, and custom web development.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group relative bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 shadow-card hover:shadow-warm"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold rounded-full"
                >
                  {project.category}
                </motion.span>
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
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.div 
                  className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View
                  </Button>
                  <Button size="sm" variant="ghost" className="px-3">
                    <Github className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
