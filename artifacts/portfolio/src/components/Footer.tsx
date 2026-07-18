import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { IconType } from "react-icons";

type SocialLink = {
  icon: IconType;
  href: string;
  label: string;
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Tech Stack", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: Github, href: "https://github.com/dharmaByte-08", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/dharmendra-kanzariya-50b2a3406?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/mr.dharmendra.08?igsh=MW16aDU5aTNieDZ4dw==",
      label: "Instagram",
    },
    { icon: SiWhatsapp, href: "https://wa.me/919510735272", label: "WhatsApp" },
    { icon: Mail, href: "mailto:dharmendratech08@gmail.com", label: "Email" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border border-border bg-card text-muted-foreground flex items-center justify-center shadow-lg hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <footer className="border-t border-border/50 bg-card">
      <div className="container mx-auto px-6 max-w-6xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1 — Brand */}
          <div className="flex flex-col items-start gap-4">
            <span className="font-display font-bold text-xl tracking-tight">
              Dharmendra Kanzariya.
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building scalable web applications with Laravel and modern web technologies.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground mt-2">
              🟢 Open to Work
            </span>
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-foreground font-semibold">
              Navigation
            </h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Column 3 — Social */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-foreground font-semibold">
              Connect
            </h3>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group focus:outline-none"
                >
                  <span className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <social.icon className="w-4 h-4" />
                  </span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground font-mono">
          Designed & Developed by Dharmendra Kanzariya.
        </div>
      </div>
      </footer>
    </>
  );
}
