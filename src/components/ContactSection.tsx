import { useEffect, useRef } from "react";
import { Mail, MapPin, Send, ExternalLink, MessageCircle, Globe } from "lucide-react";

const ContactSection = () => {
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
    <section id="contact" ref={sectionRef} className="py-24 bg-card relative overflow-hidden bg-wave-lines">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-background text-primary text-sm font-medium mb-4 border border-border">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your project to life? Let's discuss how I can help you achieve your goals.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="reveal">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover-lift shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Location</h4>
                    <p className="text-muted-foreground">Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover-lift shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Languages</h4>
                    <p className="text-muted-foreground">English (Professional) • Urdu (Native)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover-lift shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Availability</h4>
                    <p className="text-muted-foreground">Open for freelance projects</p>
                  </div>
                </div>
              </div>

              {/* Upwork Badge */}
              <div className="mt-8 p-6 rounded-2xl bg-[#14a800] shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Top Rated</div>
                    <div className="text-white/80 text-sm">100% Job Success Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <form className="p-8 rounded-2xl bg-background border border-border shadow-card">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
                
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-foreground mb-2">
                      Project Type
                    </label>
                    <select
                      id="project"
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option>WordPress Development</option>
                      <option>WooCommerce Store</option>
                      <option>Theme Customization</option>
                      <option>Plugin Development</option>
                      <option>Website Optimization</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-primary rounded-lg font-semibold text-primary-foreground hover-glow transition-all duration-300 flex items-center justify-center gap-2 group shadow-warm"
                  >
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;