import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
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
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="reveal text-primary font-semibold tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="reveal text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Client <span className="text-gradient">Success Stories</span>
          </h2>
          <p className="reveal text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </div>

        <div className="reveal max-w-4xl mx-auto">
          <div className="relative">
            {/* Main testimonial card */}
            <div className="bg-background rounded-3xl p-8 md:p-12 border border-border shadow-elegant relative">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
              </div>

              <blockquote className="text-lg md:text-xl leading-relaxed mb-6 text-foreground/90">
                "{testimonials[currentIndex].content}"
              </blockquote>

              <div className="flex items-center justify-between">
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {testimonials[currentIndex].project}
                </span>

                <div className="flex items-center gap-2">
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
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Upwork stats */}
          <div className="reveal mt-12 flex flex-wrap justify-center gap-8 text-center">
            <div className="px-6 py-4 bg-background rounded-2xl border border-border">
              <div className="text-3xl font-bold text-gradient">100%</div>
              <div className="text-sm text-muted-foreground">Job Success</div>
            </div>
            <div className="px-6 py-4 bg-background rounded-2xl border border-border">
              <div className="text-3xl font-bold text-gradient">Top Rated</div>
              <div className="text-sm text-muted-foreground">Upwork Status</div>
            </div>
            <div className="px-6 py-4 bg-background rounded-2xl border border-border">
              <div className="text-3xl font-bold text-gradient">5.0</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
