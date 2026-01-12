import { Heart } from "lucide-react";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gradient">MA</span>
              <span className="text-muted-foreground">Muhammad Abid</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Senior WordPress Developer crafting exceptional digital experiences.
            </p>
          </div>
          
          <nav className="flex items-center justify-center gap-6">
            {["About", "Portfolio", "Experience", "Skills", "Contact"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center md:items-end gap-4">
            <SocialLinks />
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> © 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
