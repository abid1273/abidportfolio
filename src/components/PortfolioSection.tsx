import { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
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
  const sectionRef = useRef<HTMLElement>(null);

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

    const revealElements = sectionRef.current?.querySelectorAll(".reveal");
    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-card relative bg-wave-lines">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="reveal text-primary font-semibold tracking-wider uppercase text-sm">
            My Work
          </span>
          <h2 className="reveal text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="reveal text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of my best work across WordPress, WooCommerce, Shopify, and custom web development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="reveal group relative bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 shadow-card hover:shadow-warm"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View
                  </Button>
                  <Button size="sm" variant="ghost" className="px-3">
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;