import { ArrowDown, Star, Award, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden bg-dots">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full" />
      <div className="absolute top-40 right-20 w-20 h-20 border border-accent/20 rounded-full" />
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-primary/10 rounded-full" />
      <div className="absolute top-1/3 right-10 w-1 h-32 bg-gradient-to-b from-primary/30 to-transparent" />
      <div className="absolute bottom-1/3 left-10 w-1 h-32 bg-gradient-to-t from-accent/30 to-transparent" />
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8 shadow-card">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Top Rated on Upwork</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
          </div>

          {/* Main heading */}
          <h1 className="animate-fade-up-delay-1 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-foreground">Muhammad</span>{" "}
            <span className="text-gradient">Abid</span>
          </h1>
          
          <p className="animate-fade-up-delay-2 text-xl md:text-2xl font-medium text-muted-foreground mb-4">
            Senior WordPress Developer
          </p>

          <p className="animate-fade-up-delay-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            4+ years of expertise in WordPress, WooCommerce, Theme & Plugin Customization, 
            API Integration, and Server Management. Building high-performance, scalable web solutions.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#contact" 
              className="group px-8 py-4 bg-gradient-primary rounded-lg font-semibold text-primary-foreground hover-glow transition-all duration-300 flex items-center gap-2 shadow-warm"
            >
              Let's Work Together
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="#experience" 
              className="px-8 py-4 bg-card border border-border rounded-lg font-semibold text-foreground hover:bg-secondary transition-all duration-300 shadow-card"
            >
              View Experience
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-up-delay-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "4+", label: "Years Experience" },
              { value: "100%", label: "Job Success" },
              { value: "Top Rated", label: "Upwork Status" },
              { value: "5★", label: "Client Reviews" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-card border border-border hover-lift shadow-card"
              >
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;