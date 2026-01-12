import { Linkedin, Github, Twitter, Mail } from "lucide-react";

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

const socialLinks = [
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~your-upwork-id",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.917 2.37 5.303 5.281 5.303 2.913 0 5.283-2.386 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/your-linkedin",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/your-github",
    icon: Github,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/your-twitter",
    icon: Twitter,
  },
  {
    name: "Email",
    url: "mailto:your-email@example.com",
    icon: Mail,
  },
];

const SocialLinks = ({ className = "", iconSize = 20, showLabels = false }: SocialLinksProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        const isCustomIcon = social.name === "Upwork";
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 p-2.5 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            aria-label={social.name}
          >
            {isCustomIcon ? (
              <IconComponent />
            ) : (
              <IconComponent size={iconSize} />
            )}
            {showLabels && (
              <span className="text-sm font-medium">{social.name}</span>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
